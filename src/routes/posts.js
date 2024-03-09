import { isAuth } from "../middlewares/is-auth.js"


const posts = []


export const postsRoutes = async (app) => {
    app.get('/posts', { onRequest: [isAuth] }, (request, reply) => {
        return reply.status(200).send(posts)
    })

    app.post('/posts', { onRequest: [isAuth] }, (request, reply) => {

        const { username, title, content } = request.body

        const post = {
            id: posts.length + 1,
            owner: username,
            title,
            content,
            data: new Date().toISOString,
            comments: [],
            like: []
        }

        posts.push(post)

        return reply.status(201).send(post)
    })

    app.post('/posts/:id/comment', { onRequest: [isAuth] }, (request, reply) => {
        const { id } = request.params



        const postIndex = posts.findIndex(post => post.id === +id)

        if (postIndex === -1) {
            return reply.status(404).send({ message: 'unauthorized' })

        }
        const { username, content } = request.body

        const comment = {

            owner: username,
            content,
            data: new Date().toISOString,

        }

        posts[postIndex].comments.push(comment)

        return reply.status(201).send(posts[postIndex])
    })
}

