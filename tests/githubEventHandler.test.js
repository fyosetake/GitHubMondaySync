const { createAndHandleTasks } = require('../src/githubEventHandler');
const { createTaskMondayReviewPullRequest, updateTaskMondayReviewPullRequest, updateTaskMondayColumns } = require('../src/apiMondayHandler');

jest.mock('../src/apiMondayHandler', () => ({
    createTaskMondayReviewPullRequest: jest.fn(),
    updateTaskMondayReviewPullRequest: jest.fn(),
    updateTaskMondayColumns: jest.fn()
}));

describe('createAndHandleTasks', () => {
    test('cria tarefa e atualiza no Monday', async () => {
        const eventData = {
            action: 'opened',
            repository: {
                html_url: 'http://github.com/repo'
            },
            pull_request: {
                html_url: 'http://github.com/pr'
            }
        };

        const createTaskResponse = {
            data: {
                create_item: {
                    id: 'mocked-item-id'
                }
            }
        };

        const originalUpdateTaskMondayColumns = require('../src/apiMondayHandler').updateTaskMondayColumns;
        originalUpdateTaskMondayColumns.mockResolvedValue({});

        createTaskMondayReviewPullRequest.mockResolvedValue(createTaskResponse);
        updateTaskMondayReviewPullRequest.mockResolvedValue({});
        updateTaskMondayColumns.mockReturnValue({});

        await createAndHandleTasks(eventData);

        expect(createTaskMondayReviewPullRequest).toHaveBeenCalledWith(eventData);
        expect(updateTaskMondayReviewPullRequest).toHaveBeenCalledWith(createTaskResponse.data.create_item.id, eventData.pull_request.html_url);
        expect(originalUpdateTaskMondayColumns).toHaveBeenCalledWith(
            createTaskResponse.data.create_item.id,
            expect.anything(),
            expect.anything()
        );
    });
});
