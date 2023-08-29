const { createTaskMondayReviewPullRequest } = require('./monday'); // Importa a função de interações com o Monday.com

function startWebhookServer(app, port) {
  app.post('/github-webhook-pull-request', async (req, res) => {
    const eventData = req.body;

    if (eventData.action === 'opened' && eventData.repository) {
      try {
        const mondayResponse = await createTaskMondayReviewPullRequest(eventData);

        console.log('Tarefa criada no Monday.com:', mondayResponse);
      } catch (error) {
        console.error('Erro ao conectar com o Monday.com:', error.message);
      }
    }

    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

module.exports = {
  startWebhookServer
};