const hapi = require("hapi");
const routes = require("./routes");

const Server = new hapi.Server();

console.log(JSON.stringify(routes));

Server.connection({
  host: "localhost",
  port: 1337,
  routes: { cors: true },
  router: { stripTrailingSlash: true }
});

Server.route(routes);

Server.start(err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server Started at ${Server.info.uri}`);
});
