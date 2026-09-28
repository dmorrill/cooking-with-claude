# Recipe Iteration Log (template)

For a recipe you're developing over several attempts: recreating a family recipe from someone's memory, dialing in bread at altitude, or matching a restaurant dish. Add these sections to the bottom of the recipe file. The recipe itself stays up to date with the current version; the log keeps what you learned so the next attempt starts from it.

**Trigger:** "Log this bake" / "Here's how attempt #N went"

---

## How Claude uses it

1. **Before an attempt:** read the target, the last findings, and the planned changes. Remind you of the process problems last time ("shop the day before, check the pan is clean").
2. **After an attempt:** you describe what happened, what it looked and tasted like, and what the person you're cooking for said. Claude fills in the log row and findings, updates the recipe steps (marking what changed and why), and drafts the plan for the next attempt.
3. **Schedule the next attempt** on the calendar, with the changes list in the event description.

---

## Sections to add

```markdown
## The Target

What you're aiming for, in concrete terms. When the target is someone's memory,
write down their words. When in doubt, the description wins over the instructions.

- [color, texture, size, flavor, what it should NOT have]

## Attempt Log

| # | Date | Version | What changed | Result | Taster's verdict | Next change |
|---|------|---------|--------------|--------|------------------|-------------|
| 1 | | v1 | Baseline | | | |
| 2 | | v2 | | | | |

### Attempt #1 findings

**Worked.**
- [the bet that paid off, and why]

**Did not work.**
- [the miss, with the root cause if you can find it]

**Process problems** (cost time, not quality):
- [what went wrong in the workflow]

### Changes for attempt #2

**Headline change:** [the one most likely to close the gap]

**Other changes:**
2. [change]: [why]

**Carried over fixes:**
3. [fix from attempt #1's findings]

### Keep the test honest

Only change what you chose to change. List what stays fixed between attempts
(pan, flour, fermentation schedule, batch size) so a different result can be
traced to the variable you meant to test.

If an attempt drifted on something unplanned (a missing pan, no cream in the
house), write down why, so the next attempt can prevent it.
```

---

## Worked example (condensed)

**Target:** cinnamon rolls from a family member's memory. Very dark tops, no frosting, thin even layers, about six swirls, no puffy outer ring.

| # | Version | What changed | Result | Taster's verdict | Next change |
|---|---------|--------------|--------|------------------|-------------|
| 1 | v1, half batch | Baseline; went 50/50 white and brown sugar | Layers yes, color no | "Hers were browner, and had cinnamon sugar on the outside" | Roll the outside in cinnamon sugar; bloom the yeast; longer proof; pull on color, not temperature |

**Findings:** the geometry (a long, thin sheet cut into 1" strips) produced clean coils with no plain outer flap. Color was the biggest miss: the centers hit temperature while the tops were still pale, so the bake ended on the wrong signal.

**Keep it honest:** attempt #1 drifted on four things (pan, milk instead of cream, sugar blend, schedule). Only one of those was chosen on purpose. Fix: shop for the recipe the day before and check the pan is in the kitchen before mixing the dough.
