#!/bin/bash

# Find and remove all node_modules folders in the monorepo
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Optional: Remove package-lock.json or pnpm-lock.yaml files
# Uncomment the line below if needed
# find . -name "package-lock.json" -o -name "pnpm-lock.yaml" -type f -delete

echo "All node_modules folders have been removed."