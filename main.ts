import { Server } from "./server/server";
import { usersRouter } from "./users/users.routers";
const server = new Server();

server
  .bootstrap([usersRouter])
  .then((server) => {
    console.log(
      "Server started successfully, access it at: ",
      server.application.address()
    );
  })
  .catch((error) => {
    console.log("The server couldn't be started");
    console.error(error);
    process.exit(1);
  });
