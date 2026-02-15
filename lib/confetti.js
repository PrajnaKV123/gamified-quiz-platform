export function blastConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.6 },
  };

  function fire(particleRatio, opts) {
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91 });
  fire(0.1, { spread: 120, startVelocity: 25 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}
