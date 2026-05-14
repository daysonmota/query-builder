import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("course_modules").del()

  await knex("course_modules").insert([
    // NodeJS - course_id: 1
    { name: "Introdução ao Node.js", course_id: 1 },
    { name: "HTTP e Rotas", course_id: 1 },
    { name: "Banco de Dados com Knex", course_id: 1 },
    { name: "Autenticação JWT", course_id: 1 },

    // ReactJS - course_id: 2
    { name: "Introdução ao React", course_id: 2 },
    { name: "Componentes e Props", course_id: 2 },
    { name: "Hooks (useState, useEffect)", course_id: 2 },
    { name: "Consumo de API", course_id: 2 },

    // React Native - course_id: 3
    { name: "Introdução ao React Native", course_id: 3 },
    { name: "Navegação com Expo Router", course_id: 3 },
    { name: "Estilização com StyleSheet", course_id: 3 },

    // Flutter - course_id: 4
    { name: "Introdução ao Flutter", course_id: 4 },
    { name: "Widgets e Layouts", course_id: 4 },
    { name: "Gerenciamento de Estado", course_id: 4 },

    // Angular - course_id: 5
    { name: "Introdução ao Angular", course_id: 5 },
    { name: "Components e Modules", course_id: 5 },
    { name: "Services e Injeção de Dependência", course_id: 5 },

    // VueJS - course_id: 6
    { name: "Introdução ao Vue", course_id: 6 },
    { name: "Composition API", course_id: 6 },
    { name: "Vue Router", course_id: 6 },

    // TypeScript - course_id: 7
    { name: "Tipagem Básica", course_id: 7 },
    { name: "Interfaces e Types", course_id: 7 },
    { name: "Generics", course_id: 7 },

    // JavaScript - course_id: 8
    { name: "Fundamentos do JavaScript", course_id: 8 },
    { name: "Promises e Async/Await", course_id: 8 },
    { name: "Manipulação do DOM", course_id: 8 },
  ])
}