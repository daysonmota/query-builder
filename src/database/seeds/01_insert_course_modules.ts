import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

  await knex("courses").del()

  // Inserts seed entries
  await knex("courses").insert(
    [
      { id: 1, name: "NodeJS" },
      { id: 2, name: "ReactJS" },
      { id: 3, name: "React Native" },
      { id: 4, name: "Flutter" },
      { id: 5, name: "Angular" },
      { id: 6, name: "VueJS" },
      { id: 7, name: "TypeScript" },
      { id: 8, name: "JavaScript" },
    ]);
};
