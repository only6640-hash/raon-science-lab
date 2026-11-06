# RAON SCIENCE LAB

Independent interactive science lessons for Korean classrooms.

## Electricity and electronics

Open `electricity/index.html` through a static web server. The category contains 83 explicit topic IDs. A lesson can be linked directly with `electricity/?topic=21`.

- Original SVG diagrams with controls immediately below them.
- DC/AC free-wiring workbenches: up to eight movable nodes and sixteen editable components, selectable voltage probes, branch measurements, short/open/floating detection.
- Prediction, observation, explanation, local result comparison, CSV export and print.
- Reduced-motion support, keyboard sliders and node positioning, optional diagram zoom.
- Optional microphone visualization in the speaker lesson starts only after the user chooses it and grants browser permission. Audio stays local and is not uploaded or recorded.

Serve locally, for example with `python3 -m http.server 8000`, then open `http://localhost:8000/electricity/`.

## Validation

Run `node tests/run.cjs` from the repository root. This requires Node.js and no external packages. Tests cover all model contracts, parameter boundaries, mode-aware response, scientific invariants and a DOM-contract harness. They do not replace actual browser/device QA.

Read `docs/science-validation.md` for scope, assumptions and remaining verification limits. Reference links are provided in each lesson. These independently authored adaptations are not copies of the reference programs and do not claim identical functionality.
