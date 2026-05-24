# GhostBot

GhostBot is a small Discord bot for interacting with GhostDrop from slash commands. It can check server health, inspect file metadata, upload files, and fetch files back into Discord.

## Features

- `/ping` replies with `Pong!`
- `/health` shows GhostDrop server stats
- `/peek` fetches metadata for a file ID or slug
- `/drop` uploads a Discord attachment to GhostDrop
- `/get` downloads a GhostDrop file back into Discord

## Requirements

- A Discord server where you can add bots

## Add The Bot

Invite GhostBot to your server with this link:

https://discord.com/oauth2/authorize?client_id=1507967487751229520&permissions=8&integration_type=0&scope=bot+applications.commands

## Command Guide

### `/ping`

Simple connectivity check for the bot.

### `/health`

Fetches GhostDrop health information, including:

- files stored
- CPU usage
- memory usage
- uptime

### `/peek`

Looks up metadata for a GhostDrop file.

Options:

- `slug` - required file ID or custom slug

Returns:

- original filename
- expiry time
- view count
- whether the file is password protected
- public share link

### `/drop`

Uploads a Discord attachment to GhostDrop.

Options:

- `file` - required attachment to upload
- `slug` - optional custom slug
- `password` - optional password for protected downloads

Returns:

- uploaded filename
- GhostDrop ID
- expiry window
- whether password protection is enabled
- share link
- direct download link

### `/get`

Downloads a GhostDrop file and sends it back as a Discord attachment.

Options:

- `slug` - required file ID or slug
- `password` - optional password for protected files

## How It Works

- Slash commands are loaded from the `commands/` directory at startup.
- Commands are deployed automatically to the configured guild when the bot logs in.
- The GhostDrop API base URL is resolved by [`utils/api.js`](./utils/api.js).
- Upload and download requests use the public GhostDrop HTTP API.

## Project Structure

```text
.
|-- commands/
|   |-- drop.js
|   |-- get.js
|   |-- health.js
|   |-- peek.js
|   `-- ping.js
|-- utils/
|   `-- api.js
|-- index.js
`-- package.json
```

## Notes

- Some replies are ephemeral to avoid exposing passwords or file links more than necessary.

## License

Licensed under the terms of the [LICENSE](./LICENSE) file.
