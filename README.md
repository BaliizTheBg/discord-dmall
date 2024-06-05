# DMall - Discord Mass DM Bot

DMall is a powerful tool designed to send mass messages to all members of a Discord server, except those who have disabled private messages. This project is for educational and proof-of-concept purposes.

## Features

- **DM Modes:**
  - **Normal Mode:** Rapid message sending (less than a second between each user).
  - **Timeout Mode:** Delay of 3 to 9 seconds between each message to minimize the risk of being flagged for spam by Discord.
- **Security:** Bypasses Discord's anti-spam flags.
- **ID Exclusion:** Ability to exclude specific IDs from message sends.
- **Logging:** Log file to track sent messages.
- **Webhook Summary:** Use a webhook to receive a summary of sent messages.
- **Message Limits:** Define a maximum number of messages to send.
- **Batch Sending:** Send messages in batches for more efficient management.

## Prerequisites

- **Node.js**
- **npm** (installed with Node.js)
- **A text editor** (e.g., VS Code, Sublime Text).

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/BaliizTheBg/discord-dmall.git
```sh
cd discord-dmall

