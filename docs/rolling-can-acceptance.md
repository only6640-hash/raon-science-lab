# Rolling can (28): functional reconstruction

Implementation: `labs/modules/layout-can.js`, final override of28 only. It does not change23 or shared lesson shell behavior.

## Reference evidence

On2026-11-06 a fresh cloud-browser tab loaded `https://javalab.org/ko/static_electricity_can/`. The initial load and one bounded reload both showed an absent simulation; p5@1.9.4 reported `Error creating webgl context` at05:20:55 and05:21:14UTC. No original live hit target, gesture, rolling speed, or checkbox meaning was inferred from those failed renders.

Actual pixels of the official article illustration were inspected at `https://javalab.org/wp-content/uploads/static_electricity_can_0-1-1536x925.png`: green perspective floor, silver can lying rear-left, dark charged rod and hand across foreground parallel to the can axis. Negative rod creates positive near surface and negative far surface. The live article text explicitly says the neutral aluminum can moves toward the negative rod due to induction.

## Implemented behavior

- Draggable/keyboard-movable rod in the floor plane; can axis stays parallel.
- Equal opposite induced surface charge, neutral net can charge, near/far reversal when rod is moved to the other side.
- Both rod polarities attract. Zero rod charge removes polarization and drive.
- Actual translation toward rod plus no-slip can rotation, inertia, damping, rolling resistance and nonintersection stop.
- Explicit run/pause feedback, charge visibility, strength and polarity controls; reset and state snapshot.
- Depth order changes if the rod is behind the can.

This restores the article-supported physical phenomenon while preserving verified geometry. It does not claim the unavailable original gesture or exact dynamics are reproduced. Numerical dimensions/dynamics are disclosed qualitative model units.

## Verification

`tests/rolling-can-layout.cjs` passed spatial group checks, balanced can surface charge, evolving translation/rotation, no-slip relation, nonintersection, either-polarity attraction, reverse-side motion, zero-charge rest, pause/reset, finite control boundaries and inverse plane projection. Initial SVG pixels were inspected at800×450. Native integrated touch/browser QA remains separate.
