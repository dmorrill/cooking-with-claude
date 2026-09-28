# Event Prep Packet (template)

For a meal that's bigger than a weeknight: game night, a holiday, a dinner party. A menu isn't enough on its own. This turns it into a packet you can run: who does what, which appliance does which job, a countdown from days out, a minute-by-minute cook day, and a check-vs-buy list.

**Trigger:** "Plan [event] dinner for [date]" / "Turn this menu into a prep packet"

Save it as `menus/YYYY-MM-DD-event-name.md`.

---

## How Claude builds it

1. **Start with the point of the night.** One paragraph on what actually matters. For game-night chili, the toppings may be the event and the chili is the vehicle. Everything else follows from this.
2. **Menu table:** course, what, when it's made. Push anything that holds well to the day before.
3. **Equipment plan:** give each appliance one job it's best at, and say why. Also list what should stay *off* the machines (cornbread batter in a food processor goes tough).
4. **Countdown from days out:** the few small things that must happen early (place the grocery order, soak beans the night before). Check the calendar for travel and plans, and fit the countdown around them.
5. **Cook-day timeline:** time, task, machine. Mark unattended blocks clearly so you can leave the kitchen.
6. **Serving-day timeline:** work backwards from the time you want to eat.
7. **Ingredients: check vs. buy.** Cross-check every item against inventory. Three buckets: confirmed on hand, verify (stale records), buy.
8. **Nutrition read:** how the menu lines up with your `nutritional-philosophy.md`, and where it costs you. Suggest portioning over removing.
9. **Notes:** the fallback if cook day collapses, leftovers plan, and a reminder to save anything new as a recipe file afterwards.
10. **Put it on the calendar:** one event per countdown step, each with the relevant section pasted in, so the packet finds you instead of you remembering it.

---

## Skeleton

```markdown
# 🏈 [Event name]

**Date:** [day, date]  **Eat at:** [time]  **Who:** [people]
**The build:** [dish] · [dish] · [dish]

## The Point of the Night
[What matters most, in one paragraph.]

## The Menu
| Course | What | When |
|--------|------|------|

## Equipment Plan
| Appliance | Job | Why it wins |
|-----------|-----|-------------|
### Keep off the machines
- [item]: [why]

## The Countdown
| When | Do this |
|------|---------|
| [3 days out] | Place grocery order for [delivery day] |
| [night before cook day] | Soak beans (90 seconds of work) |
| [cook day] | The cook, mostly unattended |
| [event day] | Reheat, sides, eat |

## Cook Day ([total time], [hands-on time])
| Time | What | Machine |
|------|------|---------|

## Event Day
| Time | What |
|------|------|

## Ingredients: Check vs. Buy
### ✅ On hand
### ⚠️ Verify
### 🛒 Buy

## Nutrition Read
| Dish | Daily Dozen | Notes |
|------|-------------|-------|
[Where it costs you, and how to portion instead of cut.]

## Notes
- Fallback if cook day collapses:
- Leftovers:
- Save afterwards as recipes:
```

---

## What makes a good packet

- **Front-load the tiny tasks.** A 90-second bean soak the night before can save two hours on cook day.
- **Cook the day before when the dish holds.** Chili, braises, and soups taste better on day two, and event day stays calm.
- **One vessel where possible.** If the chili goes from sauté to slow cook to fridge to reheat to serving in one slow-cooker insert, the only pan you wash on game day is the cornbread skillet.
- **Altitude-correct the numbers** (see CLAUDE.md). Pressure cooking needs about 5% more time per 1,000 ft above 2,000 ft; baking temperatures go up.
