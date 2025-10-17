/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('sheet_rows', (table) => {
    table.text('id').primary()
    table.text('row_hash').notNullable().unique()
    table.jsonb('data').notNullable()
    table.text('source_sheet_id').notNullable()
    table.text('source_tab').notNullable()
    table.timestamp('inserted_at').notNullable().defaultTo(knex.fn.now())

    table.index(['source_sheet_id', 'source_tab'], 'sheet_rows_tab_idx')
  })

  await knex.schema.createTable('ingest_runs', (table) => {
    table.uuid('run_id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.timestamp('started_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('finished_at')
    table.text('sheet_id').notNullable()
    table.text('sheet_tab').notNullable()
    table.integer('fetched_total').notNullable()
    table.integer('processed').notNullable()
    table.integer('inserted').notNullable()
    table.integer('skipped').notNullable()
    table.text('error')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('ingest_runs')
  await knex.schema.dropTableIfExists('sheet_rows')
}
