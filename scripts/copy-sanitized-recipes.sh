#!/bin/bash

# Script to copy and sanitize recipes from personal to public repo

PERSONAL_REPO="../cooking"
PUBLIC_REPO="."

echo "=== Copying and sanitizing recipes from personal to public repo ==="

# Map personal folder names to public folder names
declare -A FOLDER_MAP=(
    ["appetizers"]="appetizers"
    ["breads-rolls"]="breads"
    ["cocktails"]="cocktails"
    ["desserts"]="desserts"
    ["mains"]="mains"
    ["sauces-condiments"]="condiments"
    ["sides"]="sides"
    ["soups"]="soups"
)

# Create new folders if needed
mkdir -p recipes/appetizers

# Function to sanitize recipe content
sanitize_recipe() {
    local file="$1"
    # Remove personal email addresses
    sed -i '' 's/morrillkevin@gmail\.com/[partner email]/g' "$file"
    sed -i '' 's/ellemorrill@gmail\.com/[your email]/g' "$file"

    # Remove specific names (keep generic terms)
    sed -i '' "s/Kevin's/Partner's/g" "$file"
    sed -i '' "s/Kevin/partner/g" "$file"
    sed -i '' "s/Elle's/My/g" "$file"
    sed -i '' "s/Elle /I /g" "$file"

    # Remove Denver-specific references but keep altitude notes
    sed -i '' 's/Denver (5,280 ft)/high altitude (5,000+ ft)/g' "$file"
    sed -i '' 's/in Denver/at high altitude/g' "$file"

    # Remove specific store names
    sed -i '' 's/Whole Foods/[local grocery]/g' "$file"
    sed -i '' 's/King Soopers/[local grocery]/g' "$file"
    sed -i '' 's/Trader Joe.s/[specialty grocery]/g' "$file"

    echo "Sanitized: $file"
}

# Copy make-ahead-components.md to recipes folder
if [ -f "$PERSONAL_REPO/recipes/make-ahead-components.md" ]; then
    cp "$PERSONAL_REPO/recipes/make-ahead-components.md" "recipes/make-ahead-components.md"
    sanitize_recipe "recipes/make-ahead-components.md"
    echo "✓ Copied make-ahead-components.md"
fi

# Copy restaurant-staples.md to recipes folder
if [ -f "$PERSONAL_REPO/recipes/restaurant-staples.md" ]; then
    cp "$PERSONAL_REPO/recipes/restaurant-staples.md" "recipes/restaurant-staples.md"
    sanitize_recipe "recipes/restaurant-staples.md"
    echo "✓ Copied restaurant-staples.md"
fi

# List of specific recipes to copy (from git log output)
RECIPES_TO_COPY=(
    "appetizers/beet-goat-cheese-phyllo-tartlets.md"
    "breads-rolls/elles-quick-altitude-pizza-dough.md"
    "breads-rolls/yorkshire-puddings-small-batch.md"
    "breads-rolls/rosemary-labneh-pull-apart-rolls-small-batch-4-rolls.md"
    "desserts/molasses-ginger-cookies.md"
    "desserts/maple-pecan-sticky-buns.md"
    "desserts/dads-christmas-fudge.md"
    "mains/mushroom-enhanced-soyrizo.md"
    "mains/creamy-bucatini-with-mushrooms-and-two-cheeses.md"
    "mains/spicy-mushroom-lasagna-make-ahead.md"
    "sides/restaurant-style-mexican-rice.md"
    "sides/spiced-black-beans-with-roasted-delicata-sungold-tomato-puree.md"
    "soups/vegan-tomatobean-stew.md"
    "sauces-condiments/mushroom-duxelles.md"
    "sauces-condiments/au-jus-for-roast-beef-sandwiches.md"
    "sauces-condiments/goat-cheese-beet-dip.md"
)

# Copy and sanitize each recipe
for recipe_path in "${RECIPES_TO_COPY[@]}"; do
    # Get folder and filename
    folder=$(dirname "$recipe_path")
    filename=$(basename "$recipe_path")

    # Map folder name if needed
    if [[ -n "${FOLDER_MAP[$folder]}" ]]; then
        public_folder="${FOLDER_MAP[$folder]}"
    else
        public_folder="$folder"
    fi

    # Source and destination paths
    src="$PERSONAL_REPO/recipes/$recipe_path"
    dest="recipes/$public_folder/$filename"

    # Create folder if needed
    mkdir -p "recipes/$public_folder"

    # Copy if source exists
    if [ -f "$src" ]; then
        cp "$src" "$dest"
        sanitize_recipe "$dest"
        echo "✓ Copied: $recipe_path -> $public_folder/$filename"
    else
        echo "✗ Not found: $src"
    fi
done

echo ""
echo "=== Summary ==="
echo "Recipes copied and sanitized. Please review for any remaining PII."
echo "Remember to:"
echo "1. Update recipes/README.md with new recipe links"
echo "2. Test that all recipes are properly formatted"
echo "3. Verify no personal information remains"