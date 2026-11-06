# Switching history:17 /39 /62

The final `layout-transients.js` override replaces assumed initial-state snapshots with stored capacitor voltage and inductor current. It loads after `layout-electronics.js`. Diagram arrangements remain four inductor/LED applications, three capacitor applications, and paired RL/RC circuits.

- State starts unenergized, continues across repeated switching and preserves voltage/current at a same-time switch change.
- Run off freezes stored state. Resuming continues, not restarts. Shell pause freezes the supplied time.
- One screen second represents10ms of circuit time;17 also has an observation-speed setting.
-62 plots actual sampled current history, not a predicted future trace. Changed settings do not rewrite the past.

## Explicit models

17 uses finite winding resistance, rectifying LED thresholds/dynamic resistance and a declared leakage/snubber path, so an opening switch does not destroy stored inductor current. These are explanatory equivalents, not construction instructions. The scope is stated in the lesson note.

39 left retains isolated capacitor charge. Its middle two rectifying branches each include100Ω effective series resistance, visibly annotated. A single closed charge/discharge switch has τ=(R+100Ω)C. With both closed the final capacitor voltage is1.5V and τ=(R+50Ω)C; actual source/discharge LED currents are computed independently and remain15mA each at equilibrium. This avoids a false short or fictitious switch interlock. The right panel includes source/contact resistanceR, giving final1.5V, chargeτ=RC/2 and dischargeτ=RC. LED thresholds in this capacitor comparison are idealized to0V.

62 is a5V linear RL/RC comparison with a common source/return selector. Component changes preserve stored voltage/current; energy differences from changing a component are attributed to work by the adjustment, not free energy.

## Tests

`node tests/transient-history.cjs` checks continuity, exact step response, KCL, timestep subdivision agreement, charge retention, passive decay, pause/resume/reset, extreme values, history retention and real terminal connectivity. Independent scientific review additionally checks the drawn diode polarity and branch-current equations.

Actual browser interaction and original-gesture parity are separate from these numerical and SVG tests. Hardware/device certification is not claimed.

## Integrated cloud-browser check

39: held the drawn middle charge switch for2s, released and observed1.90V retained; held the discharge switch for2s and observed0.70V retained. Both native selectors on converged to1.50V with approximately15mA in each LED branch.62: actual switch selection showed increasing inductor current and decaying capacitor charging current; returning the selector gave negative capacitor current while the inductor current retained its positive direction. Pausing froze4.836V,91.989mA/−96.715mA, the graph and193.96ms across a later read. Actual diagrams and readouts were inspected, not just DOM mocks.
