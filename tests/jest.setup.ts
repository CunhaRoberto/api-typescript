import supertest from "supertest"
import { server } from "../src/server/Server"
import { Knex } from "../src/server/dataBase/knex"

beforeAll( async () =>{
    await Knex.migrate.latest()
})

afterAll( async () =>{
    await Knex.destroy()
})

export const testServer = supertest(server)