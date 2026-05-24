const { SlashCommandBuilder } = require('discord.js');
const { getApiUrl } = require('../utils/api');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('peek')
    .setDescription('Fetch metadata for a GhostDrop file')
    .addStringOption(option =>
      option.setName('slug')
        .setDescription('The file ID or slug')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const slug = interaction.options.getString('slug');

    try {
      const apiUrl = await getApiUrl();
      const res = await fetch(`${apiUrl}/metadata/${slug}`);

      if (res.status === 404) return await interaction.editReply('❌ File not found.');
      if (res.status === 410) return await interaction.editReply('💀 This file is gone.');
      if (!res.ok) return await interaction.editReply('❌ Something went wrong.');

      const data = await res.json();
      const expires = new Date(data.expires_at).toLocaleString();

      await interaction.editReply(
        `📁 **${data.original_name}**\n` +
        `⏳ Expires: ${expires}\n` +
        `👁️ Views: ${data.views}\n` +
        `🔒 Password protected: ${data.has_password ? 'Yes' : 'No'}\n` +
        `🔗 https://link.ghostdrop.qzz.io/${slug}/`
      );

    } catch (err) {
      await interaction.editReply('❌ Failed to fetch file metadata.');
    }
  }
};