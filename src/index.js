import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID

// Type definations (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

// Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Emre'
        },
        age() {
            return 23
        },
        employed(){
            return true
        },
        gpa() {
            return 3.02
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('The server is up'));