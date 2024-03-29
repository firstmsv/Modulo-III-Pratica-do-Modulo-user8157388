Códificação
----------------------------
Index.js
-----------------------


//BIBLIOTECAS/MODULOS UTILIZADOS
const database = require("./db/db");
const express = require("express");
const app = express();
const hand = require("express-handlebars");
//MODELS
const Filme = require("./models/Filme");
const FilmeRoutes = require("./routes/routesFilme");
//CONTROLLERS
const FilmesControllers = require("./controllers/ControllerFilme");
//UTILIZAÇÃO DO HANDLEBARS
app.engine("handlebars", hand.engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({extended: true,}));
app.use(express.json());
app.use(express.static("public"));

//ROTAS
app.use("/", FilmeRoutes);

//SINCRONISMO COM O BANCO DE DADOS
try {
    database.sync().then(() => {
    app.listen(9443,() => { console.log('Servidor rodando') });
    })
}
catch(erro) {
    console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};

pasta controllers
controllerFilme.js

const Filme = require("../models/Filme");
 module.exports = class FilmeController {

  static cadastrarFilme(req,res) {
   res.render("filmes/Cadastrar");
  }

  static async FilmeCreate(req,res) {

    const filme = {
      titulo: req.body.titulo,
      categoria: req.body.categoria,
      genero: req.body.genero,
      link_sinopse: req.body.link_sinopse
    }

    await Filme.create(filme);
    res.send("Cadastro realizado com sucesso!");
    res.redirect("/");

  }
   //LISTAR Filmes
 static async listarfilmes(req,res) {

    const filme = await Filme.findAll({ raw:true })

    res.render("filmes/listar", {filme});
  }
//UPDATE
 static async UpdateFilme(req,res) {

    const id_filme = req.params.id_filme;

    const filme = await Filme.findOne({where: {id_filme: id_filme}, raw : true})

    res.render("filmes/update", {filme})
    
  }

  static async FilmeUpdate(req, res) {

    const id_filme = req.body.id_filme

    const filme = {
      titulo: req.body.titulo,
      categoria: req.body.categoria,
      genero: req.body.genero,
      link_sinopse: req.body.link_sinopse
    }

    await Filme.update(filme, { where: { id_filme:id_filme }})

    res.redirect("/")

  }

 static async removerFilme(req,res) {

    const id_filme = req.body.id_filme;

    await Filme.destroy({ where: { id_filme: id_filme }})

    res.redirect("/")
  }
}

-----------------------
pasta db
db.js
---------------------


// BIBLIOTECAS/MODULOS UTILIZADOS
const Sequelize = require('sequelize');
//CRIANDO A CONFIGURAÇÃO DO BANCO DE DADOS
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './filme.sqlite'
})
//TRATANDO POSSÍVEIS ERROS E AUTENTICANDO NO BANCO
try {
  sequelize.authenticate();
  console.log("Banco de dados conectado com sucesso!");
} 
catch (erro) {
  console.log("Erro ao conectar ao banco",erro);
}
module.exports = sequelize;


-----------------------
pasta models
Filme.js
---------------------

const Sequelize = require('sequelize');
const database = require('../db/db');
 
const Filme = database.define('filme', {
  id_filme: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  titulo:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: false
  },
  link_sinopse:{
    type: Sequelize.STRING
  }
}, {database,modelname:'filme',tableName: 'filmes'})
module.exports = Filme;


------------------
pasta routes
routesFilme.js
----------------
const express = require("express");
const ControllerFilme = require("../controllers/ControllerFilme");
const router = express.Router();

router.get("/Cadastrar", ControllerFilme.cadastrarFilme);

router.post("/Cadastrar", ControllerFilme.FilmeCreate);

router.get("/", ControllerFilme.listarfilmes);

router.get("/update/:id_filme", ControllerFilme.UpdateFilme);

router.post("/update", ControllerFilme.FilmeUpdate);

router.post("/remover", ControllerFilme.removerFilme);

module.exports = router;


------------------
pasta views/layouts
main.js
----------------


<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     {{! BOOSTRAP 5 }}
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
{{!-- ARQUIVOS LOCAL --}}
    <link rel="stylesheet" href="css/styles.css" />
    <title>Sistema de Cadastro de Videos</title>
  </head>
  <body id="body-mobile">
    <nav class="navbar text-bg-dark">
      <div class="container">
        <span class="navbar-brand text-white">Sistema de Filmes</span>
        <ul class="navbar nav">
          <li class="nav-item">
          </li>          
          <li class="nav-item">
            <a class="nav-link text-white" href="/">Listar Filmes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="/Cadastrar">Cadastrar</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      {{{body}}}
    </div>
  </body>
</html>

-----------------------
pasta views/filmes
Cadastrar.handlebars
---------------------

<h1 class="text-center my-3">Cadastro de filmes</h1>
<form action="/Cadastrar" method="post">
  <div class="row w-50 d-block m-auto g-3">
    <div class="col-12">
      <label class="form-label" for="titulo">Titulo:</label>
      <input
        class="form-control"
        type="titulo"
        name="titulo"
        id="titulo"
        placeholder="Digite o título do filme"
      />
    </div>
    <div class="col-12">
      <label class="form-label" for="categoria">Categoria:</label>
      <input
        class="form-control"
        type="categoria"
        name="categoria"
        id="categoria"
        placeholder="Digite a categoria do filme."
      />
    </div>
    <div class="col-12">
      <label class="form-label" for="genero">Genero:</label>
      <input
        class="form-control"
        type="genero"
        name="genero"
        id="genero"
        placeholder="Digite o genero do filme"
      />
    </div>
        <div class="col-12">
      <label class="form-label" for="link_sinopse">Link:</label>
      <input
        class="form-control"
        name="link_sinopse"
        id="link_sinopse"
        placeholder="Link da sinopse do filme"
      />
    </div>
    <div>
      <input class="btn btn-primary my-3" type="submit" value="Cadastrar filme" />
    </div>
  </div>
</form>

-----------------------
pasta views/filmes
listar.handlebars
---------------------


<h1 class="text-center my-3">Lista de Todos os filmes Preferidos</h1>
<table class="table">
  <div class="row">
    <div class="col-12">
      <thead>
        <th>Código do filme</th>
        <th>Título</th>
        <th>Categoria</th>
        <th>Genero</th>
        <th>link para visualizar</th>
      </thead>
      <tbody>
        {{#each filme}}
          <tr>
            <th>{{this.id_filme}}</th>
            <th>{{this.titulo}}</th>
            <th>{{this.categoria}}</th>
            <th>{{this.genero}}</th>
            <th><a href="{{this.link_sinopse}}">Visualizar Sinopse<i class="bi bi-pencil-square"></i></a></th>
            <th><a href="/update/{{this.id_filme}}">Editar<i class="bi bi-pencil-square"></i></a></th>

            <th> <form class="borde-0 m-0" action="/remover" method="POST">
                <input type="hidden" name="id_filme" value={{this.id_filme}}>
              <input type="submit" value="Excluir" name="Excluir"/>
                
              </form></th>
            
          </tr>
        {{/each}}
      </tbody>
    </div>
  </div>
</table>

-----------------------
pasta views/filmes
update.handlebars
---------------------

<h1 class="text-center my-3">Atualizar Video: {{filme.titulo}}</h1>
<form action="/update" method="POST">
  <input type="hidden" name="id_filme" value="{{filme.id_filme}}" />
  <div class="row w-50 d-block m-auto g-3">
    <div class="col-12">
      <label class="form-label" for="titulo">Titulo:</label>
      <input
        class="form-control"
        type="titulo"
        name="titulo"
        id="titulo"
        value="{{filme.titulo}}"
      />
    </div>
    <div class="col-12">
      <label class="form-label" for="autor">Categoria:</label>
      <input
        class="form-control"
        type="categoria"
        name="categoria"
        id="categoria"
        value="{{filme.categoria}}"
      />
    </div>

    <div class="col-12">
      <label class="form-label" for="genero">Genero:</label>
      <input
        class="form-control"
        type="genero"
        name="genero"
        id="genero"
        value="{{filme.genero}}"
      />
    </div>
    <div class="col-12">
    
    <div class="col-12">
      <label class="form-label" for="link_sinopse">Link da sinopse do filme:</label>
      <input
        class="form-control"
        type="link_sinopse"
        name="link_sinopse"
        id="link_sinopse"
        value="{{filme.link_sinopse}}"
      />
    </div>
    <div>
      <input class="btn btn-primary my-3" type="submit" value="Atualizar filme" />
    </div>
  </div>
</form>
