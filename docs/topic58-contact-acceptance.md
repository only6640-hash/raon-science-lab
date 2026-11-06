# Topic 58 independent contact restoration

Prepared against commit fbb18887dc9026791cad7e31138208128b8f0498. The correction was prepared and tested in an isolated baseline copy. Existing shared checkout files were not changed.

## Confirmed discrepancy

Reference: https://javalab.org/ko/fnd/

Deployed comparison: https://only6640-hash.github.io/raon-science-lab/electricity/?topic=58

The source was tested directly in cloud Chrome. Clicking package pin 10 illuminated the center segment. Clicking pin 1 on the right-hand equivalent circuit added the lower-left segment while pin 10 stayed connected. Clicking right-hand pin 1 again removed only that connection. Both diagrams therefore expose independent, simultaneous contacts. A preliminary attempted wire-end drag was inconclusive and is not counted as a source gesture pass.

The deployed lesson only stored one selected pin, replaced an existing connection when another pin was chosen, and did not respond to right-hand equivalent-circuit pin input. This prevented constructing multi-segment patterns.

## Narrow correction

- Eight independent contact values, including the decimal point, replace the single selection.
- Both diagrams use the same per-pin toggle values. Pointer input, Enter/Space and the fallback controls agree.
- Existing component positions, package outline, equivalent-circuit row, sources and common-return layout are retained.
- Common cathode pins 3 and 8 are fixed terminals, not selectable signal pins.
- Distinct focus identifiers preserve focus on the selected diagram after repaint. Connected supply paths do not intercept repeated contact clicks.
- Secondary pointer buttons, non-primary pointers and keyboard auto-repeat do not create extra toggles. Repeated Space/Enter on a contact still suppresses native defaults, preventing held-Space scrolling.
- The changed module uses the fresh `topic58-contacts-v1` asset URL; other asset versions are unchanged.
- The lesson explanation and recorded control values now describe all simultaneously connected pins.

## Validation completed

- `node tests/segment-contacts.cjs`: all 256 contact combinations, independent mappings, both diagram targets, re-click behavior, Enter/Space, ignored input, reset defaults, shared cathodes, unique focus identifiers, non-intercepting connection paths, repeated-activation default suppression, and the updated asset URL.
- `node tests/run.cjs`: full suite passed, including 3,000 renders across 83 models, 83 shell navigation/control/reset flows, 972 electronics layout renders, and existing physics regressions.
- Actual cloud Chrome on the isolated managed preview: package pin 10 plus equivalent-circuit pin 1 produced two lit segments and the readout `1, 10` / `e, g` / `2`; focused Enter on right-hand pin 1 removed it while pin 10 stayed on; Space activated the decimal point; repeated native clicks on pin 10 produced on then off; Reset returned all contacts off. A final 1.5-second held-Space test toggled once and kept the page scroll position at 124 pixels. Final native clicks repeated the two-contact and Reset checks. Screenshots were visually inspected. No source layout was replaced.

## Remaining limits and release verification

This verifies only the listed topic-58 behavior. Physical touch devices, narrow mobile layouts, the original drag gesture, other lessons' remaining source-fidelity gaps, microphone hardware, native file-download and print dialogs remain unverified.

Publication must preserve unrelated work and use an expected-head check against the current remote. This report records the tests completed before release; a successful repository update alone does not establish deployment success. Verify the exact commit in the Pages workflow and repeat the topic-58 public-page test after release.
