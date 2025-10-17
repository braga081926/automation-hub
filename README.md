# ⚡️ automation-hub

> Node.js automation that syncs **Google Sheets → PostgreSQL → Discord Webhook notifications**

---

## 🚀 Overview

**automation-hub** is a lightweight Node.js automation service designed to synchronize business data from Google Sheets into PostgreSQL and send instant notifications to a Discord channel.

It’s ideal for internal automations, data pipelines, and real-time reporting.  
The service can run manually or on a cron schedule, making it easy to deploy as a background job, container, or GitHub Actions workflow.

---

## 🧩 Features

- 🗂 **Google Sheets Integration** — Fetch rows via Google Sheets API using a Service Account
- 🐘 **PostgreSQL Storage** — Upsert data with idempotency, avoiding duplicates
- 🔔 **Discord Notifications** — Send automated rich embeds through a Discord Webhook
- ⏰ **Scheduling** — Run periodically using `node-cron` or as a one-off execution
- ⚙️ **Environment-driven Configuration** — Everything configurable via `.env`
- 🧱 **Docker-ready** — Minimal setup for local or production environments

---

## 🏗 Architecture

Google Sheets
↓
Sheets Fetcher (Axios + JWT Auth)
↓
Row Mapper / Hash Generator
↓
PostgreSQL Upsert Layer
↓
Discord Webhook Notifier
↓
Cron Scheduler (optional)

pgsql
Copy code

---

## 📦 Tech Stack

| Layer         | Technology           |
| ------------- | -------------------- |
| Runtime       | Node.js (ES Modules) |
| API Client    | Axios                |
| Database      | PostgreSQL + Knex    |
| Scheduler     | node-cron            |
| Notifications | Discord Webhooks     |
| Config        | dotenv               |
| Hashing       | crypto (SHA-256)     |

---

## ⚙️ Environment Variables

Create a `.env` file (based on `.env.example`):

```bash
# Google Service Account
GOOGLE_CLIENT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv..."

# Google Sheet
SHEET_ID=16XUNOz92GcInyfSuBbCqGoCo0ZvFl-Mlr7S5vjebyf8
SHEET_TAB=Sheet1
SHEET_RANGE=A:Z

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=automation_hub
PG_USER=postgres
PG_PASSWORD=postgres
PG_SSL=false

# Discord Webhook
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/XXXXXXXX/XXXXXXXX
DISCORD_USERNAME=Automation Hub
DISCORD_AVATAR=https://i.imgur.com/your-bot.png

# Scheduler
CRON_SCHEDULE=*/5 * * * *
💡 The Google Sheet must be shared with the Service Account email to allow read access.

🧰 Installation & Setup
bash
Copy code
# 1. Clone the repository
git clone https://github.com/yourusername/automation-hub.git
cd automation-hub

# 2. Install dependencies
npm install

# 3. Run database migrations
npx knex migrate:latest

# 4. Execute once (manual run)
npm run dev

# 5. Run continuously (cron mode)
npm run start
🔄 Example Output
json
Copy code
{
  "sheet": "ldskadaopinod29casnadsa92h2-IJONHSoijnha",
  "tab": "Sheet1",
  "fetched_total": 25,
  "processed": 25,
  "inserted": 5,
  "skipped": 20
}
Discord Notification Example
📊 Automation Hub Sync
✅ Inserted: 5
⏭️ Skipped: 20
📄 Fetched total: 25
• id=123 hash=9a7c5d1b...
• id=124 hash=2fa93e10...

🧠 Project Structure
python
Copy code
automation-hub/
 ┣ src/
 ┃ ┣ index.js              # main orchestrator
 ┃ ┣ services/
 ┃ ┃ ┣ googleSheets.js     # fetch data from Sheets API
 ┃ ┃ ┣ postgres.js         # persist rows into PostgreSQL
 ┃ ┃ ┗ discord.js          # send notifications via Webhook
 ┃ ┗ utils/
 ┃   ┣ env.js              # environment loader
 ┃   ┗ hash.js             # SHA-256 helper
 ┣ migrations/
 ┃ ┗ 20251016_init.js      # database schema (Knex)
 ┣ .env.example
 ┣ package.json
 ┗ README.md
🧾 License
MIT © 2025 — Built by Lucas Braga
```
