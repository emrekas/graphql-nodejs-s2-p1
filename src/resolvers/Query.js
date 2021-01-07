const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users;
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        })
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts;
        }
        return db.posts.filter((post) => {
            const isTitleMatched = db.posts.title.toLowerCase().includes(args.query.toLowerCase());
            const isBodyMatched = db.posts.body.toLowerCase().includes(args.query.toLowerCase());
            return isTitleMatched || isBodyMatched;
        })
    },
    me() {
        return {
            id: '1',
            name: 'Emre',
            email: 'yunuskas55@gmail.com'
        }
    },
    post() {
        return {
            id: '123',
            title: 'Some Post',
            body: 'Description',
            published: true
        }
    },
    comments(parent, args, { db }, info) {
        if (!args.text)
            return db.comments;
        return db.comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()));
    }
};

export default Query;