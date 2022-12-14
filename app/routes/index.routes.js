module.exports = (app) => {
  const user = require("../controllers/users.controller.js");
  const session = require("../controllers/auth.controller.js");
  const game = require("../controllers/games.controller.js");
  const console = require("../controllers/console.controller.js");
  const isAuthenticated = require("../middlewares/isAuthenticated.js");
  
  var router = require("express").Router();

  // Auth
  router.post("/login", session.auth);

  // Users Crud
  router.post("/users", user.create);
  router.get("/users", isAuthenticated, user.readAll);
  router.get("/users/:id", user.readById);
  router.put("/users/:id", user.update);
  router.delete("/users/:id", user.delete);

  // Games Crud
  router.post("/games", game.create);
  router.get("/games", isAuthenticated, game.readAll);
  router.get("/games/:id", game.readById);
  router.get("/games/find/title", game.readByTitle);
  router.get("/games/find/developer", game.readByDeveloper);
  router.get("/games/find/genre", game.readByGenre);
  router.put("/games/:id", game.update);
  router.delete("/games/:id", game.delete);
  router.get('/games/find/autocomplete', game.autoComplete);

  // Game Review
  router.post("/games/review", isAuthenticated, game.review);

  // Consoles Routes
  router.get("/consoles", isAuthenticated, console.readAll);
  router.get("/consoles/:id", console.readById);
  router.get("/consoles/find/name", console.readByName);
  router.get("/consoles/topGames/:id", console.getTopGames);

  app.use("/api", router);
};
