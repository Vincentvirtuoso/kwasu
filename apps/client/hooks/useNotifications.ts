"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@kwasu-portal/constants";
import { apiClient } from "@/lib/api";
import type { Notification, PaginatedResponse } from "@kwasu-portal/types";

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get<PaginatedResponse<Notification>>(
          "/notifications?perPage=50",
        );
        if (!cancelled) {
          setNotifications(res.data);
          setUnreadCount(res.data.filter((n) => !n.read).length);
        }
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000",
      {
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      },
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, `user:${userId}`);
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on(SOCKET_EVENTS.NOTIFICATION_NEW, (notif: Notification) => {
      setNotifications((prev) => {
        if (prev.some((n) => n.id === notif.id)) return prev;
        return [notif, ...prev];
      });
      setUnreadCount((c) => c + 1);
    });

    return () => {
      socket.emit(SOCKET_EVENTS.LEAVE_ROOM, `user:${userId}`);
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [userId]);

  const markRead = useCallback(async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true, readAt: new Date().toISOString() })),
    );
    setUnreadCount((c) => Math.max(0, c - 1));

    try {
      await apiClient.patch(`/notifications/${id}/read`);
    } catch {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: false, readAt: undefined } : n,
        ),
      );
      setUnreadCount((c) => c + 1);
    }
  }, []);

  const markAllRead = useCallback(async () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (!unreadIds.length) return;

    setNotifications((prev) =>
      prev.map((n) =>
        unreadIds.includes(n.id) ? { ...n, read: false, readAt: undefined } : n,
      ),
    );

    setUnreadCount(0);

    try {
      await apiClient.patch("/notifications/read-all");
    } catch {
      setNotifications((prev) =>
        prev.map((n) =>
          unreadIds.includes(n.id)
            ? { ...n, read: false, readAt: undefined }
            : n,
        ),
      );
      setUnreadCount(unreadIds.length);
    }
  }, [notifications]);

  const dismiss = useCallback(
    async (id: string) => {
      const original = notifications.find((n) => n.id === id);

      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (original && !original.read) {
        setUnreadCount((c) => Math.max(0, c - 1));
      }

      try {
        await apiClient.delete(`/notifications/${id}`);
      } catch {
        if (original) {
          setNotifications((prev) => [original, ...prev]);
          if (!original.read) setUnreadCount((c) => c + 1);
        }
      }
    },
    [notifications],
  );

  return {
    notifications,
    unreadCount,
    loading,
    connected,
    markRead,
    markAllRead,
    dismiss,
  };
}
