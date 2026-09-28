# Household Weekly Meal Plan Card (template + voice spec)

A short, warm card that tells everyone in the house what the week's food looks like, so they can look forward to it. Claude generates it from the week's plan and your calendar, then drafts it as an email for you to send on Sunday night.

**Trigger:** "Generate the weekly meal plan" / "Sunday menu"

## How Claude generates it

1. **Read the week's plan** (`meal-plan.md`, or a `plans/YYYY-MM-DD-week.md` file if you keep one per week).
2. **Pull dinner reservations from the calendar.** Scan your calendar (and your partner's, if shared) for restaurant reservations that week. A reservation night is a night out: no home cook scheduled.
3. **Tag every meal:**
   - 🍳 = cooking at home
   - 🥡 = delivery / takeout (meal kit, prepared-meal service, pickup)
   - 🍽️ = dinner out (name the restaurant and time)
4. **Be honest about solo and away nights.** If someone's traveling or out, say so lightly. Don't write a menu for people who won't be there.
5. **Write each dish appetizingly but truthfully:** real ingredients, no invented flourish.
6. **Draft the email** to the household (subject like "This week in our kitchen 🍅") with the card as the body. **Draft, don't send.** You hit send.

## Format (fixed structure)

- Title: **🍅 Our Week in the Kitchen**, the date range, and a one-line theme
- **Key line, always:** `🍳 = cooking at home · 🥡 = delivery · 🍽️ = dinner out`
- One short intro sentence about the week's vibe
- Day by day, each with a `·` sub-label ("date night in," "the easy one," "farmers market day"); every meal line tagged 🍳 / 🥡 / 🍽️
- Reservation nights: 🍽️, restaurant name and time, one line of anticipation, no home menu
- Solo or away nights: a one-liner, no menu
- A light sign-off ("Hungry yet?")

## Voice rules

- Warm, a little playful, food-forward. It should sound like a person in the household wrote it, not a caterer.
- **Avoid:** "delve," "elevate," "culinary journey," "nestled," "boasts," "perfectly," "a symphony of," "not only… but also," em-dash pileups, lists of three for rhythm.
- **Aim for:** concrete ingredients, real texture and flavor, honesty about lazy nights, inside jokes where they fit.

---

## Worked example

# 🍅 Our Week in the Kitchen
### July 21–26 · first week home from a trip

**🍳 = cooking at home · 🥡 = delivery · 🍽️ = dinner out**

*Easing back in: lighter, greener, and finally putting a dent in all those dried beans.*

**Wednesday · date night in**
- 🥡 **Lunch**: your pick from the delivery box
- 🍳 **Dinner, done properly:**
  - To start: three-bean salad in a spicy tomato dressing
  - The main: grilled vegetable skewers over a herby quinoa-and-bean pilaf, brushed with umami sauce
  - To finish: sliced peaches and blueberries

**Thursday** · you're away tonight. I'll be testing veggie burgers on myself, no witnesses.

**Friday** · still away, back Saturday for the market. Keeping it low-key solo: red bean and arugula salad, no stove.

**Saturday · farmers market day**
- 🥡 **Lunch**: Waldorf salad and garlic baked tofu
- 🍳 **Dinner**: chilled zucchini soup from the market veg, with a good pot of beans alongside

**Sunday · night out**
- 🍽️ **Dinner**: our favorite Italian place, 7:30pm. No cooking, just us.

*Hungry yet?*
