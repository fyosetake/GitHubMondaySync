const axios = require('axios');
const { createTaskMondayReviewPullRequest, updateTaskMondayReviewPullRequest } = require('../src/apiMondayHandler');

jest.mock('axios');

describe('createTaskMondayReviewPullRequest', () => {
    test('Deve criar uma tarefa no Monday.com', async () => {
        const eventData = {
            repository: {
                full_name: 'fyosetake/teste',
            },
            number: '1',
        };

        const expectedResponse = { data: { id: 'mocked-task-id' } };

        axios.post.mockResolvedValue(expectedResponse);

        const result = await createTaskMondayReviewPullRequest(eventData);

        expect(result).toEqual(expectedResponse.data);
        expect(axios.post).toHaveBeenCalledWith(
            "https://api.monday.com/v2",
            expect.anything(),
            expect.anything()
        );
    });

    test('Deve lançar um erro em caso de falha', async () => {
        const eventData = {
            repository: {
                full_name: 'fyosetake/teste',
            },
            number: '1',
        };

        const errorMessage = 'Erro simulado';

        axios.post.mockRejectedValue(new Error(errorMessage));

        await expect(createTaskMondayReviewPullRequest(eventData)).rejects.toThrowError('Erro ao criar a tarefa no Monday.com: ' + errorMessage);
    });
});

describe('updateTaskMondayReviewPullRequest', () => {
    test('Deve atualizar uma tarefa no Monday.com', async () => {
        let htmlUrlGitHubPr = 'http://localhost';
        let itemId = 1000;

        const expectedResponse = { data: { id: 'mocked-task-id' } };

        axios.post.mockResolvedValue(expectedResponse);

        const result = await updateTaskMondayReviewPullRequest(itemId, htmlUrlGitHubPr);

        expect(result).toEqual(expectedResponse.data);
        expect(axios.post).toHaveBeenCalledWith(
            "https://api.monday.com/v2",
            expect.anything(),
            expect.anything()
        );
    });

    test('Deve lançar um erro em caso de falha', async () => {
        const eventData = {
            repository: {
                full_name: 'fyosetake/teste',
            },
            number: '1',
        };

        const errorMessage = 'Erro simulado';

        axios.post.mockRejectedValue(new Error(errorMessage));

        await expect(createTaskMondayReviewPullRequest(eventData)).rejects.toThrowError('Erro ao criar a tarefa no Monday.com: ' + errorMessage);
    });
});