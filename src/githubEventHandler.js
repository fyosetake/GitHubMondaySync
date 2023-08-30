const { createTaskMondayReviewPullRequest, updateTaskMondayReviewPullRequest } = require('./apiMondayHandler');

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

module.exports = {
    createAndHandleTasks
};