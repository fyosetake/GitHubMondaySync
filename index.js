const express = require('express');
const bodyParser = require('body-parser');
const { startWebhookServer } = require('./src/webhook'); // Importa a função de inicialização do servidor
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

startWebhookServer(app, PORT); // Inicia o servidor passando a instância do Express e a porta