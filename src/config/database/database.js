import knex from 'knex'

export default knex({
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
  },
  migrations: {
    directory: './src/config/database/migrations'
  }
})
