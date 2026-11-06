# Terminal workbench restoration: topics 10, 37 and 43

Date: 2026-11-06. This is a local implementation and validation record. Nothing was published.

## Restored teaching arrangement

- **10: electric_circuits** starts with an empty pale-green work surface and a pale-orange **left** palette: resistor, bulb, wire, horizontal battery, voltmeter, ammeter. Learners drag parts, join actual terminals, reconnect wire ends, move or rotate components, and change a selected resistor/bulb/battery value. Controls include current/electrons, battery internal resistance, labels, light rays, power and grid snapping. No eight-node canvas or preset circuit is substituted.
- **37: home_wiring** retains an isometric room, refrigerator on the **left**, desk device in the **middle**, TV on the **right**, and wall outlets above them. A utility pole outside on the **far left** supplies a two-terminal panel. The wire/ammeter palette is at the **lower left**. Each orange X disappears only when the corresponding connected load actually consumes power. The user constructs real branches between panel/outlets; no switch-only shortcut or precomputed circuit is used.
- **43: electric_circuits_ac** retains a free assembly area, an upright **four-socket strip near the center**, and a **left** palette containing 100 W TV, 1 kW kettle, 300 W washer, 30 W lamp, wire, voltmeter and ammeter. Source choices are 100/110/115/220/230 V, with five socket appearances. This is a household-appliance RMS workbench, not an RLC example.

Reference: https://javalab.org/ko/electric_circuits/ , https://javalab.org/ko/home_wiring/ , https://javalab.org/ko/electric_circuits_ac/ . The previously completed visual reference audits establish those spatial relationships. Artwork and implementation here are independently drawn. This does not claim identical original geometry, every original interaction, pixel parity, or copied original software.

## Connectivity and physical assumptions

Each component terminal is a distinct electrical node. Wire endpoints attach to actual terminals or other wire endpoints. Crossings alone do not connect. Moving a connected component carries its attached wire endpoints. Removing a component releases its wire endpoints. A maximum of 40 movable components bounds computation; there is no eight-node limit.

A real-valued modified nodal solver supports arbitrary graphs, multiple voltage sources, battery internal resistance, resistor loads, ideal wires/ammeter branches, and an ideal non-loading voltmeter. Each disconnected network receives only a mathematical reference, not an artificial grounding resistor. Rank-revealing elimination distinguishes inconsistent source constraints from underdetermined branch currents. Equal ideal parallel batteries retain a valid load voltage/current but do not invent individual battery current sharing. Conflicting ideal batteries and nonzero ideal-source shorts stop the calculation. Finite-resistance battery shorts are solved and their internal heating is shown.

AC and household wiring use resistive RMS equivalence: appliances have fixed R = 220² / rated watts. They do not model real motor dynamics, switching electronics, power factor, inrush or frequency-dependent impedance. Both topics depict deliberately slowed reciprocal AC charge movement, not steady DC movement. Meter magnitudes and measurements are labelled RMS. DC meter signs follow first-to-second terminal orientation. A voltmeter between disconnected networks shows an undetermined reading. Source and resistor energy balance includes battery internal loss.

The old M[10]._test.solve API remains intact for topic 18. New workbench mathematics is separately available as _test.solveGraph.

## Verification completed

1. `node tests/layout-workbench.cjs` passes 20 initial graph cases plus additional ideal-parallel aggregate-power and household RMS tests. Cases cover series/parallel, internal resistance, same/opposing series batteries, equal/unequal finite-resistance parallel batteries, ideal parallel indeterminacy, source conflict, ideal/finite-resistance shorts, open loads, disconnected probes, reversed meters, redundant ideal loops, bridge balance, and a 17-node chain.
2. Actual model networks verify 220 V TV+kettle = 1100 W and 5 A, all five mains voltages with quadratic power response, independent room branches, moving terminals, deletion, and legacy topic-18 calculations.
3. A deterministic DOM/pointer harness verifies SVG coordinate conversion, pointer capture, terminal creation/joining, click-then-click wiring, pointer ID filtering, cancellation rollback, repeated creation, attached-wire following, keyboard placement/movement/connection/delete/cancel, blank/bounded value inputs, rotation and reset.
4. The integrated `node tests/run.cjs` suite passes after the final edits, including 83-model contracts, shell navigation/control/reset, and all other topic suites. This is not an assertion that every legacy test exercises the new workbench: the dedicated workbench suite above does.
5. Six SVG/PNG evidence pairs were generated for10/37/43 initial and wired states. They were generated with `node tests/render-workbench-layouts.cjs`. Initial 10, wired 10, initial 37 and wired 43 were visually inspected at 1200×675. These files are SVG rasterizations, **not browser screenshots**.
6. **Actual cloud Chrome browser QA** on the integrated local preview verified:
   - Topic 10 empty composition and left palette.
   - Dragging a battery and resistor from the palette, joining both terminal pairs, and obtaining 0.9 W for 3 V / 10 Ω.
   - Selecting the resistor and changing it to 20 Ω, yielding 0.45 W.
   - Reset restoring an empty workspace.
   - Topic 43 centered four-socket strip and correct appliance palette.
   - Dragging the TV and wiring it to the strip: 100 W and 0.455 A at 220 V.
   - Changing mains to 110 V: 25 W and 0.227 A.
   Browser QA found and fixed a component selection hit-area issue; the transparent body target was added and selection/value editing was rechecked successfully. Browser screenshots were observed through the browser tool; they are not saved among the raster evidence files.

## Honest remaining limits

- Room37 was additionally tested in integrated cloud Chrome: keyboard terminal connections powered the refrigerator at180W/0.818A RMS; adding the TV in parallel gave280W/1.273A RMS; Reset returned all loads to0W and removed supply connections. Actual scene and results were inspected. AC animation direction remains covered by deterministic half-cycle tests.
- No physical touchscreen, small-screen device, screen reader or cross-browser certification was performed. Keyboard and pointer-cancel behavior was tested in the deterministic harness, not on all real devices.
- No source-side exhaustive wiring behavior or byte-for-byte parity is claimed. Initial source-layout audits had incomplete powered-network verification for 37 and 43.
- Undo history, source sharing URLs, realistic lamp temperature and real-world electrical safety apparatus are outside this implementation. The UI explicitly warns against copying these circuits onto household mains.
