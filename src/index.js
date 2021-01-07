import { GraphQLServer } from "graphql-yoga";
import uuidv4 from 'uuid/v4';

// String, Boolean, Int, Float, ID

// Demo user data
let users = [
    {
        id: '1',
        name: 'Emre',
        email: 'y.emrekas@outlook.com',
        age: 23
    },
    {
        id: '2',
        name: 'Aylin',
        email: 'aylin@outlook.com',
        age: 22
    },
    {
        id: '3',
        name: 'Ali',
        email: 'ali@outlook.com',
        age: 26
    }];

let posts = [
    {
        id: '1',
        title: 'a',
        body: 'aaa',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'b',
        body: 'bbb',
        published: true,
        author: '1'
    },
    {
        id: '3',
        title: 'c',
        body: 'ccc',
        published: false,
        author: '2'
    }
]

let comments = [
    {
        id: '1',
        text: 'comments1',
        author: '1',
        post: '1'
    },
    {
        id: '2',
        text: 'comments2',
        author: '1',
        post: '2'
    },
    {
        id: '3',
        text: 'comments3',
        author: '2',
        post: '1'
    }, {
        id: '4',
        text: 'comments4',
        author: '3',
        post: '1'
    }
]

// Type definations (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post: Post!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput!): Comment!
        deleteComment(id: ID!): Post!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: Int!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: Int!
        text: String!
        author: User!
        post: Post!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }
            return posts.filter((post) => {
                const isTitleMatched = posts.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatched = posts.body.toLowerCase().includes(args.query.toLowerCase());
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
        comments(parent, args, ctx, info) {
            if (!args.text)
                return comments;
            return comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()));
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email === args.data.email);

            if (emailTaken) {
                throw new Error('Email is taken');
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user);

            return user;
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex(user => user.id === args.id);
            if (userIndex === -1) {
                throw new Error('User not found');
            }

            const deletedUsers = users.splice(userIndex, 1);

            posts = posts.filter(post => {
                const match = post.author === args.id;

                if (match) {
                    comments = comments.filter(comment => comment.post !== post.id);
                }
                return !match;
            })
            comments = comments.filter(comment => comment.author !== args.id);

            return deletedUsers[0];

        },
        createPost(parent, args, ctx, info) {
            const userExist = users.some(user => user.id === args.data.author);
            if (!userExist) {
                throw new Error('User not found');
            }

            const post = {
                id: uuidv4(),
                ...args.data
            };

            posts.push(post);

            return post;
        },
        deletePost(parent, args, ctx, info) {
            const postIndex = posts.findIndex(post => post.id === args.id);
            if (postIndex === -1) {
                throw new Error('User not found');
            }

            const deletedPosts = posts.splice(postIndex, 1);

            comments = comments.filter(comment => comment.author !== args.id);

            return deletedPosts[0];

        },
        createComment(parent, args, ctx, info) {
            const userExist = users.some(user => user.id === args.data.author);
            const postExist = posts.some(post => post.id === args.data.post);
            if (!userExist || !postExist) {
                throw new Error('User or comment not found');
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            };

            comments.push(comment);

            return comment;
        },
        deleteComment(parent, args, ctx, info) {
            const commentIndex = comments.findIndex(comment => comment.id === args.id);
            if (commentIndex === -1) {
                throw new Error('Comment not found');
            }

            const deletedComments = comments.splice(commentIndex, 1);

            comments = comments.filter(comment => comment.id !== args.id);

            return deletedComments[0];

        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => parent.author === user.id);
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id);
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => parent.author === user.id);
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => parent.post === post.id);
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('The server is up'));