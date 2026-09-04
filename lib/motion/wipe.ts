import gsap from 'gsap';

/**
 * The diagonal wipe timeline, ported from docs/prototype.html's #wipe: an
 * oversized rect held at the shared 8° cut, slid across with a transform
 * rather than clipped — that's the actual working technique in the
 * prototype, even though MASTER_PROMPT.md's technique table names
 * `clip-path: polygon()`. The prototype is the concrete, already-solved
 * version; this ports that rather than the abstract description.
 *
 * Cover 220ms, jump happens underneath (instant — the real nav state has
 * already changed by the time this runs, since dispatch() is synchronous),
 * reveal 200ms. Total under 450ms per docs/MASTER_PROMPT.md §3/§7.
 *
 * Every call kills whatever this element was already doing first — a nav
 * event mid-wipe should jump to the new destination, not queue behind the
 * animation in progress (interruptible transitions, per §7).
 */
export function playWipe(el: HTMLElement): void {
  gsap.killTweensOf(el);
  gsap.set(el, { xPercent: -125, rotate: 8, transformOrigin: 'center' });
  gsap
    .timeline()
    .to(el, { xPercent: 0, duration: 0.22, ease: 'power2.inOut' })
    .to(el, { xPercent: 125, duration: 0.2, ease: 'power2.inOut' });
}

/** Snaps the wipe off-screen with no animation, for prefers-reduced-motion. */
export function resetWipe(el: HTMLElement): void {
  gsap.killTweensOf(el);
  gsap.set(el, { xPercent: -125, rotate: 8, transformOrigin: 'center' });
}
