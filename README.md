# GitHubMondaySync

Este aplicativo integra o GitHub com o Monday.com, permitindo que tarefas sejam automaticamente criadas no Monday.com sempre que um pull request for aberto no GitHub. A aplicação está desenvolvida em Node.js.

### Configuração

Antes de começar, siga estas etapas para configurar a integração:

Configuração no GitHub:

- Abra o seu repositório no GitHub.

- Navegue até as configurações do repositório.

- No menu à esquerda, clique em "Webhooks".

- Clique no botão "Adicionar webhook".

- Em "Payload URL", insira a URL do webhook do projeto:

```https://seu-app.com/github-webhook-pull-request```

  Configure as opções de segurança e selecione os eventos de Pull Request.

- Clique em "Adicionar webhook" para salvar as configurações.

### Configuração no Monday.com:

- Acesse a sua conta no Monday.com.

- Anote o ID do quadro do Monday.com onde deseja criar tarefas.

- No diretório config, edite o arquivo ```config.js``` com as informações necessárias:

~~~Javascript
module.exports = {
    MONDAY_BOARD_ID: 'ID_DO_QUADRO_NO_MONDAY',
    MONDAY_AUTH_TOKEN: 'SEU_TOKEN_DO_MONDAY'
};
~~~

  No mesmo diretório, edite o arquivo ```configDataTask.json``` para personalizar as informações das tarefas que serão criadas, exemplo:

~~~JSON
[
    { "columnId": "project_status", "newValue": "Nova tarefa" },
    { "columnId": "priority_1", "newValue": "Baixa" },
    { "columnId": "texto", "newValue": "Backend" }
]
~~~

### Comando curl

Você pode usar o seguinte comando curl para fazer chamadas à API do Monday.com e obter os valores de ```columnId``` para configuração da aplicação:

~~~Terminal
curl -X POST "https://api.monday.com/v2" \
-H "Content-Type: application/json" \
-H "Authorization: YOUR_API_TOKEN" \
-d '{"query":"{boards(ids: YOUR_BOARD_ID) {columns {id title}}}"}'
~~~

### Uso

Após configurar a integração, rode a aplicação. Para isso, basta utilizar o seguinte comando:

~~~Node
node index.js
~~~

Sempre que um pull request for aberto no GitHub, uma tarefa será automaticamente criada no Monday.com com as informações configuradas.

### Suporte

Se você tiver algum problema ou precisar de suporte, sinta-se à vontade para abrir uma issue neste repositório.

### Contribuições

Contribuições são bem-vindas! Se você deseja melhorar este aplicativo, sinta-se à vontade para enviar um pull request.

### Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.