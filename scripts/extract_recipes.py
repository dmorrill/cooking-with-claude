#!/usr/bin/env python3
"""
Script to extract individual recipes from recipe-database.md
and save them as separate markdown files with human-friendly names.
Adapted for the public cooking-with-claude repository.
"""

import re
import os
from pathlib import Path

def sanitize_filename(name):
    """Convert recipe name to a valid filename."""
    # Remove special characters and replace spaces with hyphens
    name = re.sub(r'[^\w\s-]', '', name)
    name = re.sub(r'[-\s]+', '-', name)
    return name.lower().strip('-')

def categorize_recipe(name, content):
    """Determine which category folder a recipe belongs in."""
    name_lower = name.lower()
    content_lower = content.lower()

    # Check cocktails first (most specific)
    if 'cocktail' in name_lower or 'martini' in name_lower or 'royale' in name_lower:
        return 'cocktails'

    # Desserts and baking
    elif any(word in name_lower for word in ['brownie', 'cookie', 'cheesecake', 'fudge', 'bun', 'sticky']):
        return 'desserts'

    # Breads (using public repo naming)
    elif any(word in name_lower for word in ['roll', 'bun', 'dough', 'blini', 'pudding', 'bread']) and 'sticky' not in name_lower:
        return 'breads'

    # Soups
    elif 'soup' in name_lower or 'stew' in name_lower:
        return 'soups'

    # Condiments (using public repo naming)
    elif any(word in name_lower for word in ['sauce', 'mayo', 'paste', 'cream', 'duxelles', 'jus', 'dip', 'horseradish']):
        return 'condiments'

    # Appetizers (new category to add)
    elif any(word in name_lower for word in ['tartlet', 'blini', 'appetizer']):
        return 'appetizers'

    # Salads
    elif 'salad' in name_lower:
        return 'salads'

    # Sides
    elif any(word in name_lower for word in ['rice', 'butternut squash', 'beans']) and not any(word in name_lower for word in ['pasta', 'linguine', 'sandwich', 'lasagna']):
        return 'sides'

    # Mains (default for most substantial dishes)
    else:
        return 'mains'

def extract_recipes(input_file, output_dir):
    """Extract individual recipes from the database file."""

    # Read the entire file
    with open(input_file, 'r') as f:
        content = f.read()

    # Split content by recipe headers
    # Pattern matches "## Recipe: " followed by the recipe name
    recipe_pattern = r'^## Recipe: (.+?)$'

    # Find all recipe positions
    recipe_matches = list(re.finditer(recipe_pattern, content, re.MULTILINE))

    extracted_recipes = []

    for i, match in enumerate(recipe_matches):
        recipe_name = match.group(1).strip()

        # Skip template recipe
        if recipe_name == '[NAME]':
            continue

        # Get recipe content (from this match to the next, or end of file)
        start_pos = match.start()
        if i < len(recipe_matches) - 1:
            end_pos = recipe_matches[i + 1].start()
        else:
            end_pos = len(content)

        recipe_content = content[start_pos:end_pos].strip()

        # Remove the "## Recipe: " prefix and make it a proper title
        recipe_content = re.sub(r'^## Recipe: (.+?)$', r'# \1', recipe_content, 1, re.MULTILINE)

        # Determine category
        category = categorize_recipe(recipe_name, recipe_content)

        # Create filename
        filename = sanitize_filename(recipe_name) + '.md'

        # Create full path
        filepath = os.path.join(output_dir, category, filename)

        # Save the recipe
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w') as f:
            f.write(recipe_content)

        extracted_recipes.append({
            'name': recipe_name,
            'category': category,
            'filename': filename,
            'path': filepath
        })

        print(f"Extracted: {recipe_name} -> {category}/{filename}")

    return extracted_recipes

def main():
    """Main execution."""
    base_dir = os.getcwd()

    # Look for recipe-database.md file
    possible_locations = [
        os.path.join(base_dir, 'recipes', 'recipe-database.md'),
        os.path.join(base_dir, 'recipe-database.md'),
    ]

    input_file = None
    for location in possible_locations:
        if os.path.exists(location):
            input_file = location
            break

    if not input_file:
        print("No recipe-database.md file found. Looking for recipes to reorganize...")
        print("This script extracts recipes from a monolithic database file.")
        print("Your recipes appear to already be organized as individual files.")
        return

    output_dir = os.path.join(base_dir, 'recipes')

    print(f"Starting recipe extraction from {input_file}...")
    recipes = extract_recipes(input_file, output_dir)
    print(f"\nSuccessfully extracted {len(recipes)} recipes!")

    # Print summary by category
    from collections import defaultdict
    by_category = defaultdict(list)
    for recipe in recipes:
        by_category[recipe['category']].append(recipe['name'])

    print("\nRecipes by category:")
    for category in sorted(by_category.keys()):
        print(f"\n{category.replace('-', ' ').title()} ({len(by_category[category])} recipes):")
        for name in sorted(by_category[category]):
            print(f"  - {name}")

if __name__ == "__main__":
    main()