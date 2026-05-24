require("dotenv/config");

const {
  Client,
  Routes,
  REST,
  GatewayIntentBits,
  Collection,
  Events,
  Partials,
  ActivityType,
  PresenceUpdateStatus,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
  ]
});

client.commands = new Collection();

const fs = require("fs");
const path = require("path");

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`smth is fucked up with ${filePath}`);
  }
}

const deployCommands = async () => {
  const commands = [];
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if ("data" in command) commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log(`Deploying ${commands.length} commands...`);
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log(`Deployed ${data.length} commands successfully`);
  } catch (error) {
    console.error(error);
  }
};

client.once(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await deployCommands();
  console.log("Commands deployed");
  const statusType = PresenceUpdateStatus.Online;
  const activityType = ActivityType.Watching;
  const activityName = "over the server";


  client.user.setPresence({
    status: statusType,
    activities: [
      {
        name: activityName,
        type: activityType,
      },
    ],
  });



});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
    } else {
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  }

});

client.login(process.env.DISCORD_TOKEN);