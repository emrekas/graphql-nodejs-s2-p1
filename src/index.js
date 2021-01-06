import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID

// Type definations (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
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
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('The server is up'));