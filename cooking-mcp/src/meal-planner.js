import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export class MealPlanner {
  constructor(recipeManager, inventoryManager, repoPath) {
    this.recipeManager = recipeManager;
    this.inventoryManager = inventoryManager;
    this.repoPath = repoPath;
    this.mealPlanPath = join(repoPath, 'meal-plan.md');
  }

  // Parse a day reference like "tomorrow", "Saturday", "1/4" into a date
  parseDay(dayRef) {
    const today = new Date();
    const lowered = dayRef.toLowerCase().trim();

    // Handle relative days
    if (lowered === 'today' || lowered === 'tonight') {
      return today;
    }
    if (lowered === 'tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow;
    }

    // Handle day names
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayIndex = dayNames.indexOf(lowered);
    if (dayIndex !== -1) {
      const currentDay = today.getDay();
      let daysAhead = dayIndex - currentDay;
      if (daysAhead <= 0) daysAhead += 7; // Next occurrence
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + daysAhead);
      return targetDate;
    }

    // Handle MM/DD format
    const dateMatch = dayRef.match(/(\d{1,2})\/(\d{1,2})/);
    if (dateMatch) {
      const month = parseInt(dateMatch[1]) - 1;
      const day = parseInt(dateMatch[2]);
      const targetDate = new Date(today.getFullYear(), month, day);
      // If the date is in the past, assume next year
      if (targetDate < today) {
        targetDate.setFullYear(today.getFullYear() + 1);
      }
      return targetDate;
    }

    return null;
  }

  // Format date for display (e.g., "Sat 1/4")
  formatDateShort(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${days[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}`;
  }

  // Get the full day name
  getDayName(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  // Read and parse the meal plan file
  async readMealPlan() {
    try {
      const content = await readFile(this.mealPlanPath, 'utf-8');
      return this.parseMealPlan(content);
    } catch (error) {
      return { error: `Could not read meal plan: ${error.message}` };
    }
  }

  // Parse the meal plan markdown into structured data
  parseMealPlan(content) {
    const meals = {};
    const lines = content.split('\n');

    // Find table rows (lines starting with |)
    for (const line of lines) {
      // Match table rows like "| Mon 1/6 | Pasta | Tacos | ✓ | notes |"
      const rowMatch = line.match(/^\|\s*((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d+\/\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/i);
      if (rowMatch) {
        const [, dayStr, lunch, dinner, home, notes] = rowMatch;
        meals[dayStr.trim()] = {
          day: dayStr.trim(),
          lunch: lunch.trim() || null,
          dinner: dinner.trim() || null,
          home: home.trim() || '?',
          notes: notes.trim() || null
        };
      }
    }

    return { meals, raw: content };
  }

  // Get meal plan for a specific day
  async getMealPlan(dayRef) {
    const targetDate = this.parseDay(dayRef);
    if (!targetDate) {
      return { error: `Could not parse day: "${dayRef}"` };
    }

    const planData = await this.readMealPlan();
    if (planData.error) return planData;

    const dateKey = this.formatDateShort(targetDate);
    const dayName = this.getDayName(targetDate);

    // Look for matching day in the plan
    for (const [key, meal] of Object.entries(planData.meals)) {
      if (key.toLowerCase().includes(dateKey.toLowerCase().split(' ')[0]) &&
          key.includes(`${targetDate.getMonth() + 1}/${targetDate.getDate()}`)) {
        return {
          date: dateKey,
          dayName,
          ...meal,
          found: true
        };
      }
    }

    return {
      date: dateKey,
      dayName,
      lunch: null,
      dinner: null,
      home: '?',
      notes: null,
      found: false,
      message: `No meal plan found for ${dayName} (${dateKey})`
    };
  }

  // Set a meal for a specific day
  async setMeal(dayRef, mealType, meal, home = null, notes = null) {
    const targetDate = this.parseDay(dayRef);
    if (!targetDate) {
      return { error: `Could not parse day: "${dayRef}"` };
    }

    const dateKey = this.formatDateShort(targetDate);
    const mealTypeLower = mealType.toLowerCase();

    if (!['lunch', 'dinner'].includes(mealTypeLower)) {
      return { error: `Invalid meal type: "${mealType}". Use "lunch" or "dinner".` };
    }

    try {
      const content = await readFile(this.mealPlanPath, 'utf-8');
      const lines = content.split('\n');
      let updated = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Check if this line matches our target date
        if (line.includes(`| ${dateKey}`) || line.includes(`|${dateKey}`)) {
          const parts = line.split('|').map(p => p.trim());
          // parts: ['', 'Day', 'Lunch', 'Dinner', 'Home?', 'Notes', '']
          if (parts.length >= 6) {
            if (mealTypeLower === 'lunch') {
              parts[2] = meal;
            } else {
              parts[3] = meal;
            }
            if (home !== null) {
              parts[4] = home;
            }
            if (notes !== null) {
              parts[5] = notes;
            }
            lines[i] = '| ' + parts.slice(1, -1).join(' | ') + ' |';
            updated = true;
            break;
          }
        }
      }

      if (!updated) {
        return {
          error: `Could not find ${dateKey} in meal plan. The date may be outside the current week.`,
          suggestion: 'Try updating the meal plan to include this date first.'
        };
      }

      // Update the "Last updated" timestamp
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const updatedContent = lines.join('\n').replace(
        /\*\*Last updated:\*\* .*/,
        `**Last updated:** ${timestamp}`
      );

      await writeFile(this.mealPlanPath, updatedContent, 'utf-8');

      return {
        success: true,
        date: dateKey,
        mealType: mealTypeLower,
        meal,
        message: `Set ${mealTypeLower} for ${dateKey} to "${meal}"`
      };
    } catch (error) {
      return { error: `Failed to update meal plan: ${error.message}` };
    }
  }

  // Clear a meal from a specific day
  async clearMeal(dayRef, mealType) {
    return this.setMeal(dayRef, mealType, '');
  }

  // Get the full week's meal plan
  async getWeekPlan() {
    const planData = await this.readMealPlan();
    if (planData.error) return planData;

    const today = new Date();
    const meals = Object.values(planData.meals);

    return {
      meals,
      summary: {
        totalMeals: meals.length,
        plannedLunches: meals.filter(m => m.lunch).length,
        plannedDinners: meals.filter(m => m.dinner).length,
        cookingAtHome: meals.filter(m => m.home === '✓').length
      }
    };
  }

  async suggestMeals(maxPrepTime, useExpiring = true, category) {
    const suggestions = [];

    // Get available ingredients
    const availableIngredients = await this.inventoryManager.getAllIngredients();

    // Get expiring items if requested
    let expiringIngredients = [];
    if (useExpiring) {
      const expiringItems = await this.inventoryManager.findExpiringItems(7);
      expiringIngredients = expiringItems.map(item => item.name.toLowerCase());
    }

    // Search for recipes
    const allRecipes = await this.recipeManager.searchRecipes(
      null,
      maxPrepTime,
      category
    );

    // Score each recipe based on ingredient availability
    for (const recipe of allRecipes) {
      const recipeDetails = await this.recipeManager.getRecipe(recipe.name);
      const ingredients = this.extractIngredients(recipeDetails);

      const score = this.scoreRecipe(
        ingredients,
        availableIngredients,
        expiringIngredients
      );

      if (score.availableCount > 0) {
        suggestions.push({
          ...recipe,
          matchScore: score.matchScore,
          availableIngredients: score.availableCount,
          totalIngredients: score.totalCount,
          missingIngredients: score.missing,
          usesExpiringItems: score.expiringMatches,
          percentageAvailable: Math.round(
            (score.availableCount / score.totalCount) * 100
          )
        });
      }
    }

    // Sort by match score (higher is better)
    suggestions.sort((a, b) => b.matchScore - a.matchScore);

    // Return top 10 suggestions
    return suggestions.slice(0, 10);
  }

  async checkRecipeIngredients(recipeName) {
    // Get the recipe
    const recipeContent = await this.recipeManager.getRecipe(recipeName);
    if (!recipeContent) {
      return { error: `Recipe "${recipeName}" not found` };
    }

    // Extract ingredients
    const ingredients = this.extractIngredients(recipeContent);

    // Get available inventory
    const inventory = await this.inventoryManager.checkInventory('all');

    // Check each ingredient
    const result = {
      recipe: recipeName,
      available: [],
      missing: [],
      partial: []
    };

    for (const ingredient of ingredients) {
      const found = await this.findIngredientInInventory(
        ingredient.name,
        inventory
      );

      if (found.length > 0) {
        result.available.push({
          ingredient: ingredient.name,
          required: ingredient.full,
          locations: found
        });
      } else {
        // Check for partial matches
        const partialMatch = await this.findPartialMatch(
          ingredient.name,
          inventory
        );

        if (partialMatch.length > 0) {
          result.partial.push({
            ingredient: ingredient.name,
            required: ingredient.full,
            possibleMatches: partialMatch
          });
        } else {
          result.missing.push({
            ingredient: ingredient.name,
            required: ingredient.full
          });
        }
      }
    }

    // Calculate summary
    result.summary = {
      totalIngredients: ingredients.length,
      available: result.available.length,
      missing: result.missing.length,
      partial: result.partial.length,
      canMake: result.missing.length === 0,
      percentageAvailable: Math.round(
        (result.available.length / ingredients.length) * 100
      )
    };

    return result;
  }

  extractIngredients(recipeContent) {
    const ingredients = [];
    const lines = recipeContent.split('\n');

    for (const line of lines) {
      // Match ingredient lines with checkbox format
      const match = line.match(/- \[.\] \*\*(.+?)\*\*(.*)/);
      if (match) {
        const name = match[1].trim();
        const details = match[2].trim();

        // Extract the core ingredient name (remove quantities)
        const coreName = this.extractCoreName(name);

        ingredients.push({
          name: coreName,
          full: name,
          details: details
        });
      }
    }

    return ingredients;
  }

  extractCoreName(ingredientText) {
    // Remove common measurements and quantities
    let core = ingredientText
      .replace(/\d+\s*(cups?|tbsp?|tsp?|oz|lb|g|ml|L)\b/gi, '')
      .replace(/\d+\/\d+/g, '') // fractions
      .replace(/\d+/g, '') // numbers
      .replace(/^\s*\(.*?\)\s*/g, '') // parenthetical notes
      .replace(/,.*$/, '') // everything after comma
      .trim();

    // Extract the main ingredient word(s)
    const words = core.split(/\s+/);

    // Common patterns to extract
    if (words.includes('cheese')) return 'cheese';
    if (words.includes('oil')) return 'oil';
    if (words.includes('butter')) return 'butter';
    if (words.includes('flour')) return 'flour';
    if (words.includes('sugar')) return 'sugar';
    if (words.includes('salt')) return 'salt';
    if (words.includes('pepper')) return 'pepper';

    // Return the last 1-2 significant words
    const significantWords = words.filter(w =>
      w.length > 2 && !['the', 'and', 'for', 'with'].includes(w.toLowerCase())
    );

    return significantWords.slice(-2).join(' ').toLowerCase();
  }

  scoreRecipe(recipeIngredients, availableIngredients, expiringIngredients) {
    let availableCount = 0;
    let expiringMatches = [];
    const missing = [];

    for (const ingredient of recipeIngredients) {
      const found = availableIngredients.some(available =>
        available.includes(ingredient.name.toLowerCase()) ||
        ingredient.name.toLowerCase().includes(available)
      );

      if (found) {
        availableCount++;

        // Check if it's an expiring ingredient
        const isExpiring = expiringIngredients.some(exp =>
          exp.includes(ingredient.name.toLowerCase()) ||
          ingredient.name.toLowerCase().includes(exp)
        );

        if (isExpiring) {
          expiringMatches.push(ingredient.name);
        }
      } else {
        missing.push(ingredient.name);
      }
    }

    // Calculate match score
    // Higher score = better match
    let matchScore = (availableCount / recipeIngredients.length) * 100;

    // Bonus for using expiring items
    matchScore += expiringMatches.length * 10;

    return {
      matchScore,
      availableCount,
      totalCount: recipeIngredients.length,
      missing,
      expiringMatches
    };
  }

  async findIngredientInInventory(ingredientName, inventory) {
    const locations = [];
    const searchTerm = ingredientName.toLowerCase();

    for (const [location, storages] of Object.entries(inventory)) {
      for (const [storage, items] of Object.entries(storages)) {
        for (const item of items) {
          if (
            item.name.toLowerCase().includes(searchTerm) ||
            searchTerm.includes(item.name.toLowerCase())
          ) {
            locations.push({
              location,
              storage,
              item: item.name,
              quantity: item.quantity,
              expiration: item.expiration
            });
          }
        }
      }
    }

    return locations;
  }

  async findPartialMatch(ingredientName, inventory) {
    const matches = [];
    const words = ingredientName.toLowerCase().split(/\s+/);

    for (const [location, storages] of Object.entries(inventory)) {
      for (const [storage, items] of Object.entries(storages)) {
        for (const item of items) {
          const itemLower = item.name.toLowerCase();

          // Check if any word matches
          const hasMatch = words.some(word =>
            word.length > 3 && itemLower.includes(word)
          );

          if (hasMatch) {
            matches.push({
              location,
              storage,
              item: item.name,
              quantity: item.quantity
            });
          }
        }
      }
    }

    return matches;
  }

  // Leftovers workflow: suggest what to do with leftover ingredients
  async suggestLeftoverUses(sourceRecipe, leftoverItems) {
    const result = {
      sourceRecipe: sourceRecipe || null,
      leftovers: [],
      freezable: [],
      useAtServing: [],
      transformations: [],
      assemblyGuide: null
    };

    // Freezability categories
    const freezesWell = [
      'rice', 'quinoa', 'farro', 'grain', 'cooked grain',
      'beans', 'black beans', 'pinto beans', 'refried beans',
      'soyrizo', 'chorizo', 'ground beef', 'ground turkey', 'chicken', 'tofu', 'tempeh',
      'roasted vegetables', 'roasted veggies', 'grilled vegetables',
      'salsa', 'mole', 'enchilada sauce', 'tomato sauce',
      'soup', 'stew', 'broth', 'stock',
      'pasta sauce', 'marinara', 'bolognese'
    ];

    const dontFreeze = [
      'crema', 'sour cream', 'labneh', 'yogurt', 'cream sauce',
      'guacamole', 'avocado', 'fresh avocado',
      'fresh salsa', 'pico de gallo', 'fresh pico',
      'cilantro', 'fresh herbs', 'basil', 'parsley',
      'lime', 'lemon', 'citrus',
      'lettuce', 'fresh greens', 'arugula', 'spinach',
      'chips', 'tortilla chips', 'crispy toppings', 'fried onions',
      'hot sauce', 'sriracha'
    ];

    // Transformation templates based on cuisine type
    const transformations = {
      mexican: {
        keywords: ['rice', 'beans', 'soyrizo', 'chorizo', 'salsa', 'tortilla', 'taco', 'burrito', 'mexican'],
        suggestions: [
          {
            name: 'Freezer Burritos',
            description: 'Wrap rice, beans, protein, and veggies in tortillas. Freeze individually.',
            freezable: true,
            effort: 'low'
          },
          {
            name: 'Quesadillas',
            description: 'Use cheese + any protein/beans. Quick lunch or snack.',
            freezable: false,
            effort: 'low'
          },
          {
            name: 'Burrito Bowl Remix',
            description: 'Same components, fresh toppings, different sauce.',
            freezable: false,
            effort: 'low'
          },
          {
            name: 'Taco Salad',
            description: 'Serve over greens with fresh toppings.',
            freezable: false,
            effort: 'low'
          }
        ]
      },
      asian: {
        keywords: ['rice', 'noodle', 'stir-fry', 'tofu', 'soy sauce', 'ginger', 'sesame', 'asian', 'thai', 'chinese'],
        suggestions: [
          {
            name: 'Fried Rice',
            description: 'Leftover rice + veggies + protein + egg. Quick weeknight meal.',
            freezable: true,
            effort: 'low'
          },
          {
            name: 'Spring Rolls',
            description: 'Wrap in rice paper with fresh herbs. Great for using up veggies.',
            freezable: false,
            effort: 'medium'
          },
          {
            name: 'Lettuce Wraps',
            description: 'Serve warm fillings in crisp lettuce cups.',
            freezable: false,
            effort: 'low'
          }
        ]
      },
      roasted_veg: {
        keywords: ['roasted', 'vegetables', 'veggies', 'root vegetables', 'squash', 'broccoli', 'cauliflower'],
        suggestions: [
          {
            name: 'Blended Soup',
            description: 'Add broth, blend smooth. Quick nutritious soup.',
            freezable: true,
            effort: 'low'
          },
          {
            name: 'Grain Bowl',
            description: 'Top cooked grains with veggies + different sauce/dressing.',
            freezable: false,
            effort: 'low'
          },
          {
            name: 'Frittata / Egg Bake',
            description: 'Mix with beaten eggs, bake until set.',
            freezable: true,
            effort: 'low'
          },
          {
            name: 'Pasta Toss',
            description: 'Toss with pasta + olive oil + parmesan.',
            freezable: false,
            effort: 'low'
          }
        ]
      },
      soup_stew: {
        keywords: ['soup', 'stew', 'broth', 'chili', 'curry'],
        suggestions: [
          {
            name: 'Freeze in Portions',
            description: 'Freeze in 2-cup portions for easy future meals.',
            freezable: true,
            effort: 'low'
          },
          {
            name: 'Lunch Portions',
            description: 'Portion into containers for grab-and-go lunches.',
            freezable: false,
            effort: 'low'
          }
        ]
      },
      grains: {
        keywords: ['rice', 'quinoa', 'farro', 'couscous', 'barley', 'grain'],
        suggestions: [
          {
            name: 'Grain Salad',
            description: 'Add fresh veggies, herbs, and vinaigrette.',
            freezable: false,
            effort: 'low'
          },
          {
            name: 'Stuffed Peppers',
            description: 'Mix with protein, stuff peppers, bake.',
            freezable: true,
            effort: 'medium'
          },
          {
            name: 'Freeze for Later',
            description: 'Portion and freeze. Reheat for quick meals.',
            freezable: true,
            effort: 'low'
          }
        ]
      }
    };

    // Process leftover items
    const items = leftoverItems.map(item => item.toLowerCase().trim());
    result.leftovers = leftoverItems;

    // Categorize each item
    for (const item of items) {
      const freezes = freezesWell.some(f => item.includes(f) || f.includes(item));
      const noFreeze = dontFreeze.some(f => item.includes(f) || f.includes(item));

      if (noFreeze) {
        result.useAtServing.push(item);
      } else if (freezes) {
        result.freezable.push(item);
      } else {
        // Default: if it's a condiment/sauce, likely don't freeze; otherwise, might freeze
        if (item.includes('sauce') || item.includes('dressing')) {
          result.useAtServing.push(item);
        } else {
          result.freezable.push(item);
        }
      }
    }

    // Find matching transformations
    const allItemsText = items.join(' ');
    for (const [cuisine, data] of Object.entries(transformations)) {
      const matchScore = data.keywords.filter(kw => allItemsText.includes(kw)).length;
      if (matchScore > 0) {
        result.transformations.push({
          cuisine,
          matchScore,
          suggestions: data.suggestions
        });
      }
    }

    // Sort by match score
    result.transformations.sort((a, b) => b.matchScore - a.matchScore);

    // If we detected Mexican ingredients with tortillas, provide burrito assembly guide
    const hasTortillas = items.some(i => i.includes('tortilla'));
    const hasMexicanBase = items.some(i =>
      i.includes('rice') || i.includes('beans') || i.includes('soyrizo') || i.includes('chorizo')
    );

    if (hasTortillas && hasMexicanBase) {
      result.assemblyGuide = {
        type: 'freezer_burritos',
        name: 'Freezer Burrito Assembly',
        inBurrito: result.freezable.filter(i =>
          !i.includes('tortilla') && !i.includes('salsa seca')
        ),
        atServing: result.useAtServing,
        steps: [
          'Warm tortillas slightly for easier folding',
          'Add ~1/3 cup grain (rice/quinoa) in center',
          'Add ~1/4 cup each: beans, protein, veggies',
          'Don\'t overfill - needs room to fold',
          'Fold sides in, roll tight from bottom',
          'Wrap in foil, label with contents + date',
          'Freeze flat, then stack once frozen'
        ],
        storage: {
          freezer: '2-3 months',
          reheat: 'Microwave 2-3 min from frozen, or oven 375°F for 20-25 min'
        }
      };
    }

    // Add summary
    result.summary = {
      totalItems: leftoverItems.length,
      canFreeze: result.freezable.length,
      addAtServing: result.useAtServing.length,
      suggestedTransformations: result.transformations.length > 0
        ? result.transformations[0].suggestions.slice(0, 3).map(s => s.name)
        : ['Freeze in portions', 'Use within 3-5 days']
    };

    return result;
  }
}