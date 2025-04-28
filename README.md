# AI Code Review Bot

An AI-driven GitHub bot that automatically reviews pull requests for security issues and style violations.

## Features
- **Security Checks**: Scans code for common vulnerabilities (e.g., SQL injection, hardcoded secrets).
- **Style Enforcement**: Ensures code adheres to predefined style guidelines (e.g., PEP 8, ESLint).
- **Automated Comments**: Posts detailed feedback directly on PRs for actionable improvements.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Mavasahikona/ai-code-review-bot.git
   ```
2. Install dependencies:
   ```bash
   cd ai-code-review-bot
   npm install
   ```
3. Configure the bot by editing `config.json`.

## Usage
1. Run the bot:
   ```bash
   npm start
   ```
2. The bot will automatically monitor PRs and post reviews.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss the proposed changes.

## License
MIT