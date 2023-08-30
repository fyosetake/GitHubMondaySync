const { createTaskMondayReviewPullRequest, updateTaskMondayReviewPullRequest } = require('./monday');

async function createAndHandleTasks(eventData) {
    let mondayResponse;
    let htmlUrlGitHubPr = eventData.repository.html_url;

    if (eventData.action === 'opened' && eventData.repository) {
        try {
            mondayResponse = await createTaskMondayReviewPullRequest(eventData);
            console.log('Tarefa criada no Monday.com:', mondayResponse);
        } catch (error) {
            console.error('Erro ao conectar com o Monday.com para criar tarefa:', error.message);
            throw error;
        }
    }

    if (mondayResponse && htmlUrlGitHubPr) {
        const itemId = mondayResponse.data.create_item.id;

        try {
            const taskUpdate = await updateTaskMondayReviewPullRequest(itemId, htmlUrlGitHubPr);
            console.log('Update criado no Monday.com:', taskUpdate);
        } catch (error) {
            console.error('Erro ao conectar com o Monday.com para inserir update:', error.message);
            throw error;
        }
    }
}

function startWebhookServer(app, port) {
    app.post('/github-webhook-pull-request', async (req, res) => {
        const eventData = req.body;

        try {
            await createAndHandleTasks(eventData);
        } catch (error) {
            console.error('Erro durante o processamento:', error.message);
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
