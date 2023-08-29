jest.mock('./monday', () => ({
    createTaskMondayReviewPullRequest: jest.fn(() => {
        return Promise.resolve({ taskId: 'mocked-task-id', success: true });
    })
}));

const { startWebhookServer } = require('../src/webhook'); // Substitua pelo caminho correto

describe('Webhook Server', () => {
    test('Servidor inciado corretamente', async () => {
        const mockApp = {
            post: jest.fn(),
            listen: jest.fn()
        };

        const mockPort = 3000;

        startWebhookServer(mockApp, mockPort);

        expect(mockApp.post).toHaveBeenCalledWith('/github-webhook-pull-request', expect.any(Function));

        const mockRequest = {
            body: {
                action: 'opened',
                repository: {
                    body: {
                        number: '1',
                        repository: {
                            full_name: 'fyosetake/teste'
                        }
                    }
                }
            }
        };

        const mockResponse = {
            sendStatus: jest.fn()
        };

        await mockApp.post.mock.calls[0][1](mockRequest, mockResponse);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
        expect(mockApp.listen).toHaveBeenCalledWith(mockPort, expect.any(Function));

        expect(require('../src/monday').createTaskMondayReviewPullRequest).toHaveBeenCalled();
    });
});
  