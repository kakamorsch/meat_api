"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_routers_1 = require("./users/users.routers");
const server = new server_1.Server();
server
    .bootstrap([users_routers_1.usersRouter])
    .then((server) => {
    console.log("Server started successfully, access it at: ", server.application.address());
})
    .catch((error) => {
    console.log("The server couldn't be started");
    console.error(error);
    process.exit(1);
});
