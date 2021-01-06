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

const posts = [{
    id: '1',
    title: 'a',
    body: 'aaa',
    published: true
},
{
    id: '2',
    title: 'b',
    body: 'bbb',
    published: true
},
{
    id: '3',
    title: 'c',
    body: 'ccc',
    published: false
}
]

// Type definations (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post: Post!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post{
        id: Int!
        title: String!
        body: String!
        published: Boolean!
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
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('The server is up'));