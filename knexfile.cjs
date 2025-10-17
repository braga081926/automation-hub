module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'automation_hub'
    },
    migrations: {
      directory: './src/config/migrations',
      tableName: 'knex_migrations',
      extension: 'js'
    },
    pool: { min: 0, max: 10 }
  }
}
