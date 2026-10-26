// Tiny promise-based tween helpers used by the quiz loading screens.
// Cancelable so React effects can clean up on unmount.

export interface Canceler {
  cancel: () => void;
}

export function wait(ms: number, reg?: (c: Canceler) => void): Promise<void> {
  return new Promise((resolve) => {
    const id = setTimeout(resolve, ms);
    reg?.({ cancel: () => clearTimeout(id) });
  });
}

/** Animate a number from `from` to `to` over `dur` ms, calling `onUpdate`. */
export function tween(
  from: number,
  to: number,
  dur: number,
  onUpdate: (v: number) => void,
  reg?: (c: Canceler) => void,
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    let raf = 0;
    let stopped = false;
    const frame = (now: number) => {
      if (stopped) return;
      const t = Math.min(1, (now - start) / dur);
      onUpdate(from + (to - from) * t);
      if (t < 1) raf = requestAnimationFrame(frame);
      else resolve();
    };
    raf = requestAnimationFrame(frame);
    reg?.({
      cancel: () => {
        stopped = true;
        cancelAnimationFrame(raf);
      },
    });
  });
}
