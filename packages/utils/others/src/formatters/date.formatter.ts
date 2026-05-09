export function formatTimeAgo(input: string | Date): string {
  const date = new Date(input);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";

  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  if (hours < 24) {
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""} ago`;
  }

  if (days < 30) {
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  }

  const monthDiff =
    now.getMonth() -
    date.getMonth() +
    (now.getFullYear() - date.getFullYear()) * 12;

  if (monthDiff === 1) return "last month";
  if (monthDiff < 12) return `${monthDiff} months ago`;

  const yearDiff = now.getFullYear() - date.getFullYear();
  if (yearDiff === 1) return "last year";
  return `${yearDiff} years ago`;
}
