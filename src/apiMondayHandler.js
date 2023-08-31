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
    let query = 'mutation {create_update (item_id: ' + itemId + ', body: "Solicito revisão deste Pull Request: ' + htmlUrlGitHubPr + '") { id }}';

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

async function updateTaskMondayColumns(itemId, columnId, newValue) {
    let query = 'mutation {change_simple_column_value(board_id: ' + MONDAY_BOARD_ID + ', item_id: ' + itemId + ', column_id: "' + columnId + '", value: "' + newValue + '") {id}}';

    try {
        const response = await axios.post(
            'https://api.monday.com/v2',
            {
                query: query
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: MONDAY_AUTH_TOKEN,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar tarefa:', error.message);
    }
}

module.exports = {
    createTaskMondayReviewPullRequest, updateTaskMondayReviewPullRequest, updateTaskMondayColumns
};