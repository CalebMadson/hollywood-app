const hapi = require("hapi");
const api = require("./api");

require("./models");

const Server = new hapi.Server();

Server.connection({
  host: "localhost",
  port: 1337,
  routes: { cors: true },
  router: { stripTrailingSlash: true }
});

Server.register(
  [
    {
      register: api
    }
  ],
  () => {
    Server.start(err => {
      if (err) {
        console.log(err);
      }
      console.log(`Server Started at ${Server.info.uri}`);
    });
  }
);
