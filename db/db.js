//BIBLIOTECAS/MODULOS UTILIZADOS
const Sequelize = require("sequelize");
//CRIANDO A CONFIGURAÇÃO DO BANCO DE DADOS
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./filmes.sqlite",
});
//TRATANDO POSSÍVEIS ERROS E AUTENTICAÇÃO NO BANCO
sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectados com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

module.exports = sequelize;
