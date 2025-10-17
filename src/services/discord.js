import axios from 'axios'

export async function sendDiscordMessage({ content, embeds } = {}) {
  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.warn('URL Discord not configured, it is required.')
    return
  }

  const payload = {
    username: process.env.DISCORD_USERNAME || 'Automation Hub',
    avatar_url: process.env.DISCORD_AVATAR || undefined,
    content: content,
    embeds
  }

  try {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, payload, {
      timeout: 15000
    })
  } catch (err) {
    console.error('Discord send failed:', err?.response?.data || err.message)
  }
}

export async function notifyBatchDiscord({
  inserted,
  skipped,
  fetched_total,
  sample
}) {
  const lines = sample
    .slice(0, 3)
    .map(
      (r, i) =>
        `• **${i + 1}.** id=\`${r.id}\`  hash=\`${r.row_hash.slice(0, 8)}...\``
    )
  const content =
    `**Automation Hub Sync**\n` +
    `✅ **Inserted:** ${inserted}\n` +
    `⏭️ **Skipped:** ${skipped}\n` +
    `📄 **Fetched total:** ${fetched_total}\n\n` +
    (lines.length ? lines.join('\n') : '_no preview_')

  const embeds = [
    {
      title: 'Sync Summary',
      color: 0x3b82f6, // @info blue
      fields: [
        { name: 'Inserted', value: String(inserted), inline: true },
        { name: 'Skipped', value: String(skipped), inline: true },
        { name: 'Fetched', value: String(fetched_total), inline: true }
      ],
      timestamp: new Date().toISOString()
    }
  ]

  await sendDiscordMessage({ content, embeds })
}
