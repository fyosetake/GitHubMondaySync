const axios = require('axios');
const { MONDAY_BOARD_ID, MONDAY_AUTH_TOKEN } = require('../config/config');

async function createTaskMondayReviewPullRequest(eventData) {
    const repository = eventData.repository.full_name;
    const number = eventData.number;

    let query = 'mutation{ create_item (board_id:' + MONDAY_BOARD_ID + ', item_name:"Revisar Pull Request - ' + repository + '#' + number + '") { id } }';

    try {
        const response = await axios.post(
        "https://api.monday.com/v2", 
            { 
                query: query 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': MONDAY_AUTH_TOKEN
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error('Erro ao criar a tarefa no Monday.com: ' + error.message);
    }
}

async function updateTaskMondayReviewPullRequest(itemId, htmlUrlGitHubPr) {
    let query = 'mutation {create_update (item_id: ' + itemId + ', body: "' + htmlUrlGitHubPr + '") { id }}';

    try {
        const response = await axios.post(
        "https://api.monday.com/v2",
            {
                query: query
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': MONDAY_AUTH_TOKEN
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error('Erro ao inserir update na tarefa no Monday.com: ' + error.message);
    }
}

module.exports = {
    createTaskMondayReviewPullRequest, updateTaskMondayReviewPullRequest
};