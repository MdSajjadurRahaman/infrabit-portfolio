#!/bin/bash

# This script helps sanitize the repository before open-sourcing
# It checks for common sensitive information patterns and files

echo "Beginning repository sanitization check..."

# Directory to check
REPO_DIR="$(pwd)"

# Check for .env files that might contain secrets
echo "Checking for .env files..."
ENV_FILES=$(find "$REPO_DIR" -name "*.env" -not -name "*.env.example" -not -name "*.env.sample")
if [ -n "$ENV_FILES" ]; then
  echo "WARNING: Found .env files that might contain secrets:"
  echo "$ENV_FILES"
  echo "Please remove or add them to .gitignore before open-sourcing."
fi

# Check for potential credentials in files
echo "Checking for potential credentials in files..."
grep -r -l -i --include="*.{js,json,ts,tsx,md,html,css}" "api[_-]key\|password\|secret\|token\|credential" "$REPO_DIR" | grep -v "node_modules" | grep -v ".gitignore" | grep -v "package-lock.json" | grep -v "SECURITY_CONFIGURATION.md" | grep -v "sanitize-repo.sh"

# Check for specific sensitive patterns
echo "Checking for specific sensitive patterns..."
# JWT tokens (look for realistic JWT tokens, not placeholders)
grep -r -l -i "eyJ[a-zA-Z0-9_-]\{10,\}" "$REPO_DIR" | grep -v "node_modules"
# AWS Keys
grep -r -l "AKIA[0-9A-Z]{16}" "$REPO_DIR" | grep -v "node_modules"
# Check for realistic passwords
grep -r -l -i "password.*=.*[a-zA-Z0-9!@#$%^&*()_+]{8,}" "$REPO_DIR" | grep -v "demo123" | grep -v "your_secure_password" | grep -v "node_modules" | grep -v "SECURITY_CONFIGURATION.md" | grep -v "sanitize-repo.sh"

# Check for .git folder in subdirectories (nested git repositories)
echo "Checking for nested .git directories..."
find "$REPO_DIR" -name ".git" -type d | grep -v "^$REPO_DIR/.git$"

# Check for large files (>5MB) that might have been accidentally committed
echo "Checking for large files (>5MB)..."
find "$REPO_DIR" -type f -size +5M | grep -v "node_modules" | grep -v ".git"

echo "Sanitization check complete!"
echo "Please review any warnings above before open-sourcing your repository."
