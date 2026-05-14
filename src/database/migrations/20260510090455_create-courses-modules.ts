import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable("course_modules", (table) => {
    table.increments("id").primary(),
      table.text("name").notNullable()
    table.integer("course_id") //Chave estrangeira para associar o módulo a um curso.
      .unsigned() // O valor deve ser positivo, pois é um ID.
      .notNullable()//O módulo deve estar associado a um curso.
      .references("id") //Referência a coluna "id" da tabela "courses".
      .inTable("courses") //Tabela de referência.

  }
  )
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('course_modules')
}

