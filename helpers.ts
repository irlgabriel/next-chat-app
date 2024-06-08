export function getChatTimeStamp(timestamp: number) {
  const trimmed = new Date(timestamp).toLocaleTimeString();

  return trimmed.slice(0, -6) + trimmed.slice(-3);
}
