# Electronics layout restoration verification

## Implemented scope
27 electronics lessons excluding43, in `labs/modules/layout-electronics.js`, layered after existing physics models. No reference code/art copied and no publication performed.

Layout evidence comes from actual JavaLab rendered-page audit reports.64 was recovered from the actual pixels of the official thumbnail https://javalab.org/wp-content/uploads/crt.png and remains static-layout-only.71 was initially thumbnail-only but a new live visit recovered its originally empty, four-branch construction activity. Independent held-click testing resolved the fixed-direction presence toggles, which are now implemented. Earlier71 static-only notes are superseded.

## Checks actually run
- `node tests/layout-electronics.cjs`:951 renders including defaults, all control min/mid/max or option states, finite results, nonnegative dimensions, named spatial relations, truth tables, RC and LC invariants, RL/RC filter response, waveform-history retention, and atom placement/reset.
- SVG raster render and visual inspection of all27 diagrams. The generated PNGs and three contact sheets were deterministic SVG rasterizations, not browser screenshots.
- Cloud browser on local preview,2026-11-06: lesson9 on-diagram A switch changed AND0/OR1/NOT0;83 dragged a Ga tile from bottom stock into P region, count became1 and source position emptied;63 dragged vertical spectrum selection, moving wave height and changing visible-light output to X-ray1.81nm. All three outcomes were observed in actual screenshot/AX state.
- Local Chromium automation launch failed because sandbox socket creation was disallowed. That failed attempt is not counted as a browser pass. Browser coverage is the three cloud checks above, not all27 lessons.

## Known limits, not completion claims
-32: hardware layout preview and simulated3V data only, no Bluetooth pairing or micro:bit device measurements. The original device activity charges toward3.3V.
-46: first three circuits were rechecked live and corrected to emitter-side LEDs, complete100kΩ base supply paths and a base-to-ground inverted switch. The fourth visible+3V potentiometer is present. Its right-hand circuit stays covered in the source even at reveal100; fullscreen links and cover dragging did not reveal it. It remains explicitly unverified, not invented.
-58: original drag gesture unverified; this version uses clickable pin contacts as an explicit accessible substitute.
-17/39/62: the original analytical overrides in this file are superseded in the integrated app by layout-transients.js. The separate layer owns continuous state, switching history and declared loss models; see its acceptance report. Do not omit that later script.
-31: separate numerical ideal switching simulation with static6second trace window. Run animates the displayed switch; it does not create a scrolling graph history.
-79/80: preserve graph history after changes, but append new steady-state samples rather than integrating setting-change transients.
-64: static layout recovered; one fresh later source visit still rendered no apparatus. Original live control/dynamic parity remains unverified.71 is no longer in this category.
-83: atom construction/valence relationship only. Full completed-junction dynamics were not source-audited and are not claimed.
-11: optional existing local microphone consent/disposal hooks preserved; live hardware microphone input was not activated during QA.


## Second pass, 2026-11-06

-23 (in layout-electrostatic.js): replaced the static placeholder with the live-source single changeover control, left battery, center horizontal plates, top-right lamp and common lower rail. Stateful RC, break-before-make conservation, partial charge/recharge, energy balance and actual native browser charge/glow/decay/reset passed. See electrostatic acceptance report.
-8: series capacitors now occupy separate gaps with only a short interconnecting wire; no continuous wire bypasses C2. Probe endpoints span the entire stack. Raster inspection and exact terminal/path tests passed.
-17/22: closed resistor-to-ground and AC-source-circle lead gaps. The final transient17 layer also closes its individual diode leads.
-24: DC drift scales with input amplitude. AC electron displacement integrates the sinusoidal resistor current, so velocity has the correct phase and opposite conventional-current direction. Zero amplitude and zero AC frequency are stationary. Finite-difference velocity tests passed.
-46: actual first-three electrical connectivity restored, with no floating base input and no collector-emitter wire bypass. Live preview revealed all three, then on-diagram clicks changed second LED off→on and inverted third on→off. Fourth visible source portion retained with precise cover limit.
-76: charge and magnetic flux persist through switch and pause changes. Exact ideal LC propagation conserves total energy. Charging uses declared200Ω equivalent source resistance, and an opened coil decays through a declared100Ω equivalent flyback-loss model rather than resetting current instantaneously. Parameter changes retain charge/flux and may involve external work. Browser pause retained2.2964V/140.4517mA, paused switch retained both values, running charge approached4.9787V/0mA, and switching back while paused retained that state.
-71: empty initial bridge, four independent midpoint presence toggles in fixed directions L→T,T→R,L→B,B→R, plus current visibility. No user-visible reversed-diodes or invented terminal-drag construction. Keyboard Enter/Space mirrors toggling. All16 visible combinations and all81 internal solver states were exercised; open paths give0A and invalid internal short states are not assigned fictitious finite current. Browser clicks added all four (full-wave,2.869V/2.869mA at observed sample), removed one (half-wave), re-added the same direction, and Reset returned0. Actual source gesture verification is recorded in the shared audit.

Final `node tests/run.cjs` passed after these changes, including integrated transient-layer checks. Focused `tests/layout-electronics.cjs` passes951 parameter/time renders plus the additional geometry, AC-phase, LC-history and bridge-state assertions. Refreshed PNGs and contact sheets are deterministic SVG renders, not browser screenshots. No publication.
