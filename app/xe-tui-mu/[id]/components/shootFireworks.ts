export async function shootFireworks() {
  if (typeof window === "undefined") return;

  // Try this approach first
  const confetti = await import("canvas-confetti");
  
  // Use the function (checking for .default if necessary)
  const fire = confetti.default || confetti;

  fire({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
  });
}