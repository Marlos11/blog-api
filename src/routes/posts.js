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

    app.patch('/posts/:id/like',{onRequest:[isAuth]},(request,reply)=>{
        const {id} = request.params 

        const postIndex = posts.findIndex(post =>post.id === +id)

        if(postIndex ===-1){
            return reply.status(404).send({message:'post not found'})
        }

        const {username} = request.body

        const likeIndex = posts[postIndex].like.findIndex(item=> item === username )

        if(likeIndex>=0){
            posts[postIndex].like.splice(likeIndex,1)

            return reply.status(200).send(posts[postIndex])
        }

        posts[postIndex].like.push(username)

        return reply.status(200).send(posts[postIndex])
    })

    app.delete('/posts/:id',{onRequest:[isAuth]},(request,reply)=>{

        const {id} = request.params 

        const postIndex = posts.findIndex(post =>post.id === +id)

        if(postIndex ===-1){
            return reply.status(404).send({message:'post not found'})
        }

        const {username} = request.body 

        if(username !== posts[postIndex].owner){
            return reply.status(400).send({message:'user not a owner post '})
        }

        posts.splice(postIndex,1)

        return reply.status(204).send()
    })
}

