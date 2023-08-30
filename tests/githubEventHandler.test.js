const { createAndHandleTasks } = require('../src/githubEventHandler');
const { createTaskMondayReviewPullRequest, updateTaskMondayReviewPullRequest } = require('../src/apiMondayHandler');

jest.mock('../src/apiMondayHandler', () => ({
    createTaskMondayReviewPullRequest: jest.fn(),
    updateTaskMondayReviewPullRequest: jest.fn()
}));

describe('createAndHandleTasks', () => {
    test('cria tarefa e atualiza no Monday', async () => {
        const eventData = {
            action: 'opened',
            repository: {
                html_url: 'http://github.com/repo'
            }
        };

        const createTaskResponse = {
            data: {
                create_item: {
                    id: 'mocked-item-id'
                }
            }
        };

        createTaskMondayReviewPullRequest.mockResolvedValue(createTaskResponse);
        updateTaskMondayReviewPullRequest.mockResolvedValue({});

        await createAndHandleTasks(eventData);

        expect(createTaskMondayReviewPullRequest).toHaveBeenCalledWith(eventData);
        expect(updateTaskMondayReviewPullRequest).toHaveBeenCalledWith(createTaskResponse.data.create_item.id, eventData.repository.html_url);
    });
});
