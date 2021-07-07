// * Import CORS.
const cors = require('cors');

// * Import body-parser.
const bodyparser = require('body-parser');

// * Import express and initalize server.
const server = require('express')();

// * Use CORS (Cross Origin References) as middleware.
server.use(cors());

// * Use body-parser as middleware, so request body comes in as a JSON object.
server.use(bodyparser.urlencoded({
    extended: true,
}))
server.use(bodyparser.json());

// * Import and use routes.
const PostsRoutes = require('./routes/Posts');
server.use('/api/posts', PostsRoutes);

// * Initialize server.
const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`✈ Server has taken flight on port ${port} ✈`));