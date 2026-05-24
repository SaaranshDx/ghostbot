# GhostBot Privacy Policy

Last updated: May 24, 2026

This Privacy Policy explains how GhostBot processes information when used in Discord.

## Scope

This policy covers GhostBot itself. GhostBot depends on Discord and GhostDrop, so data handled through GhostBot is also subject to Discord's policies, GhostDrop's privacy policy, and the practices of any hosting providers involved.

## Information GhostBot processes

When used in Discord, GhostBot may process:

- Slash command names and command options such as file IDs, slugs, and optional passwords
- Discord interaction metadata such as guild, channel, and user context supplied by Discord
- Discord attachment metadata and attachment URLs
- File contents fetched from Discord for `/drop`
- File contents fetched from GhostDrop for `/get`
- GhostDrop metadata returned by commands such as `/peek` and `/health`

## How GhostBot uses data

GhostBot uses that information only to execute the command you asked it to perform. For example:

- `/drop` fetches an attachment from Discord and uploads it to GhostDrop
- `/peek` fetches GhostDrop file metadata
- `/get` downloads a GhostDrop file and re-sends it into Discord
- `/health` requests GhostDrop server health information

Some responses are sent as ephemeral replies in Discord to reduce visibility, but Discord still processes those interactions under its own systems and policies.

## Third-party services

GhostBot relies on third parties including:

- Discord
- GhostDrop
- Hosting, logging, and network infrastructure providers used by the bot operator

Those services may process IP addresses, request logs, identifiers, timestamps, and related technical metadata according to their own policies.

## Retention

GhostBot is not designed to create end-user accounts or long-term user profiles. However, command logs, hosting logs, Discord-side records, and GhostDrop-side records may be retained according to the bot operator's setup and the policies of those third parties.

## Security

GhostBot only works by moving data between Discord and GhostDrop. As a result:

- Files sent through `/drop` leave Discord and are uploaded to GhostDrop
- Files sent through `/get` leave GhostDrop and are uploaded into Discord
- Optional passwords and file links should be treated as sensitive

Do not use GhostBot for highly sensitive material unless you understand and accept those risks.

## Children's privacy

GhostBot is not directed to children under 13.

## Changes

This policy may be updated from time to time. The current version should be distributed with the project repository.

