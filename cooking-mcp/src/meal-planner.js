export class MealPlanner {
  constructor(recipeManager, inventoryManager) {
    this.recipeManager = recipeManager;
    this.inventoryManager = inventoryManager;
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
}