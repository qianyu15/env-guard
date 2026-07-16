# env-guard

A lightweight background CLI tool that monitors `.env` files and detects possible secrets in real time.

## Features

* Real-time `.env` file monitoring
* Detect API keys, tokens, passwords, and private keys
* Runs as a background watcher
* Simple CLI usage

## Installation

```bash
npm install -g env-guard
```

## Usage

Start monitoring:

```bash
env-guard
```

Example:

```text
🛡️ env-guard daemon started

.env changed

🚨 env-guard detected sensitive data

- API Key
- Token
```

## Detected Patterns

Currently checks:

* `API_KEY`
* `SECRET`
* `TOKEN`
* `PASSWORD`
* Private key format

## Stop

Press:

```text
Ctrl + C
```

## Use Case

env-guard helps prevent accidentally exposing sensitive environment variables during development.

## License

MIT
