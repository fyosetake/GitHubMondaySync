const { createAndHandleTasks } = require('./githubEventHandler');

function startWebhookServer(app, port) {
    app.post('/github-webhook-pull-request', async (req, res) => {
        const eventData = req.body;

        try {
            await createAndHandleTasks(eventData);
        } catch (error) {
            throw new Error('Erro durante o processamento:', error.message);
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
