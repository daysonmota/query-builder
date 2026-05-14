import express, { NextFunction, Request, Response } from "express"
import { knex } from "./database/knex"

const app = express()

app.use(express.json())



// ------------
// Courses
// ------------

app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body

  if (!name) {
    return response.status(400).json({ message: "Name is required" })
  }

  await knex("courses").insert({ name })

  return response.status(201).json({ name })
})

app.get("/courses", async (request: Request, response: Response) => {
  const courses = await knex("courses").select("*").orderBy("id", "asc")

  return response.json(courses)
})

app.get("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params

  const course = await knex("courses").where({ id }).first()  //busca o curso pelo id.

  if (!course) {
    return response.status(404).json({ message: "Course not found" })
  }

  return response.json(course)
})

app.put("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params
  const { name } = request.body

  if (!name) {
    return response.status(400).json({ message: "Name is required" })
  }

  const course = await knex("courses").where({ id }).first()

  if (!course) {
    return response.status(404).json({ message: "Course not found" })
  }

  await knex("courses").update({ name }).where({ id })

  return response.json({ message: "Course updated successfully" })
})

app.delete("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params

  const course = await knex("courses").where({ id }).first()

  if (!course) {
    return response.status(404).json({ message: "Course not found" })
  }

  // Desvincula os módulos antes de deletar o curso.
  // Os módulos ficam órfãos (course_id: null) e podem ser reassociados futuramente.
  await knex("course_modules").where({ course_id: id }).update({ course_id: null })
  await knex("courses").delete().where({ id })

  return response.json({ message: "Course deleted successfully" })
})

// ----------------------------------------------------------------
// Modules
// ----------------------------------------------------------------

app.post("/modules", async (request: Request, response: Response) => {
  const { name, course_id } = request.body

  if (!name) {
    return response.status(400).json({ message: "Name is required" })
  }

  if (!course_id) {
    return response.status(400).json({ message: "course_id is required" })
  }

  const course = await knex("courses").where({ id: course_id }).first()

  if (!course) {
    return response.status(404).json({ message: "Course not found" })
  }

  await knex("course_modules").insert({ name, course_id })

  return response.status(201).json({ name, course_id })
})

app.get("/modules", async (request: Request, response: Response) => {
  const modules = await knex("course_modules").select("*")

  return response.json(modules)
})

app.post("/courses/:id/modules", async (request: Request, response: Response) => {
  const { id } = request.params
  const { name } = request.body

  if (!name) {
    return response.status(400).json({ message: "Name is required" })
  }

  const course = await knex("courses").where({ id }).first()

  if (!course) {
    return response.status(404).json({ message: "Course not found" })
  }

  await knex("course_modules").insert({ name, course_id: id })

  return response.status(201).json({ message: "Module created successfully" })
})

app.get("/courses/:id/modules", async (request: Request, response: Response) => {
  const { id } = request.params

  const course = await knex("courses").where({ id }).first()

  if (!course) {
    return response.status(404).json({ message: "Course not found" })
  }

  const modules = await knex("courses")
    .select(
      "courses.id AS course_id",
      "courses.name AS course",
      "course_modules.id AS module_id",
      "course_modules.name AS module_name"
    )
    .join("course_modules", "courses.id", "course_modules.course_id")
    .where("courses.id", id)

  if (modules.length === 0) {
    return response.status(404).json({ message: "No modules found for this course" })
  }

  return response.json(modules)
})

// ----------------------------------------------------------------
// Error handler
// ----------------------------------------------------------------


app.listen(3333, () => console.log("Server is running on port 3333"))