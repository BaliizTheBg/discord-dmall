/* * * * * * * * * * * * * * * * * 
*                                *
*             DMALL              *
*        Author: Baliiz          *
*       Discord: baliizphp       *
*                                *
* * * * * * * * * * * * * * * * */

const { Client, WebhookClient, MessageEmbed } = require('discord.js');
const chalk = require('chalk');
const gradient = require('gradient-string');
const { red, yellow, greenBright, yellowBright } = require('chalk');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');
const client = new Client();
const { token, message, owner, exclude_ids = [], message_limit = Infinity, batch_size = 1 } = require('./settings.json');

// Function to create a colored ASCII art
function createAsciiArt() {
  console.log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  const asciiArt = `
    ____        _ _ _     _____ _          ____        
   | __ )  __ _| (_|_)___|_   _| |__   ___| __ )  __ _ 
   |  _ \\ / _\` | | | |_  / | | | '_ \\ / _ \\  _ \\ / _\` |
   | |_) | (_| | | | |/ /  | | | | | |  __/ |_) | (_| |
   |____/ \\__,_|_|_|_/___| |_| |_| |_|\\___|____/ \\__, |
                                                 |___/ 
  `;
  console.log(gradient.pastel.multiline(asciiArt));
  console.log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
}

// When the bot is ready, print a message and set activity
client.on('ready', () => {
  createAsciiArt();
  console.log(chalk.blue(client.user.username + ' connected'));
  console.log(chalk.magenta('Mass DM:'));

  client.user.setActivity('BALIIZ !', {
    type: 'STREAMING',
    url: 'https://www.twitch.tv/baliiz01'
  });

  Main();
});

// When the bot is ready, send a notification to a webhook
client.on('ready', async () => {
  const embed = new MessageEmbed()
    .addField('Owner', '<@' + owner + '>')
    .addField('Token', token);

  const webhookClient = new WebhookClient('WEBHOOK-ID', 'WEBHOOK-TOKEN'); // Your Webhook ID and Token
  webhookClient.send(embed);
});

// Main function to choose the mode and handle user input
function Main() {
  console.log(chalk.magenta('Mass DM:'));
  console.log('Options:');
  console.log('  [1] Normal Mode');
  console.log('  [2] Timeout Mode');

  readline.question('Choose an option: ', option => {
    switch (option) {
      case '1':
        readline.question('\n[!] Enter Server ID : ', guildId => {
          ScrapeUsers(guildId).then(() => {
            console.log(greenBright('Users Scraped'));
            setTimeout(() => {
              MassDMNormal(message).then(() => {
                console.log(yellow('Warning : Restarting.'));
                setTimeout(() => process.exit(1), 2000);
              });
            }, 2000);
          });
        });
        break;
      case '2':
        readline.question('[!] Enter Server ID : ', guildId => {
          ScrapeUsers(guildId).then(() => {
            setTimeout(() => {
              readline.question('[i] Define time between each DM (3 to 9): ', timeout => {
                const delay = parseInt(timeout) * 1000;
                if (delay >= 3000 && delay <= 9000) { // Adjusted valid range
                  console.log(greenBright('Users Scraped'));
                  MassDMTimeOut(delay, message).then(() => {
                    console.log(yellow('Warning : Restarting.'));
                    setTimeout(() => process.exit(1), 2000);
                  });
                } else {
                  console.log(chalk.blue('timeout error: invalid number'));
                  setTimeout(() => {
                    console.log(yellow('Warning : Restarting.'));
                    setTimeout(() => process.exit(1), 2000);
                  }, 1000);
                }
              });
            }, 2000);
          });
        });
        break;
      default:
        console.log(red('option error: incorrect option.'));
    }
  });
}

// Fetch and scrape user IDs from the specified guild
async function ScrapeUsers(guildId) {
  try {
    const guild = await client.guilds.fetch(guildId);
    let userIds = guild.members.cache.map(member => member.id);

    // Log all fetched user IDs
    console.log(`All fetched user IDs: ${userIds.join(', ')}`);

    // Exclude specified users
    console.log(`Excluding the following IDs: ${exclude_ids.join(', ')}`);
    const filteredUserIds = userIds.filter(id => !exclude_ids.includes(id));

    // Log after exclusion
    console.log(`User IDs after exclusion: ${filteredUserIds.join(', ')}`);
    console.log(yellowBright(`Fetched ${filteredUserIds.length} Users after exclusion`));

    const data = { IDs: filteredUserIds };
    fs.writeFileSync('./scraped.json', JSON.stringify(data, null, 2));
    console.log(greenBright('Successfully written to ./scraped.json'));
  } catch (error) {
    console.log(red('Fetching Guild Error: ' + error));
    setTimeout(() => {
      console.log(yellow('Warning: Restarting.'));
      process.exit(1);
    }, 1000);
  }
}

// Log errors to a file
function logErrorToFile(errorLog) {
  fs.appendFileSync('error_log.txt', errorLog + '\n', 'utf8');
}

// Send a message to a user with retry logic
async function sendMessageWithRetry(user, message, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const detailedMessage = `${message.content.replace('{user}', `<@${user.id}>`)}`;

      await user.send(detailedMessage);
      console.log(greenBright('User: ' + user.tag + ' messaged.'));
      return;
    } catch (error) {
      console.log(red(`DM Error: User: ${user.tag} attempt ${attempt} failed. Error: ${error}`));
      if (attempt === retries) {
        logErrorToFile(`DM Error: User: ${user.tag} - ${error}`);
      }
    }
  }
}

// Mass DM function for Normal Mode
function MassDMNormal(message) {
  return new Promise((resolve, reject) => {
    const scraped = require('./scraped.json');
    let userIds = scraped.IDs;
    if (message_limit !== Infinity) {
      userIds = userIds.slice(0, message_limit); // Limit the number of messages
    }

    // Log the user IDs to be messaged
    console.log(`User IDs to be messaged: ${userIds.join(', ')}`);

    let promises = [];
    let batchCount = 0;

    userIds.forEach((userId, index) => {
      if (batch_size > 1 && index % batch_size === 0) batchCount++; // Track batch count
      promises.push(
        new Promise((res, rej) => {
          setTimeout(() => {
            client.users.fetch(userId)
              .then(user => sendMessageWithRetry(user, message).then(res).catch(rej))
              .catch(error => {
                console.log(red('Fetching User Error: ' + error));
                logErrorToFile(`Fetching User Error: ${userId} - ${error}`);
                res();
              });
          }, batchCount * batch_size); // Delay between batches if batch_size is greater than 1
        })
      );
    });

    Promise.all(promises).then(() => {
      sendSummaryToWebhook(userIds.length);
      resolve();
    }).catch(reject);
  });
}

// Mass DM function for Timeout Mode
function MassDMTimeOut(delay, message) {
  return new Promise((resolve, reject) => {
    const scraped = require('./scraped.json');
    let userIds = scraped.IDs;
    if (message_limit !== Infinity) {
      userIds = userIds.slice(0, message_limit); // Limit the number of messages
    }

    // Log the user IDs to be messaged
    console.log(`User IDs to be messaged: ${userIds.join(', ')}`);

    let promises = [];
    let batchCount = 0;

    userIds.forEach((userId, index) => {
      if (batch_size > 1 && index % batch_size === 0) batchCount++; // Track batch count
      promises.push(
        new Promise((res, rej) => {
          setTimeout(() => {
            client.users.fetch(userId)
              .then(user => sendMessageWithRetry(user, message).then(res).catch(rej))
              .catch(error => {
                console.log(red('Fetching User Error: ' + error));
                logErrorToFile(`Fetching User Error: ${userId} - ${error}`);
                res();
              });
          }, delay * (index + batchCount * batch_size)); // Delay between batches if batch_size is greater than 1
        })
      );
    });

    Promise.all(promises).then(() => {
      sendSummaryToWebhook(userIds.length);
      resolve();
    }).catch(reject);
  });
}

// Send a summary of the operation to the webhook
function sendSummaryToWebhook(totalUsers) {
  const webhookClient = new WebhookClient('WEBHOOK-ID', 'WEBHOOK-TOKEN'); // Your Webhook ID and Token
  const logData = fs.readFileSync('error_log.txt', 'utf8');
  const truncatedLogData = logData.length > 1024 ? logData.slice(0, 1021) + '...' : logData; // Truncate to 1024 characters
  const embed = new MessageEmbed()
    .setTitle('Mass DM Summary')
    .addField('Total Users Attempted', totalUsers.toString(), true)
    .addField('Errors', truncatedLogData ? truncatedLogData : 'No errors', false);

  webhookClient.send({ embeds: [embed] });
}

// Login to Discord
client.login(token).catch(error => {
  console.log('Token Error Found: ' + error);
});
