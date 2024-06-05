
Here’s a comprehensive and well-structured README for your DMall project on GitHub:

DMall - Discord Mass DM Bot
 <!-- Replace with actual image URL -->

DMall is a powerful tool designed to send mass messages to all members of a Discord server, except those who have disabled private messages. This project is for educational and proof-of-concept purposes.

Features
DM Modes:
Normal Mode: Rapid message sending (less than a second between each user).
Timeout Mode: Delay of 3 to 9 seconds between each message to minimize the risk of being flagged for spam by Discord.
Security: Bypasses Discord's anti-spam flags.
ID Exclusion: Ability to exclude specific IDs from message sends.
Logging: Log file to track sent messages.
Webhook Summary: Use a webhook to receive a summary of sent messages.
Message Limits: Define a maximum number of messages to send.
Batch Sending: Send messages in batches for more efficient management.
Prerequisites
Node.js
npm (installed with Node.js)
A text editor (e.g., VS Code, Sublime Text).
Installation
Clone the repository:
sh
Copy code
git clone https://github.com/BaliizTheBg/discord-dmall.git
Navigate to the directory:
sh
Copy code
cd discord-dmall
Install the dependencies:
sh
Copy code
npm install
Configure the bot: Add your bot token and message in the settings.json file:
json
Copy code
{
  "token": "YOUR_BOT_TOKEN",
  "message": {
    "content": "Your message here"
  },
  "owner": "YOUR_OWNER_ID",
  "exclude_ids": ["ID1", "ID2"],
  "message_limit": 1000,
  "batch_size": 10
}
Usage
Start the script:
sh
Copy code
npm start
Choose the mode:
Type 1 for Normal Mode.
Type 2 for Timeout Mode.
Example Configuration
Example of settings.json:

json
Copy code
{
  "token": "YOUR_BOT_TOKEN",
  "message": {
    "content": "Salut {user}, je sais que tu reçois souvent des messages de pub de ma part et que ça doit t'embêter. Donc cette fois-ci je vais te parler français, y'a un serveur que j'aimerais que tu rejoignes qui s'appelle **Iyori**, il est super actif y'a + de **250 vocal** tous les soirs, le chat pareil :star: !\n\nJe sais que beaucoup aiment les **Nitro Boost** :tada:, donc je peux te proposer qu'en rejoignant ce serveur t'ailles lire le message dans le salon notifications, et tu pourras en remporter un\n\ndiscord.gg/iyori"
  },
  "owner": "902994544881180753",
  "exclude_ids": [313279957466087424],
  "message_limit": 1000,
  "batch_size": 10
}
Additional Features
ID Exclusion
Exclude specific users from receiving messages by adding their IDs to the exclude_ids array in settings.json.

Logging
All sent messages are logged in a file named log.txt to track DM activities.

Webhook Summary
A summary of sent messages is sent to a specified webhook configured in settings.json. Make sure to properly configure webhookId and webhookToken.

Message Limits
Set a maximum number of messages to send by configuring message_limit in settings.json.

Batch Sending
Send messages in batches for more efficient management by configuring batch_size in settings.json.

How It Works
The bot creates an array containing all the GuildMember objects. It then scrapes the user ID of each GuildMember object and sends a private message to each user. The bot needs admin permissions to function correctly.

Note
Enable Privileged Gateway Intents:
Go to Dev Portal > Bot > Privileged Gateway Intents and enable both intents.
Required Permission: Your bot must have "Administrator" permission.
Disclaimer
This tool is designed for educational and proof-of-concept purposes. The author is not responsible for any illegal actions or violations of third-party terms of service.

Troubleshooting
If using Normal Mode, your bot may be flagged by Discord. To resolve this:

Appeal via this form and select "Appeal an Action Trust and Safety take on my bot".
Create a new bot if necessary.
Unverified bots cannot mass DM servers with more than 1,000 members. Ensure your bot is verified for such actions.

Contact
Discord: baliizphp
GitHub: BaliizTheBg
