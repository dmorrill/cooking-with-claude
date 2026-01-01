import fs from 'fs/promises';
import path from 'path';

export class InventoryManager {
  constructor(cookingRepoPath) {
    this.inventoryPath = path.join(cookingRepoPath, 'inventory');
    this.locations = {
      upstairs: ['pantry', 'refrigerator', 'freezer', 'snack-shelf', 'fruit-bowls'],
      downstairs: ['pantry', 'refrigerator', 'freezer', 'chest-freezer', 'kitchen-drawers'],
      basement: ['food-storage']
    };
  }

  async checkInventory(location = 'all', ingredient = null) {
    const inventory = {};

    // Determine which locations to check
    const locationsToCheck = location === 'all'
      ? Object.keys(this.locations)
      : [location];

    for (const loc of locationsToCheck) {
      if (!this.locations[loc]) continue;

      inventory[loc] = {};

      for (const storage of this.locations[loc]) {
        const filePath = path.join(this.inventoryPath, loc, `${storage}.md`);

        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const items = this.parseInventoryFile(content);

          // Filter by ingredient if specified
          if (ingredient) {
            const filtered = items.filter(item =>
              item.name.toLowerCase().includes(ingredient.toLowerCase())
            );
            if (filtered.length > 0) {
              inventory[loc][storage] = filtered;
            }
          } else {
            inventory[loc][storage] = items;
          }
        } catch (error) {
          // File might not exist
          continue;
        }
      }

      // Remove empty locations
      if (Object.keys(inventory[loc]).length === 0) {
        delete inventory[loc];
      }
    }

    return inventory;
  }

  async findExpiringItems(days = 7) {
    const expiring = [];
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);

    const allInventory = await this.checkInventory('all');

    for (const [location, storages] of Object.entries(allInventory)) {
      for (const [storage, items] of Object.entries(storages)) {
        for (const item of items) {
          if (item.expiration) {
            const expirationDate = this.parseDate(item.expiration);
            if (expirationDate && expirationDate <= targetDate) {
              expiring.push({
                ...item,
                location,
                storage,
                daysUntilExpiration: Math.ceil(
                  (expirationDate - new Date()) / (1000 * 60 * 60 * 24)
                )
              });
            }
          }
        }
      }
    }

    // Sort by expiration date
    expiring.sort((a, b) => a.daysUntilExpiration - b.daysUntilExpiration);

    return expiring;
  }

  parseInventoryFile(content) {
    const items = [];
    const lines = content.split('\n');

    // Look for table rows (items are in markdown tables)
    let inTable = false;
    let headers = [];

    for (const line of lines) {
      // Detect table header
      if (line.includes('| Item') && line.includes('|')) {
        inTable = true;
        headers = line.split('|').map(h => h.trim()).filter(h => h);
        continue;
      }

      // Skip separator line
      if (inTable && line.includes('|---')) {
        continue;
      }

      // Parse table rows
      if (inTable && line.includes('|')) {
        const cells = line.split('|').map(c => c.trim()).filter(c => c);

        if (cells.length >= 2) {
          const item = {
            name: cells[0],
            quantity: cells[1]
          };

          // Add expiration if present
          if (cells.length > 2) {
            item.expiration = cells[2];
          }

          // Add notes if present
          if (cells.length > 3) {
            item.notes = cells[3];
          }

          items.push(item);
        }
      }

      // End of table
      if (inTable && line.trim() === '') {
        inTable = false;
      }
    }

    return items;
  }

  parseDate(dateStr) {
    if (!dateStr) return null;

    // Handle various date formats
    // MM/DD format (assume current year)
    if (/^\d{1,2}\/\d{1,2}$/.test(dateStr)) {
      const [month, day] = dateStr.split('/');
      const year = new Date().getFullYear();
      return new Date(year, parseInt(month) - 1, parseInt(day));
    }

    // MM/DD/YY or MM/DD/YYYY format
    if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(dateStr)) {
      const [month, day, year] = dateStr.split('/');
      const fullYear = year.length === 2 ? 2000 + parseInt(year) : parseInt(year);
      return new Date(fullYear, parseInt(month) - 1, parseInt(day));
    }

    // Try standard date parsing
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  async getAllIngredients() {
    const inventory = await this.checkInventory('all');
    const ingredients = new Set();

    for (const [location, storages] of Object.entries(inventory)) {
      for (const [storage, items] of Object.entries(storages)) {
        for (const item of items) {
          ingredients.add(item.name.toLowerCase());
        }
      }
    }

    return Array.from(ingredients);
  }

  async updateInventoryItem(location, storage, itemName, updates) {
    // Validate location and storage
    if (!this.locations[location] || !this.locations[location].includes(storage)) {
      throw new Error(`Invalid location/storage: ${location}/${storage}`);
    }

    const filePath = path.join(this.inventoryPath, location, `${storage}.md`);

    try {
      // Read the current file
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');

      let inTable = false;
      let itemFound = false;
      let updatedLines = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detect table header
        if (line.includes('| Item') && line.includes('|')) {
          inTable = true;
          updatedLines.push(line);
          continue;
        }

        // Process table rows
        if (inTable && line.includes('|') && !line.includes('|---')) {
          const cells = line.split('|').map(c => c.trim());

          // Check if this is the item to update
          if (cells[1] && cells[1].toLowerCase() === itemName.toLowerCase()) {
            itemFound = true;

            // Update the row with new values
            const updatedCells = [
              '',
              updates.name || cells[1],
              updates.quantity !== undefined ? updates.quantity : cells[2],
              updates.expiration !== undefined ? updates.expiration : (cells[3] || ''),
              updates.notes !== undefined ? updates.notes : (cells[4] || ''),
              ''
            ];

            updatedLines.push(updatedCells.join(' | '));
          } else {
            updatedLines.push(line);
          }
        } else {
          updatedLines.push(line);

          // End of table
          if (inTable && line.trim() === '') {
            inTable = false;
          }
        }
      }

      if (!itemFound) {
        throw new Error(`Item "${itemName}" not found in ${location}/${storage}`);
      }

      // Update the "Last Updated" field
      const updatedContent = this.updateLastModified(updatedLines.join('\n'));

      // Write back to file
      await fs.writeFile(filePath, updatedContent, 'utf-8');

      return {
        success: true,
        message: `Updated "${itemName}" in ${location}/${storage}`,
        updates
      };
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  }

  async addInventoryItem(location, storage, item) {
    // Validate location and storage
    if (!this.locations[location] || !this.locations[location].includes(storage)) {
      throw new Error(`Invalid location/storage: ${location}/${storage}`);
    }

    const filePath = path.join(this.inventoryPath, location, `${storage}.md`);

    try {
      // Read the current file
      let content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');

      let inTable = false;
      let tableEndIndex = -1;
      let categoryFound = false;
      let updatedLines = [];

      // Find the right category/table to add to
      const category = item.category || 'Other';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        updatedLines.push(line);

        // Check for category header
        if (line.startsWith('##') && line.toLowerCase().includes(category.toLowerCase())) {
          categoryFound = true;
        }

        // Detect table in the right category
        if (categoryFound && line.includes('| Item') && line.includes('|')) {
          inTable = true;
        }

        // Find end of table
        if (inTable && line.trim() === '') {
          tableEndIndex = i;
          inTable = false;

          // Insert the new item before the empty line
          const newRow = `| ${item.name} | ${item.quantity || ''} | ${item.expiration || ''} | ${item.notes || ''} |`;
          updatedLines.splice(updatedLines.length - 1, 0, newRow);
          break;
        }
      }

      if (tableEndIndex === -1) {
        // If no suitable table found, create a new section
        updatedLines.push('');
        updatedLines.push(`## ${category}`);
        updatedLines.push('');
        updatedLines.push('| Item | Quantity | Expiration | Notes |');
        updatedLines.push('|------|----------|------------|-------|');
        updatedLines.push(`| ${item.name} | ${item.quantity || ''} | ${item.expiration || ''} | ${item.notes || ''} |`);
        updatedLines.push('');
      }

      // Update the "Last Updated" field
      const updatedContent = this.updateLastModified(updatedLines.join('\n'));

      // Write back to file
      await fs.writeFile(filePath, updatedContent, 'utf-8');

      return {
        success: true,
        message: `Added "${item.name}" to ${location}/${storage}`,
        item
      };
    } catch (error) {
      throw new Error(`Failed to add item: ${error.message}`);
    }
  }

  async removeInventoryItem(location, storage, itemName) {
    // Validate location and storage
    if (!this.locations[location] || !this.locations[location].includes(storage)) {
      throw new Error(`Invalid location/storage: ${location}/${storage}`);
    }

    const filePath = path.join(this.inventoryPath, location, `${storage}.md`);

    try {
      // Read the current file
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');

      let inTable = false;
      let itemFound = false;
      let updatedLines = [];

      for (const line of lines) {
        // Detect table header
        if (line.includes('| Item') && line.includes('|')) {
          inTable = true;
          updatedLines.push(line);
          continue;
        }

        // Process table rows
        if (inTable && line.includes('|') && !line.includes('|---')) {
          const cells = line.split('|').map(c => c.trim());

          // Check if this is the item to remove
          if (cells[1] && cells[1].toLowerCase() === itemName.toLowerCase()) {
            itemFound = true;
            // Skip this line (effectively removing it)
            continue;
          }
        }

        updatedLines.push(line);

        // End of table
        if (inTable && line.trim() === '') {
          inTable = false;
        }
      }

      if (!itemFound) {
        throw new Error(`Item "${itemName}" not found in ${location}/${storage}`);
      }

      // Update the "Last Updated" field
      const updatedContent = this.updateLastModified(updatedLines.join('\n'));

      // Write back to file
      await fs.writeFile(filePath, updatedContent, 'utf-8');

      return {
        success: true,
        message: `Removed "${itemName}" from ${location}/${storage}`
      };
    } catch (error) {
      throw new Error(`Failed to remove item: ${error.message}`);
    }
  }

  updateLastModified(content) {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    // Check if there's a "Last Updated" line and update it
    if (content.includes('Last Updated:')) {
      return content.replace(/Last Updated:.*$/m, `Last Updated: ${today}`);
    } else {
      // Add it after the first heading if not present
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#')) {
          lines.splice(i + 1, 0, '', `Last Updated: ${today}`);
          break;
        }
      }
      return lines.join('\n');
    }
  }
}