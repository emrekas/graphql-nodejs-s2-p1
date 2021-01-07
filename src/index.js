import { GraphQLServer } from "graphql-yoga";
import uuidv4 from 'uuid/v4';
import db from './db';

// Resolvers
const resolvers = {
    Query: {
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
    },
    Mutation: {
        createUser(parent, args, { db }, info) {
            const emailTaken = db.users.some(user => user.email === args.data.email);

            if (emailTaken) {
                throw new Error('Email is taken');
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            db.users.push(user);

            return user;
        },
        deleteUser(parent, args, { db }, info) {
            const userIndex = db.users.findIndex(user => user.id === args.id);
            if (userIndex === -1) {
                throw new Error('User not found');
            }

            const deletedUsers = db.users.splice(userIndex, 1);

            posts = db.posts.filter(post => {
                const match = post.author === args.id;

                if (match) {
                    comments = db.comments.filter(comment => comment.post !== post.id);
                }
                return !match;
            })
            comments = db.comments.filter(comment => comment.author !== args.id);

            return deletedUsers[0];

        },
        createPost(parent, args, { db }, info) {
            const userExist = db.users.some(user => user.id === args.data.author);
            if (!userExist) {
                throw new Error('User not found');
            }

            const post = {
                id: uuidv4(),
                ...args.data
            };

            db.posts.push(post);

            return post;
        },
        deletePost(parent, args, { db }, info) {
            const postIndex = db.posts.findIndex(post => post.id === args.id);
            if (postIndex === -1) {
                throw new Error('User not found');
            }

            const deletedPosts = db.posts.splice(postIndex, 1);

            comments = db.comments.filter(comment => comment.author !== args.id);

            return deletedPosts[0];

        },
        createComment(parent, args, { db }, info) {
            const userExist = db.users.some(user => user.id === args.data.author);
            const postExist = db.posts.some(post => post.id === args.data.post);
            if (!userExist || !postExist) {
                throw new Error('User or comment not found');
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            };

            db.comments.push(comment);

            return comment;
        },
        deleteComment(parent, args, { db }, info) {
            const commentIndex = db.comments.findIndex(comment => comment.id === args.id);
            if (commentIndex === -1) {
                throw new Error('Comment not found');
            }

            const deletedComments = db.comments.splice(commentIndex, 1);

            comments = db.comments.filter(comment => comment.id !== args.id);

            return deletedComments[0];

        }
    },
    Post: {
        author(parent, args, { db }, info) {
            return db.users.find((user) => parent.author === user.id);
        }
    },
    User: {
        posts(parent, args, { db }, info) {
            return db.posts.filter(post => post.author === parent.id);
        }
    },
    Comment: {
        author(parent, args, { db }, info) {
            return db.users.find((user) => parent.author === user.id);
        },
        post(parent, args, { db }, info) {
            return db.posts.find((post) => parent.post === post.id);
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db
    }
});

server.start(() => console.log('The server is up'));