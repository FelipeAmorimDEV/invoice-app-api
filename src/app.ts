import fastify from 'fastify'
import { userRoutes } from './http/routes'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, {
  origin: "*"
})
app.register(userRoutes)