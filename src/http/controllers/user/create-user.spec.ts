import request from 'supertest'
import { app } from "@/app";
import { expect, describe, it, beforeEach, afterEach  } from "vitest";

describe("Create User e2e", () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to create a user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456"
      })

      expect(response.status).toEqual(201)
  
    })
})