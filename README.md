###### GitHubMondaySync

Este aplicativo integra o GitHub com o Monday.com, permitindo que tarefas sejam automaticamente criadas no Monday.com sempre que um pull request for aberto no GitHub.

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

- No diretório config, edite o arquivo config.js com as informações necessárias:

~~~JSON
module.exports = {
    MONDAY_BOARD_ID: 'ID_DO_QUADRO_NO_MONDAY',
    MONDAY_AUTH_TOKEN: 'SEU_TOKEN_DO_MONDAY'
};
~~~

  No mesmo diretório, edite o arquivo configDataTask para personalizar as informações das tarefas que serão criadas, exemplo:

~~~JSON
[
    { "columnId": "project_status", "newValue": "Nova tarefa" },
    { "columnId": "priority_1", "newValue": "Baixa" },
    { "columnId": "texto", "newValue": "Backend" }
]
~~~

### Uso

Após configurar a integração, sempre que um pull request for aberto no GitHub, uma tarefa será automaticamente criada no Monday.com com as informações configuradas.

### Personalização

Você pode personalizar as informações das tarefas editando o arquivo configDataTask de acordo com suas necessidades.

### Suporte

Se você tiver algum problema ou precisar de suporte, sinta-se à vontade para abrir uma issue neste repositório.

### Contribuições

Contribuições são bem-vindas! Se você deseja melhorar este aplicativo, sinta-se à vontade para enviar um pull request.

### Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.