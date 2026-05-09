"use client";
import { Badge, Slider } from "@kwasu-portal/components";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  LuPause,
  LuPlay,
  LuShuffle,
  LuSkipBack,
  LuSkipForward,
  LuVolume1,
  LuVolume2,
  LuVolumeX,
} from "react-icons/lu";

interface Show {
  time: string;
  name: string;
  host: string;
  live: boolean;
}

interface RadioData {
  station: string;
  frequency: string;
  currentShow: string;
  nowPlaying: string;
  schedule: Show[];
}

function fetchRadioData(): Promise<RadioData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        station: "KWASU Radio",
        frequency: "89.5 FM · MALETE",
        currentShow: "Morning Academic Hour with Prof. Adebayo",
        nowPlaying: "Morning Academic Hour with Prof. Adebayo",
        schedule: [
          {
            time: "08:00 AM",
            name: "Morning Academic Hour",
            host: "Prof. Adebayo",
            live: true,
          },
          {
            time: "12:00 PM",
            name: "Noon Campus Gist",
            host: "Student Affairs Desk",
            live: false,
          },
          {
            time: "05:00 PM",
            name: "Evening Drive & Career Talk",
            host: "Alumni Relations Unit",
            live: false,
          },
        ],
      });
    }, 800);
  });
}

function EqualizerBars({ active }: { active: boolean }) {
  const bars = Array.from({ length: 16 }, (_, i) => i);

  const heights = bars.map((i) => 20 + ((i * 13) % 80));
  const durations = bars.map((i) => 0.8 + ((i * 7) % 6) * 0.1);

  return (
    <div className="flex items-end justify-center gap-0.75 h-10 w-full mb-7">
      {bars.map((i) => (
        <div
          key={i}
          className={`flex-1 rounded-[3px] transition-all duration-200 ${
            active ? "bg-gold-400 animate-wave" : "bg-white/20"
          }`}
          style={
            active
              ? {
                  animation: `wave ${durations[i]}s ease-in-out infinite`,
                  animationDelay: `${i * 0.07}s`,
                  height: `${heights[i]}%`,
                }
              : { height: "30%" }
          }
        />
      ))}
    </div>
  );
}

function VolumeIcon({ volume }: { volume: number }) {
  if (volume === 0) return <LuVolumeX className="w-5 h-5" />;
  if (volume < 0.5) return <LuVolume1 className="w-5 h-5" />;
  return <LuVolume2 className="w-5 h-5" />;
}

export function RadioSection() {
  const [radioData, setRadioData] = useState<RadioData | null>(null);
  const [loading, setLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [audioError, setAudioError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetchRadioData().then((data) => {
      setRadioData(data);
      setLoading(false);
    });
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }, [playing]);

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    }
  };

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  };

  // Seek when user drags
  const handleSeek = ([value]: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`;

  if (loading || !radioData) {
    return (
      <section className="bg-cream-100 py-20 px-[clamp(20px,5vw,80px)] text-center">
        <p className="text-green-700 font-sans">Loading radio...</p>
      </section>
    );
  }

  return (
    <section className="bg-cream-100 py-24 md:py-25 px-[clamp(20px,5vw,80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div className="relative bg-green-900 rounded-3xl p-8 md:p-10 border border-gold-500/20 overflow-hidden shadow-2xl">
          <Badge
            variant="primary"
            size="lg"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/12 border border-gold-500/30 mb-7"
          >
            Live Now
          </Badge>

          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-1">
            {radioData.station}
          </h3>
          <p className="font-mono text-[13px] text-gold-400 tracking-[0.2em] mb-7">
            {radioData.frequency}
          </p>
          <p className="font-sans text-[10px] font-semibold text-white/35 tracking-[0.15em] uppercase mb-1">
            Now Playing
          </p>
          <p className="font-sans text-base font-medium text-white/80 mb-6 truncate">
            {radioData.nowPlaying}
          </p>

          <EqualizerBars active={playing} />

          <div className="flex items-center mb-5">
            <button
              className="text-white/40 hover:text-white transition-colors p-2"
              title="Previous"
            >
              <LuSkipBack className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={togglePlay}
              disabled={audioError}
              title={playing ? "Pause" : "Play"}
              className="w-13 h-13 mx-3 bg-gold-500 rounded-full flex items-center justify-center text-green-900
        shadow-[0_8px_24px_rgba(201,168,76,0.35)]
        hover:scale-110 hover:shadow-[0_12px_32px_rgba(201,168,76,0.5)]
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {playing ? (
                <LuPause className="w-5 h-5" />
              ) : (
                <LuPlay className="w-5 h-5 translate-x-0.5" />
              )}
            </button>

            <button
              className="text-white/40 hover:text-white transition-colors p-2"
              title="Next"
            >
              <LuSkipForward className="w-4.5 h-4.5" />
            </button>

            <div className="flex-1" />

            <button
              className="text-gold-500/70 hover:text-gold-400 transition-colors p-2"
              disabled
            >
              <LuShuffle className="w-4 h-4" />
            </button>
          </div>

          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            min={0}
            max={duration || 100}
            step={0.1}
            className="mb-1"
          />
          <div className="flex justify-between text-[11px] text-white/35 font-mono mb-5">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-3 place-content-end">
            <button
              className="text-white/40 hover:text-white transition-colors"
              onClick={() => {
                const newVol = volume === 0 ? 0.8 : 0;
                setVolume(newVol);
                if (audioRef.current) audioRef.current.volume = newVol;
              }}
            >
              <VolumeIcon volume={volume} />
            </button>

            <Slider
              value={[volume]}
              onValueChange={([v]) => {
                setVolume(v);
                if (audioRef.current) audioRef.current.volume = v;
              }}
              min={0}
              max={1}
              step={0.05}
              className="flex-1 min-w-20"
            />

            <span className="text-[11px] text-white/35 font-mono min-w-7">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <audio
            ref={audioRef}
            src="/audio/radio.mp3"
            preload="none"
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => {
              setAudioError(true);
              setPlaying(false);
            }}
          />

          {audioError && (
            <p className="text-red-400 text-sm mt-4">
              Audio stream is currently unavailable. Please try again later.
            </p>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <span className="inline-block font-sans text-xs font-bold text-green-700 uppercase tracking-[0.2em] bg-green-100/70 px-3 py-1 rounded-full mb-3">
              Campus Broadcasting
            </span>
            <h2 className="font-serif font-light text-[clamp(28px,3.5vw,48px)] leading-[1.15] text-green-900 tracking-tight mb-5">
              KWASU{" "}
              <em className="italic font-semibold text-green-700">Radio</em>
              <br />
              Your Campus Voice
            </h2>
            <p className="font-sans text-sm md:text-base leading-relaxed text-green-700 mb-8">
              Stay connected to campus life — academic discussions, student
              spotlights, campus news, entertainment, and community development
              programming. Streaming live 24/7.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {radioData.schedule.map((show) => (
              <div
                key={show.time}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-cream-300 hover:border-gold-400/50 hover:shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span className="bg-green-900 text-gold-400 font-mono text-[11px] font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap shrink-0">
                  {show.time}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-semibold text-green-900 truncate">
                    {show.name}
                  </p>
                  <p className="font-sans text-xs text-green-700 truncate">
                    {show.host}
                  </p>
                </div>
                {show.live && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-[10px] font-extrabold text-red-600 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-[dot-blink_1s_ease_infinite]" />
                    Live
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
