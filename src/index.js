import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID

// Type definations (schema)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean
    }
`;

// Resolvers
const resolvers = {
    Query: {
        title() {
            return 'Apple'
        },
        price() {
            return 3.1
        },
        releaseYear() {
            return 2001
        },
        inStock(){
            return true
        },
        rating() {
            return null
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('The server is up'));