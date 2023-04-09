// indicate that the code should be executed in "strict mode"
// can not use undeclared variables
'use strict';

// require hapi
const Hapi = require('@hapi/hapi');

// server details 
const init = async () => {

    const server = Hapi.server({
        port: 1234,
        // The host property set to localhost is likely the safest choice. 
        // In a docker container, the localhost may not be accessible outside of the container 
        // and using host: '0.0.0.0' may be needed.
        host: 'localhost'
    });


    // add a route - this is the main route
    // if the server runs well, will be display "Hello World!"
    // route is a response to a specific request from user - server can have multiples routes
    server.route([{
        // The method property can be any valid HTTP method, array of HTTP methods, 
        // or an asterisk to allow any method.
        method: 'GET',
        // The path property defines the path including parameters. It can contain optional parameters, 
        // numbered parameters or wildcards -  see the routing tutorial
        path: '/',
        // handler function performs the main business logic of the route and sets the response
        // request - the data that receive from user
        // h - response - the data that send to user
        handler: (request, h) => {

            //  must return a value, a promise, or an error
            return 'Hello, welcome to HomeBanking';
        }
    }, {
        method: 'GET',
        // if we want the user specific page we add /{soccer}; soccer is the user name
        // '/users/{soccer}' - will be mandatory (if we don´t write user name, will be an error)
        // so we add ? - '/users/{soccer?}'
        path: '/user',
        handler: (request, h) => {
            return 'Add your username and password.';
        }
    }, {
        // if user goes to a no exist page
        method: 'GET',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Oh no! You are lost!';
        }
    }]);

    // start server
    await server.start();
    console.log('Server running on %s', server.info.uri);
};


// error - if the server doesn't runs well
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

// call init()
init();

// execute 'node server.js' in the terminal

