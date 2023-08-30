const { startWebhookServer } = require('../src/webhook');
const { createAndHandleTasks } = require('../src/githubEventHandler');

jest.mock('../src/githubEventHandler', () => ({
    createAndHandleTasks: jest.fn()
}));

describe('Webhook Server', () => {
    test('Servidor inicia corretamente', async () => {
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
                },
                pull_request: {
                    html_url: 'http://localhost'
                }
            }
        };

        const mockResponse = {
            sendStatus: jest.fn()
        };

        await mockApp.post.mock.calls[0][1](mockRequest, mockResponse);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
        expect(mockApp.listen).toHaveBeenCalledWith(mockPort, expect.any(Function));

        expect(createAndHandleTasks).toHaveBeenCalledWith(mockRequest.body);
    });
});
