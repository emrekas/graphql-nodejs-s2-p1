const Post = {
    author(parent, args, { db }, info) {
        return db.users.find((user) => parent.author === user.id);
    },
    likes(parent, args, { db }, info) {
        return db.likes.filter(like => like.author === parent.id);
    }
}

export default Post;