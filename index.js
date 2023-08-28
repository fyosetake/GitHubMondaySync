const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const { MONDAY_BOARD_ID, MONDAY_AUTH_TOKEN } = require('./config');

// Função para criar uma tarefa no Monday.com para revisão do Pull Request aberto no GitHub
async function createTaskMondayReviewPullRequest(eventData) {
  const repository = eventData.repository.full_name;
  const number = eventData.number;

  let query = 'mutation{ create_item (board_id:' + MONDAY_BOARD_ID + ', item_name:"Revisar Pull Request - ' + repository + '#' + number + '") { id } }';

  try {
    const response = await axios.post("https://api.monday.com/v2", { query: query }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MONDAY_AUTH_TOKEN // Token criado no Monday
      }
    });

    console.log(JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao criar a tarefa no Monday.com:', error);
    return false;
  }
}

// Rota para receber o webhook do GitHub
app.post('/github-webhook-pull-request', async (req, res) => {
  const eventData = req.body;

  if (eventData.action === 'opened' && eventData.repository) {
    try {
      const mondayResponse = await createTaskMondayReviewPullRequest(eventData);

      if (mondayResponse) {
        console.log('Tarefa criada no Monday.com');
      }
    } catch (error) {
      console.error('Erro ao conectar com o Monday.com:', error.message);
    }
  }

  res.sendStatus(200);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
