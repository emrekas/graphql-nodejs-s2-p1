import { GraphQLServer } from "graphql-yoga";

// Type definations (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'Hello World!';
        },
        name() {
            return 'Yunus Emre KAS';
        },
        location() {
            return 'Kocaeli';
        },
        bio() {
            return 'Developer';
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('The server is up'));