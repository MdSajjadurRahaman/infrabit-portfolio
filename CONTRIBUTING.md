# Contributing to InfraBit Portfolio

We love your input! We want to make contributing to InfraBit Portfolio as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Issues

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/infrabit-portfolio/issues/new); it's that easy!

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Local Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/infrabit-portfolio.git
   cd infrabit-portfolio
   ```

2. Install dependencies
   ```bash
   npm run install-all
   ```

3. Set up environment variables
   ```bash
   # In the client directory
   cp .env.example .env
   
   # In the server directory
   cp .env.example .env
   ```
   
   Then update the values in the `.env` files according to your development environment.

4. Start the development server
   ```bash
   npm start
   ```

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
