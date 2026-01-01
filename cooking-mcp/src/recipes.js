import fs from 'fs/promises';
import path from 'path';

export class RecipeManager {
  constructor(cookingRepoPath) {
    this.recipesPath = path.join(cookingRepoPath, 'recipes');
    this.categories = [
      'appetizers',
      'mains',
      'sides',
      'soups',
      'sauces-condiments',
      'desserts',
      'breads-rolls',
      'cocktails'
    ];
  }

  async searchRecipes(query, maxPrepTime, category) {
    const results = [];

    // Determine which categories to search
    const categoriesToSearch = category ? [category] : this.categories;

    for (const cat of categoriesToSearch) {
      const categoryPath = path.join(this.recipesPath, cat);

      try {
        const files = await fs.readdir(categoryPath);

        for (const file of files) {
          if (!file.endsWith('.md')) continue;

          const filePath = path.join(categoryPath, file);
          const content = await fs.readFile(filePath, 'utf-8');

          // Parse recipe metadata
          const recipe = this.parseRecipe(content, file, cat);

          // Filter by search query
          if (query) {
            const searchLower = query.toLowerCase();
            const nameMatch = recipe.name.toLowerCase().includes(searchLower);
            const ingredientMatch = recipe.ingredients.some(i =>
              i.toLowerCase().includes(searchLower)
            );

            if (!nameMatch && !ingredientMatch) continue;
          }

          // Filter by prep time
          if (maxPrepTime && recipe.prepTime > maxPrepTime) continue;

          results.push({
            name: recipe.name,
            category: cat,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            totalTime: recipe.totalTime,
            difficulty: recipe.difficulty,
            description: recipe.description,
            fileName: file
          });
        }
      } catch (error) {
        // Category directory might not exist
        continue;
      }
    }

    // Sort by total time
    results.sort((a, b) => (a.totalTime || 999) - (b.totalTime || 999));

    return results;
  }

  async getRecipe(recipeName) {
    // Search for the recipe file
    const searchResults = await this.searchRecipes(recipeName);

    if (searchResults.length === 0) {
      return null;
    }

    // Find the best match
    const exactMatch = searchResults.find(r =>
      r.name.toLowerCase() === recipeName.toLowerCase()
    );
    const recipe = exactMatch || searchResults[0];

    // Read the full recipe content
    const filePath = path.join(this.recipesPath, recipe.category, recipe.fileName);
    const content = await fs.readFile(filePath, 'utf-8');

    return content;
  }

  parseRecipe(content, fileName, category) {
    const lines = content.split('\n');
    const recipe = {
      name: '',
      ingredients: [],
      prepTime: null,
      cookTime: null,
      totalTime: null,
      difficulty: '',
      description: ''
    };

    // Extract recipe name from first heading
    const titleMatch = content.match(/^# (.+)$/m);
    if (titleMatch) {
      recipe.name = titleMatch[1];
    } else {
      // Fallback to filename
      recipe.name = fileName.replace('.md', '').replace(/-/g, ' ');
    }

    // Extract times
    const prepTimeMatch = content.match(/\*\*Prep Time\*\*:?\s*(\d+)/i);
    if (prepTimeMatch) {
      recipe.prepTime = parseInt(prepTimeMatch[1]);
    }

    const cookTimeMatch = content.match(/\*\*Cook Time\*\*:?\s*(\d+)/i);
    if (cookTimeMatch) {
      recipe.cookTime = parseInt(cookTimeMatch[1]);
    }

    const totalTimeMatch = content.match(/\*\*Total Time\*\*:?\s*(\d+)/i);
    if (totalTimeMatch) {
      recipe.totalTime = parseInt(totalTimeMatch[1]);
    }

    // Extract difficulty
    const difficultyMatch = content.match(/\*\*Difficulty\*\*:?\s*(.+)/i);
    if (difficultyMatch) {
      recipe.difficulty = difficultyMatch[1].trim();
    }

    // Extract ingredients
    const ingredientSection = content.match(/### Ingredients\s*([\s\S]*?)(?=###|$)/i);
    if (ingredientSection) {
      const ingredientLines = ingredientSection[1].match(/- \[.\] \*\*(.+?)\*\*/g);
      if (ingredientLines) {
        recipe.ingredients = ingredientLines.map(line =>
          line.replace(/- \[.\] \*\*(.+?)\*\*.*/, '$1')
        );
      }
    }

    // Extract description from the overview line
    const overviewMatch = content.match(/^- .+?: \*(.+)\*/m);
    if (overviewMatch) {
      recipe.description = overviewMatch[1];
    }

    return recipe;
  }
}