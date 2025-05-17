# Open Source Release Instructions

This document outlines the steps to properly release this project as an open source repository.

## Preparation Steps

1. Review the codebase for any sensitive information:
   - Run the sanitization script to help identify potential issues:
     ```bash
     ./sanitize-repo.sh
     ```
   - Ensure no API keys, passwords, or secrets are committed
   - Check that all .env files are in .gitignore
   - Verify that .env.example files don't contain actual credentials
   - Make sure JWT_SECRET, ADMIN_PASSWORD, and EMAIL_PASSWORD are placeholder values
   - Review commit history for any accidental sensitive data commits

2. Ensure all required documentation is in place:
   - README.md with clear installation and usage instructions
   - CONTRIBUTING.md with guidelines for contributors
   - CODE_OF_CONDUCT.md to establish community standards
   - LICENSE file (MIT License)
   - SECURITY.md with vulnerability reporting procedures

3. Check that proper .gitignore files are configured

## GitHub Repository Setup

1. Create a new public repository on GitHub:
   - Go to https://github.com/new
   - Name the repository "infrabit-portfolio" (or your preferred name)
   - Add a short description
   - Choose "Public" visibility
   - Do NOT initialize with README, .gitignore, or license (we already have these)

2. Initialize your local repository and push to GitHub:
   ```bash
   # If not already a git repository
   git init
   
   # Add the remote GitHub repository
   git remote add origin https://github.com/yourusername/infrabit-portfolio.git
   
   # Add all files
   git add .
   
   # Make the initial commit
   git commit -m "Initial open source release"
   
   # Push to GitHub
   git push -u origin main
   ```

3. Configure GitHub repository settings:
   - Enable GitHub Issues
   - Configure branch protection rules for `main`
   - Set up GitHub Actions by ensuring Actions are enabled
   - Configure required status checks for pull requests

4. Create project social media preview image:
   - Upload a branded image in GitHub repository settings

5. Add repository topics in GitHub for discoverability:
   - website
   - portfolio
   - react
   - nodejs
   - typescript
   - fullstack
   - mongodb
   - tailwindcss

## Post-Release Tasks

1. Set up project board for tracking issues and features

2. Create initial release:
   - Create a release from the main branch
   - Tag it as v1.0.0
   - Include release notes

3. Publicize the repository:
   - Share on relevant social media
   - Submit to developer newsletters if appropriate
   - Add to your company website

4. Consider setting up automated dependency updates with Dependabot or similar services

5. Monitor issues and pull requests regularly
