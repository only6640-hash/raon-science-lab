# Magnetic layout acceptance, 2026-11-06

Implementation: `labs/modules/layout-magnetic.js`, loaded after the original magnetic science module. Independently authored artwork and interaction. No publishing performed.

## Evidence classes and remaining limits

The references were inspected in an actual cloud browser. For IDs29/48/49/68, official category thumbnails supplied additional independently inspected spatial evidence.

**Static-only references are not full acceptance:** IDs2/29/48/49/68 preserve observed official-thumbnail arrangements. Their live simulation/control fidelity remains unverified because the original did not render. These lessons explicitly disclose this in the scene and teacher note. ID81 preserves observed scene placement but explicitly labels the pickup interaction as independently authored because the original gesture was not verified.

## Per-ID acceptance

- 2: Static-only. Vertical bar LEFT with S above/N below; Earth RIGHT, matched spatial compass fields. No invented claim of original live 3D control parity.
- 3: Restored. Left power/rail/rod apparatus and right horseshoe open to right, N above/S below; perpendicular wire cross-section and correct force sign. Field curves are explicitly qualitative.
- 4: Restored. Intentionally empty workspace, narrow left palette, draggable clones, click/Enter rotation, arrow-key movement, delete/reset. Unpowered coil contributes no field; compass and lines respond to all placed sources. Does not simulate mechanical forces between objects.
- 5: Restored. Left editable position-versus-time graph controls vertical magnet above/inside vertical coil on right; adjacent meter on same loop. Smooth position derivative drives Faraday current; winding/polarity reversal and stopping tested. Interpolation and numerical scales are independent.
- 6: Restored. Horizontal coil, battery immediately below with default positive right; dense compass matrix and independent current/winding reversals. Hand/current overlays. Compass field is dipole approximation.
- 7: Restored. Horizontal magnet left, horizontal coil right, lamp/meter replacement above coil, separate reciprocation and rotation rates. No reuse of5's vertical graph arrangement.
- 20: Restored. Upright wire arch through perspective horizontal compass board; resistor and battery in return circuit below. Reversal is linked to battery/current and numerically sampled Biot–Savart compass field. External return-wire field omitted.
- 27: Restored. Centered horizontal N-left/S-right bar and full dense compass/arrow matrix.
- 29: Static-only. Perspective horizontal compass board, upright multi-turn arch, battery LEFT, large hand grip over board. Original camera and live controls remain unverified.
- 30: Restored. Huge Sun left/small Earth right on dark field; particle streams, geomagnetic deflection/polar entry, vertical Earth magnet overlay. Quantitative magnetospheric dynamics not claimed.
- 33: Restored. Hand-held diagonal magnet ABOVE horizontal nail; burner directly BELOW. Nearby directional rubbing changes signed retained alignment; heating erases it. A distant pole change cannot reverse remanence, and a reverse stroke reduces the prior alignment. Original exact magnetizing-sweep thresholds were not verified; independent qualitative hysteresis interaction.
- 34: Restored. Empty workspace with short/long bars, two horseshoe orientations and compass; free drag/rotate, combined fields. Not a fixed pair comparison.
- 36: Restored. Rectangular loop, resistor LEFT, compass on TOP horizontal wire, battery BOTTOM. Depth changes draw order and B sign; battery rotates between disconnected and two connected polarities. North guide points right. Current/electron mode distinction preserved.
- 48: Static-only. Oblique rotor, left/right magnets, exposed split contacts and front/lower-left brush supports, external +/− leads. No invented battery or reused67 scene. Live controls remain unverified. The independently implemented rotor now uses a rigid3D projection, side-bound current/force arrows, and commutator-consistent torque; these signs are regression-tested.
- 49: Static-only. Upright negative-top cell on bottom cylindrical magnet and gray board; broad surrounding asymmetric rotating-wire geometry and local field/current/force arrows. No separate abstract force inset. The wire now actually rotates around the fixed battery/magnet under signed torque, inertia and damping; polarity reversal decelerates then reverses it. The original live speed/control behavior remains unverified.
- 50: Restored. Central toroidal iron core, separate primary/secondary loops, source left/load right, synchronized voltage plots at outer edges. Secondary winding/phase reverses; open load makes both ideal load currents0 while output voltage persists. Power balance tested.
- 61: Restored. Upper conveyor motion left→right, right end magnetic wheel, distinct falling paths with independent iron/aluminum visibility. Qualitative paths; no separate eddy-current separator.
- 65: Restored. Wind drive and distant turbines, oblique rotating coil between magnets, two separate slip rings/brushes lower-left, horizontal leads to replaceable lamp/galvanometer/scope at lower-right. Generator phase/scaling tested. No load-reaction dynamics.
- 67: Restored. Oblique magnets/rotor, split commutator lower-left, battery below-left. Independent field/current/force/torque/run, with arrows bound to actual coil sides. Prescribed observation rotation, not mechanical speed integration.
- 68: Static-only. Hanging circular wire left, top +/− leads, vertical S-above/N-below horseshoe behind bottom segment; matching open-hand force rule right. No inference of original unnamed sliders. An explicitly independent damped swing model now moves the hanging ring in the force direction, reverses its deflection with current, and returns it at zero current. Model mass/damping are disclosed assumptions, not original values.
- 70: Restored. Top numerical reading arc, linked exposed moving coil/needle, flanking magnets, spring, three terminals and shunt wiring below, external clips. Range switches corresponding negative terminal and numeric scale.
- 75: Restored. Two matching loop apparatuses, upright left batteries/top resistors/right vertical wires. Left card/filings/draggable compass versus right field arrows/right-hand comparison. Reversal turns battery polarity and current arrow; compass follows projected local tangent.
- 81: Partial interaction acceptance. Magnet/hand upper-left with blank approach gap; three nails on lower baseline. Direct approach/pickup provided as explicitly independent qualitative behavior; original draggable anchor and exact nail behavior remain unverified. No unrelated microscopic domain replacement.

## Validation

- `node tests/layout-magnetic.cjs`:23 IDs,302 boundary/time/control cases; required spatial groups; draggable workspace clone/move/rotate/reset; graph-handle motion; induction stop/polarity/winding signs; Oersted depth/current signs; transformer open-load and power balance; generator scaling; ammeter range conversion.
- Original `labs/modules/magnetic.test.cjs`:passed, retaining baseline science regression coverage.
- Aggregate model contract with new layer:1228 renders across83 models, all controls affect output, finite values and nonnegative SVG dimensions; circuit science assertions passed.
- Shell DOM contract with new layer:83 navigation/control/reset flows, history/search, records/CSV, print hook, pause/menu state passed. This is not native device/touch QA.
- All23 SVG scenes raster-rendered and actual contact sheet pixels inspected. Fixed top scale clipping, vertical coil orientation, compass direction and battery/current polarity consistency.
- Native browser and device testing are distinct from event tests; standalone event tests do not establish all touch/browser behavior.

## Additional functional regression pass

`tests/magnetic-motion.cjs` verifies48 current and force orientation on both coil sides for eight angles/two supply polarities,49 actual angle evolution/reversal/pause/zero-current stop,68 signed settling/reversal/zero-current return, and33 stored signed remanence plus distant-pole isolation and persistent heat reset. Nine rendered states of48/49/68 were inspected after these corrections. Original live interaction parity remains explicitly unverified.

## Integrated cloud-browser motion check

49: verified actual changing wire geometry about the fixed upright battery, speed rising to+6rad/s, supply reversal giving negative torque and eventual−6rad/s, and model pause state.68: observed+8.693° equilibrium, current reversal reaching−8.692°, and zero current returning to−0.004° (equilibrium0°). Actual screenshots and displayed measurements were checked.48 additionally has an independent virtual-work regression: signed angular torque, displayed side forces and direction of angle progression agree. Original unavailable WebGL gesture parity and physical mobile touch remain unverified.
