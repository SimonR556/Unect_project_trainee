import Fastify from 'fastify'

const app = Fastify({
  logger: true
})

app.get('/teste', async (request, reply) => {
  return { hello: 'Utask 3.0 rodando!' }
})

const start = async () => {
  try {
    await app.listen({ port: 3333 })
    console.log('Server running on http://localhost:3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()