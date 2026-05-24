const { SlashCommandBuilder } = require('discord.js');
const { getApiUrl } = require('../utils/api');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('health')
    .setDescription('Fetch health status of the GhostDrop server'),

  async execute(interaction) {
    await interaction.deferReply();


    try {
      const apiUrl = await getApiUrl();
      const res = await fetch(`${apiUrl}/health`);

      if (!res.ok) return await interaction.editReply('❌ Something went wrong.');

      const data = await res.json();

      const uptime = (s) =>
        [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
          .map((v) => String(v).padStart(2, "0"))
          .join(":");

      await interaction.editReply(
        `📦 Files Stored: ${data.files_stored}\n` +
        `🔥 CPU Usage: ${data.cpu_usage}\n` +
        `💾 RAM Usage: ${data.memory_usage}\n` +
        `⏱️ Uptime: ${uptime(parseFloat(data.uptime))}`
      );

    } catch (err) {
      await interaction.editReply('❌ Failed to fetch server health status.');
    }
  }
};