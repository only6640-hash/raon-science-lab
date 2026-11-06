# Electrostatic spatial restoration acceptance

Date: 2026-11-06. Scope: all 19 IDs owned by electrostatic.js. The independent override is `labs/modules/layout-electrostatic.js`; load it after the base electrostatic module and before the lesson shell. The base module and shared shell were not edited by this task. Nothing was published.

## Evidence and verification boundaries

Implementation was reconciled against actual reference screenshots and selected live interactions, rather than source-code reconstruction. This task did not inspect or copy JavaLab source or assets. All replacement artwork and numerical code are independently drawn/written.

The implemented 19 diagrams were rendered using Sharp and visually inspected as a contact sheet. These are SVG renders, not browser screenshots and not a pixel-equivalence comparison with the originals. Device/browser interaction testing remains a separate integration stage.

Do not describe all 19 as fully original-behavior-verified. ID23 was rechecked live and replaced with the stateful switch activity on2026-11-06; ID28 has a separate source-status record below. ID72's exact original insertion gesture is unverified. Other limits appear below and in the corresponding lesson notes.

## Per-ID acceptance and remaining limits

| ID | Restored spatial/interaction relationship | Source/behavior limit |
|---|---|---|
|12|Upright battery at left, horizontal plates center, slab entering horizontally from right, vertical field and bound-charge polarity; independent plate width, distance and field visibility.|Original third slider's meaning was not observed and was not invented. Fixed relative permittivity3; partial insertion capacitance is computed as parallel regions.|
|13|Finger above layered side-view glass; alternating Rx/Tx, ground capacitors and mutual coupling arches; draggable approach and self/mutual selection.|Qualitative field paths, not calibrated product signals.|
|19|Hand-held left-approaching rod, horizontal conductor on two insulating supports, near/far charge separation.|Charge movement is qualitative, with fixed total particle count.|
|23|Upright left battery(+top), central horizontal plates, central upper changeover common, lamp in the top-right horizontal branch, shared bottom return. One native switch button alternates charge and discharge with an open interval. Fixed ions and mobile-electron redistribution.|Original live page verified2026-11-06, superseding failed earlier attempt. Independent RC assumptions6V,20mF, charge path100Ω, lamp150Ω;0.6s break-before-make. Charge/voltage are continuous across repeated switches; lamp power is Vc²/R and decays to zero. Carrier marks are qualitative. No original parameter/timing or temperature-model equivalence claimed.|
|25|Matched left bent-water/right hypothetical linear-water streams, upper-left taps, rods on right, corresponding molecule bubbles, shared charge state.|Original exact deflection magnitude was not measured. Rendering explicitly isolates permanent-dipole explanation and omits induced polarization of hypothetical nonpolar molecules.|
|26|Face-on plate changes square/rectangle/circle/triangle boundaries; mobile negative charges concentrate at edge/corners; ×2/÷2 actions.|Qualitative distribution, not a boundary-element solution for arbitrary conducting shapes.|
|28|Perspective floor, lying can and parallel draggable rod; neutral near/far polarization, damped attraction and no-slip rolling.|Official illustration verifies geometry and article verifies approach/polarization/attraction. The new layout-can.js implements a declared qualitative force/motion model. Original live WebGL and exact gesture parity remain unverified.|
|40|Fixed left upright battery, oblique horizontal center plates, upright right lamp; two independently draggable flexible wires snap to actual terminals; stored charge is retained while disconnected and drains through lamp.|Exponential charging/discharging uses stated qualitative time constants, not measured original C/R values.|
|41|Large tubular rectangular loop, top bulb, bottom three independently included cells, left microscopic cutaway, right gap, distinct movable conductor/insulator samples.|Conductor insertion + second cell was observed in original; insulator-only original result wasn't separately verified. This implementation uses ordinary low-voltage insulating behavior and states that limit.|
|42|Lower-left sleeping cat, center-right draggable balloon, far-right neutral wall; charge gained by actual rubbing travel, then moving to wall.|Original rubbing was observed; exact original sticking/levitation conditions are unverified. Implemented sticking is identified as qualitative reconstruction.|
|45|Long two-layer side section,5V left/0V right; finger descends from above, local bend makes contact, sensed voltage decreases left→right; resistor stays on longer remaining upper segment.|Uniform-sheet divider and contact bend are idealized. No top-view XY touch grid.|
|54|Upright flask, top disk/stem/lower leaves, independently movable upper-left rod and upper-right grounding hand; induction→ground→remove ground→remove rod sequence.|Charge-angle relationship is qualitative. Ground/isolated charge conservation is enforced.|
|55|**Flat** circuit, bottom horizontal battery, two top serial components, V-meter arched across R1, A-meter in right return; reveal controls retain meter circles while hiding answers.|No topic1 height landscape added. Checked observed1Ω+4Ω,6V→1.2V/1.2A.|
|56|**Flat** circuit, bottom horizontal3V source(+right), Ground interior, three top0/10/20/open choices, boundary-node potentials, optional hidden middle answers.|No height landscape added. Floating nodes marked indeterminate; all-zero ideal short is not assigned a finite current.|
|69|Two horizontally aligned charges with full green field-line geometry, independent corresponding charges, opacity, and hanging-balloon alternative.|Suspension anchor spacing was not visible in original. Point-charge integration is used; balloons do not simulate distributed surface charge.|
|72|Two initially loose green meters inside right side, two10Ω upper loads, **two horizontal1.5V cells** below; series/parallel network change and movable measurement locations.|Exact original meter insertion gesture was unverified. Dashed measurement sites and drag-to-insert interaction are a disclosed reconstruction. Circuit connections, main/branch currents and detached0mA are tested.|
|73|Charged hand-held rod left; fixed gray metal block/right regular positive-ion lattice; independent free-electron movement/traces respond to rod distance.|Microscopic traces and displacement are qualitative rather than an electron-dynamics solver.|
|74|One common left rod; equal-size conductor **above** insulator **below**; fixed ions, freely moving upper electrons versus local lower orbits.|Bound orbit distortion is qualitative; simultaneous comparison and charge neutrality retained.|
|78|Initially empty click-to-place canvas; red nuclei, local inner contours and shared outer contours merging with nearby atoms; reset removes placed atoms.|Uses softened Coulomb-type potential contours, not actual quantum band eigenvalues. Original exact spacing/debounce rules unverified. Performance limit12 atoms. No generic energy-axis/band-column substitute.|

## Tests executed

- `node --check labs/modules/layout-electrostatic.js`: passed.
- `node tests/layout-electrostatic.cjs`: passed.328 parameter/time renders over19 IDs; all64 combinations of three component selections; finite values and dimensions; stable same-time render and reset; explicit spatial markers; two capacitor leads and retained/discharged charge; material insertion; rub transfer; touchscreen divider direction/contact; induction and grounding conservation; exact meter readings; floating-node and ideal-short handling; movable ammeters; point/balloon alternatives; click-built contours; pointer letterbox conversion/cancellation; keyboard handling.
- `node tests/render-electrostatic-layouts.cjs`: passed.19 SVG-rendered PNGs plus contact sheet. Visual inspection completed; finger-contact geometry, rod/hand orientation, top-load connection art and two-cell supply were corrected after inspection.
- Full integration and device checks are distinct from the focused tests listed here.

## Integration

Add `layout-electrostatic.js` after `electrostatic.js` and before shell execution in the electricity page. Include it in the VM imports of aggregate models/shell tests. Add `tests/layout-electrostatic.cjs` to the test runner. Existing base-only scientific tests can remain unchanged: they verify the superseded base models separately, while this file's acceptance tests verify the restored overrides. Ensure any user-facing completion statement preserves the static/gesture limits above.

## Bounded real-browser interaction QA

Cloud Chrome preview was tested at the local static preview, without publication.

- **40 passed:** independently dragged both leads onto battery terminals; resumed time and observed charging and accumulating plate charges. Paused, moved both leads to lamp terminals, resumed and visibly observed the glowing lamp, discharge label and decreasing stored charge (99→80 relative units across the captured interaction). First QA caught decorative terminal circles intercepting re-grab at an exactly snapped endpoint. Fixed with `pointer-events="none"`, then repeated the full flow successfully. A preview reload caused by concurrent integration briefly reset an earlier trial; that trial was not treated as completion.
- **72 passed:** paused, dragged the first loose meter onto the left series path, and visually observed the inserted meter reading150mA. This verifies the replacement's measurement gesture, not parity with the unverified original insertion gesture.
- **78 passed:** clicked to place one atom, clicked nearby to add a second, visually observed two inner nuclei and shared peanut-shaped contours, then clicked Reset and observed count return to0.
- **54 and the other IDs:** model/interaction unit tests and SVG visual review completed; no additional real-browser gesture claim.



## Topic23 live-source correction (2026-11-06)

A new live visit to https://javalab.org/ko/capacitor/ succeeded. Actual screenshots and repeated native switch clicks verified initial neutral lamp-side state, moving central blade, left charging state with upper positive/lower negative plates, then right-side return to neutral. The source check additionally observed transient lamp glow. The former static placeholder and its wrong continuously parallel branch were removed, not merely relabeled. Focused tests cover partial charging, open-interval conservation, partial discharge/recharge, rapid reversals, reset, power/energy balance, one native control, and mutually exclusive contact geometry.

Topic23 real browser QA passed on the local preview: native switch charged the capacitor to5.723V while the lamp stayed isolated/off; switching right preserved that starting voltage, visibly illuminated the lamp, then showed voltage/power decay (1.182V/9.311mW to0.265V/0.469mW with lamp off). Reset restored neutral plates, lamp-side position and0V. The actual screenshot retained the upright left source, middle horizontal plates, top-right lamp and common bottom rail. Full `node tests/run.cjs` passed after this change. No publication.

## Topic28 integrated browser check

Cloud Chrome on the local integrated preview: dragged the charged rod closer; neutral can retained net charge0, polarization rose from34% to64.8%, displayed can translation reached13.17 model units, and actual scene showed the can rolling toward the rod. Independent tests verify opposite rod polarities both attract, reversed spatial position changes force direction, no-slip rotation, no overlap, zero charge, pause/reset and inverse pointer projection. This does not certify the original live gesture or physical touch devices.

## Additional scientific regressions

Plate-width control12 now scales physical area and capacitance, verified with180/220 relative widths and no dielectric overlap. Field-line model69 now includes boundary-entering lines for a net-negative unequal pair, not just lines emitted by the smaller positive charge.
