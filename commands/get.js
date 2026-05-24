const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { getApiUrl } = require('../utils/api');

function getFilenameFromDisposition(headerValue) {
  if (!headerValue) return null;

  const utf8Match = headerValue.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match) {
    return decodeURIComponent(utf8Match[1]);
  }

  const quotedMatch = headerValue.match(/filename="([^"]+)"/i);
  if (quotedMatch) {
    return quotedMatch[1];
  }

  const bareMatch = headerValue.match(/filename=([^;]+)/i);
  if (bareMatch) {
    return bareMatch[1].trim();
  }

  return null;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get')
    .setDescription('Download a GhostDrop file into Discord')
    .addStringOption((option) =>
      option
        .setName('slug')
        .setDescription('The file ID or slug')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('password')
        .setDescription('Password for protected files')
        .setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const slug = interaction.options.getString('slug');
    const password = interaction.options.getString('password');

    try {
      const apiUrl = await getApiUrl();
      const response = await fetch(`${apiUrl}/files/${encodeURIComponent(slug)}`, {
        headers: password ? { password } : {},
      });

      if (response.status === 401) {
        await interaction.editReply('❌ This file is password protected, or the password was incorrect.');
        return;
      }

      if (response.status === 404) {
        await interaction.editReply('❌ File not found.');
        return;
      }

      if (response.status === 410) {
        await interaction.editReply('💀 This file is gone.');
        return;
      }

      if (!response.ok) {
        await interaction.editReply('❌ Failed to download that file from GhostDrop.');
        return;
      }

      const contentDisposition = response.headers.get('content-disposition');
      const filename = getFilenameFromDisposition(contentDisposition) || slug;
      const fileBuffer = Buffer.from(await response.arrayBuffer());
      const attachment = new AttachmentBuilder(fileBuffer, { name: filename });

      await interaction.editReply({
        content: `📥 Downloaded \`${filename}\``,
        files: [attachment],
      });
    } catch (error) {
      await interaction.editReply('❌ Failed to fetch that file from GhostDrop.');
    }
  },
};
