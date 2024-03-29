const express = require("express");
const ControllerFilme = require("../controllers/ControllerFilme");
const router = express.Router();

router.get("/Cadastrar", ControllerFilme.cadastrarFilme);
router.post("/Cadastrar", ControllerFilme.FilmeCreate);

router.get("/", ControllerFilme.listarFilmes);

router.get("/update/:id_filme", ControllerFilme.UpdateFilme);
router.post("/update", ControllerFilme.FilmeUpdate);

router.post("/remover", ControllerFilme.removerFilme);

module.exports = router;
