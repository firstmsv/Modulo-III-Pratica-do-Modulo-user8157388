const express = require("express");
const database = require("./db/db");
const Filme = require("./models/Filme");
const FilmeRouters = require("./routers/routersFilmes");
const hand = require("express-handlebars");

//CONTROLLER
const FilmeController = require("./controllers/ControllerFilme");
const app = express(); // Movido para cá

app.engine("handlebars", hand.engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//ROTAS
app.use("/", FilmeRouters);

//SINCRONISMO COM O BANCO DE DADOS
database
  .sync()
  .then(() => {
    app.listen(9443, () => {
      console.log("Servidor rodando na porta 9443");
    });
  })
  .catch((error) => {
    console.error(
      "Houve uma falha ao sincronizar com o banco de dados:",
      error,
    );
  });
