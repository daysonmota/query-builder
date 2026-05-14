import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("courses", (table) => {
    table.timestamp("updated_at").defaultTo(knex.fn.now()).after("created_at"); //essa coluna fica depois da coluna created_at.
  })
}

//Desfaz a coluna criada.
export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("courses", (table) => {
    table.dropColumn("updated_at");
  })
}
