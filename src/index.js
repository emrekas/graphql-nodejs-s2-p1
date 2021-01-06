import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID

// Type definations (schema)
const typeDefs = `
    type Query {
        greeting(name: String): String!
        me: User!
        post: Post!
        add(n1: Float!, n2: Float!): Float
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
        greeting(parent, args, ctx) {
            if (args.name) {
                return 'Hello, ' + args.name;
            }
            return 'Hello!';
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
        add(parent, args, ctx) {
            if (args.n1 && args.n2) {
                return args.n1 + args.n2;
            }
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('The server is up'));