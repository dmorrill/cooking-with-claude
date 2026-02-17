# Prep-and-Assemble Cooking Mode Template

## Overview
A collaborative cooking mode where one person (the prepper) does all the prep work, and another person (the cook) handles the cooking/assembly. This reduces anxiety and creates a great learning opportunity for the cook while ensuring everything is ready to go.

---

## When to Use This Mode
- Teaching someone a new recipe
- Date night cooking with division of labor
- Reducing cooking stress for the assembler
- Recipes with lots of prep but simple cooking (salads, stir-fries, bowl meals)

---

## Workflow Steps

### Phase 1: Recipe Setup (Claude Code)
1. **Create GitHub Issue** for the recipe with full details
2. **Check inventory** for all ingredients across all locations
3. **Create todo list** divided into:
   - Prep tasks (for the prepper)
   - Cooking/assembly tasks (for the cook)
4. **Create calendar event** for the cook with detailed instructions

### Phase 2: Prep Work (Prepper)
Organize prep into **containers by when they're used**:

#### Container Organization Strategy
- **Container 1**: All ingredients that go in together (e.g., raw vegetables)
- **Container 2**: Cooked components (e.g., sautéed mushrooms)
- **Container 3**: Wet ingredients that need draining (e.g., corn)
- **Container 4**: Final toppings/garnishes

#### Prep Tasks Checklist
- [ ] Make any sauces/dressings
- [ ] Prep all vegetables (chop, slice, dice - with exact measurements)
- [ ] Cook any components that can be done ahead
- [ ] Toast nuts/seeds if needed
- [ ] Drain/rinse canned ingredients
- [ ] Prep herbs and garnishes
- [ ] Set up assembly station

#### Assembly Station Setup
**Equipment:**
- Large pot (if boiling/cooking)
- Colander (in sink)
- Large mixing bowl (for assembly)
- Serving bowl/platter
- Tongs or large spoons
- Any measuring tools needed

**Ingredients - Arranged in Order of Use:**
- Raw ingredients to cook (left side)
- Sauces/dressings (center)
- Prepped containers (labeled with step numbers)
- Toppings (right side)

**Optional Helpers:**
- Extra seasonings in small bowls (soy sauce, chili oil, etc.)
- Citrus wedges
- Tools for adjusting (whisk, spoons)

### Phase 3: Calendar Event for the Cook

#### Event Structure
**Timing:**
- Review event: 5-10 minutes BEFORE cooking
- Cooking event: Actual recipe time

**Calendar Description Format:**

```
⚡ QUICK START - READ THIS FIRST ⚡

🎯 WHAT YOU'RE MAKING:
[Brief description of the dish and what to expect]
[Final result description - appearance, temperature, style]

✅ BEFORE YOU START - Everything should be prepped:
□ [List all containers and what's in them]
□ [List equipment that should be set up]
□ [List any ingredients on counter]

🎯 YOUR MISSION: [Simple flow summary]
⏱️ TOTAL TIME: [Estimated time]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 WORKFLOW OVERVIEW

[Visual diagram showing the flow]
Example:
INGREDIENT (you cook)
    ↓
+ SAUCE (on counter)
    ↓
+ CONTAINERS 1-3 (veggies/proteins)
    ↓
+ CONTAINER 4 (toppings)
    ↓
DONE!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 STEP-BY-STEP INSTRUCTIONS

STEP 1: [First action]
→ [Detailed sub-step]
→ [Timing if relevant]
→ [Visual/sensory cues for doneness]

[Continue for all steps...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 COOKING TIPS:
• [Key technique to remember]
• [Common mistake to avoid]
• [Quality check tip]

🆘 IF SOMETHING GOES WRONG:
• [Problem] → [Solution]
• [Problem] → [Solution]
• Need help? Ask! But you've got this!

📖 Full recipe in GitHub Issue #[NUMBER]
```

### Phase 4: Review Session (Optional but Recommended)

**5-10 minutes before cooking:**
- The cook reads through the instructions once
- Looks at all the containers
- Visualizes the process
- Asks any clarifying questions

This prevents reading AND cooking simultaneously.

---

## Improvements Based on Feedback

### Cook's Feedback: "Hard to Get Up to Speed"

**Solutions Implemented:**

1. **Add Overview Section** at top of instructions
   - What the dish is (context)
   - What it should look like when done
   - What your job is (just cook X, just assemble Y)
   - Total time estimate

2. **Create Pre-Cooking Review Event**
   - Separate 5-10 min calendar event BEFORE cooking
   - Just overview, flow, and mental preparation
   - No pressure, just reading

3. **Label Containers with Step Numbers**
   - Container 1: "STEP 4: Add after sauce"
   - Container 2: "STEP 4: Add with veggies"
   - Container 4: "STEP 5: Final toppings"
   - Visual cues reduce mental load

4. **Add Workflow Diagram**
   - Simple visual flow at top
   - Shows ingredient progression
   - Easy to reference while cooking

5. **Use Visual Separators**
   - Clear sections with dividing lines
   - Emoji markers for different section types
   - Easy to scan while cooking

---

## Template Checklist

### For Claude Code Agent:

**When starting a prep-and-assemble recipe:**

- [ ] Create GitHub issue with full recipe details
- [ ] Check all inventory locations for ingredients
- [ ] Create todo list with prep tasks (prepper) and cooking tasks (cook)
- [ ] Organize prep into logical containers (by usage timing)
- [ ] Provide exact measurements and cutting instructions
- [ ] Create pre-cooking review calendar event (5-10 min before)
- [ ] Create main cooking calendar event with:
  - [ ] Overview section (what, why, how long)
  - [ ] Workflow diagram
  - [ ] Before-you-start checklist
  - [ ] Step-by-step instructions with sensory cues
  - [ ] Cooking tips section
  - [ ] Troubleshooting section
  - [ ] Link to GitHub issue
- [ ] Label containers with step numbers
- [ ] Set up assembly station with equipment and ingredients

**During prep guidance:**
- [ ] Mark tasks as in_progress/completed in real-time
- [ ] Provide exact measurements for all ingredients
- [ ] Specify exact cutting techniques (matchsticks, 1/4" slices, etc.)
- [ ] Confirm each phase completion before moving to next

**After cooking:**
- [ ] Collect feedback on what worked/what didn't
- [ ] Update template based on learnings
- [ ] Add recipe to database if successful

---

## Example Recipes Perfect for This Mode

- **Cold noodle salads** (lots of veggie prep, simple assembly)
- **Stir-fries** (all prep done, cook quickly)
- **Buddha bowls** (components prepped, just assemble)
- **Tacos/burrito bowls** (toppings bar approach)
- **Grain salads** (cook grain, toss everything together)

---

## Success Metrics

**For the Prepper:**
- All containers organized and labeled
- Assembly station fully set up
- Cook can start without asking questions

**For the Cook:**
- Feels confident starting
- Can follow steps without stopping to read ahead
- Final dish matches expectations
- Learning happened without stress

**For the Meal:**
- Tastes great
- Looks appealing
- Made on time
- Both people enjoyed the process
