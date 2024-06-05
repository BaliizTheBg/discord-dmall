# DMALL - Discord Mass DM Bot

DMALL is a powerful tool designed to send mass messages to all members of a Discord server, except those who have disabled private messages. 

Inspired by :
 - [Ituriel](https://github.com/nulledituriel)
 - [OshyOne](https://github.com/OshyOne)

This is the original source code, make sure you follow the licence when you're using it.

Created by : [BaliizTheBg](https://github.com/BaliizTheBg)


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

2. **Navigate to the directory:**   
   ```sh
   cd discord-dmall

3. **Install the dependencies:**
   ```sh
   npm install
   
4. **Configure the bot:** Add your bot token and message in the '**settings.json**' file
   ```json
   { "token": "YOUR_BOT_TOKEN", 
   "message": { "content": "Your message here" }, 
   "owner": "YOUR_OWNER_ID", 
   "exclude_ids": ["ID1", "ID2"], 
   "message_limit": 1000, 
   "batch_size": 10 }

5. **Configure the webhook in** 'script.js': Replace the placeholder webhook ID and token in the script.js file with your actual webhook ID and token in the following two places:

   ```javascript
   // Place 1: Near the top of the file
   const webhookClient = new WebhookClient('YOUR_WEBHOOK_ID', 'YOUR_WEBHOOK_TOKEN');

   // Place 2: In the sendSummaryToWebhook function
   function sendSummaryToWebhook(totalUsers) {
   const webhookClient = new WebhookClient('YOUR_WEBHOOK_ID', 'YOUR_WEBHOOK_TOKEN');
   const logData = fs.readFileSync('error_log.txt', 'utf8');
   const truncatedLogData = logData.length > 1024 ? logData.slice(0, 1021) + '...' : logData; // Truncate to 1024 characters
   const embed = new MessageEmbed()
    .setTitle('Mass DM Summary')
    .addField('Total Users Attempted', totalUsers.toString(), true)
    .addField('Errors', truncatedLogData ? truncatedLogData : 'No errors', false);

    webhookClient.send({ embeds: [embed] });
   }

  

## Usage

 1. **Start the script:**
    ```sh
    npm run start

 2. **Choose the mode:**
    - Type '1' for Normal Mode.
    - Type '2' for Timeout Mode.

 ## Additional Features

  - **ID Exclusion**
 
 Exclude specific users from receiving messages by adding their IDs to the **'exclude_ids'** array in **settings.json**.

  - **Logging**

 All sent messages are logged in a file named **'log.txt'** to track DM activities.

  - **Webhook Summary**

A summary of sent messages is sent to a specified webhook configured in **'settings.json'**. Make sure to properly configure **'webhook.id'** and **'webhook.token'**.

  - **Message Limits**

Set a maximum number of messages to send by configuring message_limit in **`settings.json'**.

  - **Batch Sending**

Send messages in batches for more efficient management by configuring **'batch_size'** in **'settings.json'**

## How It Works

The bot creates an array containing all the **'GuildMember'** objects. It then scrapes the user ID of each **'GuildMember'** object and sends a private message to each user. The bot needs admin permissions to function correctly.

## Note

- Enable Privileged Gateway Intents:
  - Go to Dev Portal > Bot > Privileged Gateway Intents and enable both intents.
- Required Permission: Your bot must have "Administrator" permission.

## Disclaimer
This tool is designed for educational and proof-of-concept purposes. The author is not responsible for any illegal actions or violations of third-party terms of service.

## Troubleshooting
If using Normal Mode, your bot may be flagged by Discord. To resolve this:

- Appeal via this form and select "Appeal an Action Trust and Safety take on my bot".
- Create a new bot if necessary.

Unverified bots cannot mass DM servers with more than 1,000 members. Ensure your bot is verified for such actions.

## Contact

Discord: baliizphp

GitHub: [BaliizTheBg](https://github.com/BaliizTheBg)



