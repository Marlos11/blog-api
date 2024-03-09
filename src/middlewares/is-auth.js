export const isAuth = (resquest, reply, done) => {

    const { authorization } = resquest.headers

    if(authorization !== 'token'){
        return reply.status(403).send({ message: 'unauthorized' })
    }

    done()
}