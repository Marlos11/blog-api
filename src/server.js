import fastify from "fastify";
import { postsRoutes } from "./routes/posts.js";

const app = fastify({
    logger:{
        transport:{                 // aqui basicamente usamos a lib do pino para formatar de uma forma mas legivel nossas informções de logger.
            target:'pino-pretty'
        }
    }
})


app.register(postsRoutes)

app.listen({
    host: '0.0.0.0',
    port: 3000,
})