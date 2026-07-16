
# env-guard

A lightweight CLI tool that detects secrets before they are committed to GitHub.

## Features

- Detect `.env` files
- Detect API keys and tokens
- Detect private keys
- Block dangerous commits
- Simple Git hook integration

## Installation

```bash
npm install -g env-guard
````

## Usage

Run in your Git repository:

```bash
env-guard
```

Example output:

```
🚨 env-guard blocked commit

- .env: sensitive file detected
- config.js: possible secret detected

Remove secrets before pushing to GitHub.
```

## Git Hook Setup

Add `env-guard` to your pre-commit hook:

```bash
echo "env-guard" > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Now commits containing possible secrets will be blocked automatically.

## Detected Patterns

Currently checks:

* `.env`
* `.env.local`
* `.env.production`
* API keys
* Secret keys
* Access tokens
* Private keys

## License

MIT

