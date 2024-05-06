import fastify from 'fastify'
import { userRoutes } from './http/routes'

export const app = fastify()

app.register(userRoutes)