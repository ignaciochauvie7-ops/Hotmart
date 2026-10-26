// Tiny promise-based tween helpers used by the quiz loading screens.
// Cancelable so React effects can clean up on unmount.

export interface Canceler {
  cancel: () => void;
}

export type Easing = (t: number) => number;

/** Smooth ease-in-out (cubic). Mirrors cubic-bezier(.4,0,.2,1): no linear tail, no jumps. */
export const easeInOut: Easing = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function wait(ms: number, reg?: (c: Canceler) => void): Promise<void> {
  return new Promise((resolve) => {
    const id = setTimeout(resolve, ms);
    reg?.({ cancel: () => clearTimeout(id) });
  });
}

/** Animate a number from `from` to `to` over `dur` ms, calling `onUpdate`.
 *  Pass an `ease` for a non-linear curve (default linear). */
export function tween(
  from: number,
  to: number,
  dur: number,
  onUpdate: (v: number) => void,
  reg?: (c: Canceler) => void,
  ease?: Easing,
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    let raf = 0;
    let stopped = false;
    const frame = (now: number) => {
      if (stopped) return;
      const t = Math.min(1, (now - start) / dur);
      const e = ease ? ease(t) : t;
      onUpdate(from + (to - from) * e);
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
