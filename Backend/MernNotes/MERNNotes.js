//                  Node.js Notes

// Nodejs : Node.js is a javascript runtime environment for executing javascript code outside the browser.It is a open-source and cross platform.(cross platform mean it can run in window,linux,mac)

// Nodejs feature

// Event loop : Means generally it a non-blocking,javascript is a single threaded language and rest work in a event loop,if you give a code to execute it will complete and again go in loop and keep moving.

// Single threaded : means at a time it will work once not a multi-tasker.(One time one work)

// File system Access : Provide api to read and write file directly,which is not possible environment for security reason.

// or

// The Node.js File System module (fs) provides a comprehensive set of methods for working with the file system on your computer.

// IDE : stands for integrated development environment,it is a basic tools required for software development.

// what is REPL ?
// ans: Executes javascript code interactively.stands for Read Evaluated Print Loop.

// DNS Works: Domain Name Service, it is used to provide the IP address to connect to the web server and load the website.

// or

// DNS : it is used to give location or give the address of the website to connect to the web server and load the website.

// Type of DNS

// 1. Root DNS : send to this (.com,.org).
// 2.TLD (TOP-LEVEL-DOMAIN) : send to this (.com,.org).
// 3.Authoritative DNS : send to this (cloudflare,google DNS).

// TCP :[Transmission Control Protocol] Is used to make connection

// HTTP

// 1 : Here the password is not encrypted.(encrypted means you visit in website and in between hacker can see the value).
// 2 : used for basic website without security

// HTTPs

// 1 : Here the password is encrypted HTTP,encrypt data for secure communication.
// 2 : used in online banking.

// Node core modules : Core modules are included with nodejs installation,directly available for use without npm install.

// Path : provide utilities for handling and transforming file.

// Path.os : Every operating system has own way to manage the path so path.os is managed to work on every system

// Streams : Continuous flowing of data in one direction that process is called stream.

// Chunks : small part of data is called chunks.

// Buffer : It is used to collect all data and arrange in serial wise and then send.

// Modules : Its has a import js.new version.

// require : It just a style in common js.old version.

// Event-Driven : It allows to handle multiple tasks efficiently without blocking execution.

// V8 : taken out from chrome,open source javascript,compile js to native machine.

// V8 is written in c++ for speed

// Libuv : 1: Multi-platform support library for node.js
// 2: Handle asynchronous operation.
// 3 :manage fs,networking,timers

// Express

// its framework of nodejs.

// mongoose

// mongoose is an object data modeling
// provide a schema-based solution to model application data.

// REST APIs

// 1. it a medium to communication between client and server using HTTP.
// 2. they are mainly identified by a url.
// 3. they use standard https method like GET,POST,PUT,and DELETE.
// 4. data exchange in format like json or xml.

// HTTP Method :

// GET     : To get resource.
// HEAD    : to get headers(no message body)
// OPTIONS : which operation are available
// TRACE   : loopback test(help in debugging)
// DELETE  : remove a resource
// PUT     : replace a resource similar like editing (replace the entire object)
// POST    : to add
// PATCH   : replace the particular part

// HTTP STATUS CODE

// 100 : Informational
// 200 : Success
// 300 : Redirection
// 400 : Client Error
// 500 : Server Error

// 100 Continue
// 102 Processing
// 200 Ok
// 201 Created
// 202 Accepted
// 307 Temporary redirect
// 308 Permanent redirect
// 400 Bad request
// 401 Unauthorized
// 402 Payment required
// 404 Not found
// 500 Internal server error
// 504 Gateway time out

// Cookies

// A cookie is a small piece of data stored in the user's browser.

// Sessions

// It stores user data on the server. The browser usually stores only a session ID in a cookie.

// JWT is a bearer token (whoever give the token, i will share the data)

// Access Token = 1. its a short lived.
// 2."Entry pass" to access protected resources.
// Refresh Token = 1. its a long lived.
// 2 . "Pass renewal card" that lets you obtain a new entry pass without logging in again.

// Aggregation Pipeline: A powerful tool in MongoDB for processing and transforming document data.

//or

// Aggregation Pipeline in MongoDB means processing data step-by-step using multiple stages to get the required result.

// lookup : It is used to join two collections in mongodb.
//addFields : It is used to add new fields to the documents in the aggregation pipeline.

// match : It is used to filter documents based on specified criteria in the aggregation pipeline.

//mongooseAggregatePaginate : Not to show all data at once, it is used to show data in pages, like 10 data per page, 20 data per page, etc.

// MERN Stack is a popular full-stack JavaScript technology stack used to build web applications.

// M – MongoDB → Database to store data.
// E – Express.js → Backend web framework for Node.js.
// R – React.js → Frontend library for building user interfaces.
// N – Node.js → Runtime environment that runs JavaScript on the server.

// why choose the mernstack for your project?

// I choose MERN because it allows me to use JavaScript across the full stack, provides a fast development process, and offers good scalability and flexibility for modern web applications.

// what is mongodb and why is it used in the mernstack?

// "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It is used in the MERN stack because it works well with JavaScript, integrates easily with Node.js and Express, and provides flexibility and scalability for modern web applications.


// explain the purpose of mongoose in a mern application

// "Mongoose is an ODM library used to connect Node.js and Express applications with MongoDB. It allows us to define schemas, validate data, and perform database operations easily. It makes working with MongoDB more structured and manageable in a MERN application."

// what is express.js and why is it used in the mernstack

//"Express.js is a lightweight and flexible backend framework of Node.js. In the MERN stack, it is used to create APIs, handle HTTP requests, manage routes and middleware, and connect the frontend with the database. It helps us build the backend of the application efficiently."

//what is nodejs and why is it used in the mernstack

//"Node.js is a JavaScript runtime environment used to run JavaScript on the server side. In the MERN stack, it is used to build the backend, handle server-side logic and API requests, and communicate with databases. It also allows developers to use JavaScript throughout the entire application, both frontend and backend."

//advantage of using mongodb

//"The main advantages of MongoDB are its flexible schema, scalability, high performance, and JSON-like document structure. It integrates easily with Node.js and JavaScript, which makes it a good choice for MERN stack applications."

//Difference Between SQL and NoSQL
// SQL	NoSQL
// Stands for Structured Query Language	Means Not Only SQL
// Stores data in tables and rows	Stores data in documents, key-value pairs, graphs, or columns
// Uses a fixed/structured schema	Uses a flexible schema
// Uses SQL queries	Uses database-specific query methods
// Good for complex relationships	Good for flexible and rapidly changing data
// Commonly uses vertical scaling	Commonly supports horizontal scaling

// Cluster mode in Node.js allows an application to create multiple worker processes, enabling the application to utilize multiple CPU cores.

//Worker Threads are a Node.js feature that allows JavaScript code to run in parallel on separate threads. They are mainly used for CPU-intensive operations so that the main event loop remains free to handle other asynchronous tasks and requests.

// To improve scalability in a Node.js application, the goal is to make the application handle more users and more requests without a major drop in performance.


// To improve scalability in Node.js, we can use clustering and horizontal scaling to utilize multiple CPU cores and servers, load balancing to distribute traffic, caching to reduce database load, database optimization, asynchronous processing with queues, worker threads for CPU-intensive tasks, stateless architecture, and CDN for static content. We should also monitor performance metrics to identify bottlenecks.
