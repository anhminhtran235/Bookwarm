const express = require('express');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const { resolvers, typeDefs } = require('./graphql/index');

const setupApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res }),
        debug: true,
    });

    const app = express();

    app.use(cookieParser());

    app.use((req, res, next) => {
        try {
            const { token } = req.cookies;
            if (token) {
                const parsedToken = jwt.verify(token, process.env.JSON_SECRET);
                req.parsedToken = parsedToken;
            }
        } catch (error) {
            // Cookie exists but invalid => Remove it
            res.cookie('token', '', {
                httpOnly: true,
                expires: new Date(0), // Thu, 01 Jan 1970
            });
        }
        next();
    });

    server.applyMiddleware({
        app,
        path: '/',
        cors: {
            credentials: true,
            origin: process.env.FRONT_END_URL,
        },
        bodyParserConfig: {
            limit: '5mb',
        },
    });

    app.listen({ port: process.env.PORT }, () => {
        console.log(`Sever is running at http://localhost:${process.env.PORT}`);
    });
    return server;
};

module.exports = setupApolloServer;
