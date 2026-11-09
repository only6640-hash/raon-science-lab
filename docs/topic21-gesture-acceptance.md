# Topic 21 original gesture audit and local correction

Date: 2026-11-09 UTC. Prepared against remote main `41d553f8e4383240872e9112b4113ce17e30227d` in an isolated copy. This report does not establish publication.

## Original behavior observed

Reference: https://javalab.org/ko/ohms_law/

Actual cloud Chrome inspection confirmed two distinct direct gestures:
- Dragging the left water surface upward raised the head, added cells to the right-hand vertical stack and brightened the lamp. Dragging downward reversed that change. One, three, four and five cells were observed; the water head was bounded at both extremes. The original water surface can move continuously between these displayed cell counts.
- Dragging the outlet's black zigzag horizontally to the right lengthened it and reduced flow/lamp brightness; dragging left shortened it and restored stronger flow/brightness. Vertical drags at the zigzag, pipe edge and lamp did not establish an interaction.

The existing RAON topic had only external cell-count and resistance sliders, limited to 1–3 cells, and no scene interaction handler. This was a concrete missing manipulation, not merely an untested gesture.

## Narrow correction

- Direct vertical water-height drag and horizontal outlet-resistance drag share the existing control values and immediate I = V/R response.
- The existing cell-count control now allows 1–5 cells. Each step is one ideal 1.5V cell. Water height remains proportional to this voltage and fits inside the unchanged tank.
- The outlet zigzag length changes with resistance. The existing qualitative aperture and flow response remain in place.
- The tank outline, outlet position, circuit leads, vertical stack location and lower-right lamp position are retained. Five cells are compressed vertically within the existing stack envelope; the default three-cell stack is unchanged.
- Focusable diagram sliders expose direction, limits and values. Up/Down changes water height, Left/Right changes resistance, and Home/End selects bounds. External controls remain available.
- Dragging is relative to the grab point, captures one primary pointer, ignores other pointers and secondary buttons, and rolls back on pointer cancellation or Escape. Reset and leaving the topic end an active gesture.
- Lamp brightness uses the expanded current range, so increasing from three to four or five cells remains visibly distinct. Pointer coordinates use the SVG screen transform, including letterboxed/full-screen layouts.
- Only the changed module gets a new cache URL, `topic21-drag-v1`.

## Verification

- `node tests/ohm-gestures.cjs`: 135 renders, all cell/resistance combinations, Ohm's-law output, finite bounds, retained geometry, both gestures, scaled coordinates, pointer capture and filtering, cancellation, Escape, keyboard limits, Reset/dispose and module cache version.
- `node tests/run.cjs`: full repository regression suite passed after the final edits, including 3,000 renders across 83 models and 83 shell navigation/control/reset flows.
- Independent code review found brightness saturation at the new range maximum and a letterboxed-coordinate scaling error. Both were corrected and covered by focused regression assertions.
- Actual managed-preview cloud Chrome: water drag raised three cells to five, giving 7.5V / 20Ω / 0.375A. Horizontal outlet drag then gave 7.5V / 50Ω / 0.150A. Focused Left changed only resistance to 45Ω; focused Home on water selected one cell. Reset restored 4.5V / 20Ω / 0.225A.
- Actual full-screen browser: a horizontal 22px drag in the centered, letterboxed diagram changed 20Ω to 40Ω, then vertical water drag selected one cell while preserving 40Ω. Reset restored defaults. Screenshots were inspected. These are mouse/keyboard desktop checks, not physical-touch QA.

## Limits

This is an independently authored classroom adaptation. Cell count is stepped, not the original continuously moving water-height parameter. The original numerical calibration and exact hit regions were not established. Water is an analogy, not a solved fluid model; the lamp remains a constant-resistance idealization. Physical touch/mobile and cross-browser fidelity are unverified. Other topics' open source-interaction and hardware/download/print checks remain open.

## Related audit clarification, without code changes

Topic 12's previously unidentified third slider was directly read as “줌” (Zoom), range 10–25, at https://javalab.org/ko/dielectric_in_capacitor/ . Setting its maximum visibly enlarged the apparatus while the width and spacing values stayed at 4. It is not evidence of a missing physical parameter. The RAON shell already offers diagram enlargement, although its behavior is not identical to the original continuous zoom.
