import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID

// Demo user data
const users = [
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

const posts = [
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

const comments = [
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