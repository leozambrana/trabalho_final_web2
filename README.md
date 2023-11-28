This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
npm run dev


### Backend

# Docker

`docker build -t mongodb-app .`

`docker run -p 27017:27017 --name mongodb-app mongodb-app`

# Connection no compass

`mongodb://admin:admin123@localhost:27017/?authSource=admin&authMechanism=SCRAM-SHA-256`

Template de artigo:
*Nota - Não precisa enviar o ID
```
{
        "kb_title": "bengos Article",
        "kb_body": "This is a sample article body.",
        "kb_permalink": "sample-article",
        "kb_keywords": "sample, article",
        "kb_liked_count": 0,
        "kb_published": true,
        "kb_suggestion": false,
        "kb_featured": true,
        "kb_author_email": "sample@example.com",
        "kb_published_date": "2023-11-28T22:21:10.262Z"
}
```
# API

## 1. Login
* Endpoint: POST /login
* Descrição: Realiza a autenticação do usuário e cria uma sessão.

## 2. Usuários
2.1 Listar Todos os Usuários
* Endpoint: GET /users
* Descrição: Retorna uma lista de todos os usuários.

2.2 Obter Detalhes de um Usuário
* Endpoint: GET /users/:id
* Descrição: Retorna detalhes de um usuário específico com base no ID.

2.3 Criar Novo Usuário
* Endpoint: POST /users
* Descrição: Cria um novo usuário.

2.4 Atualizar Informações de um Usuário
* Endpoint: PUT /users/:id
* Descrição: Atualiza as informações de um usuário existente com base no ID.

2.5 Excluir Usuário
* Endpoint: DELETE /users/:id
* Descrição: Exclui um usuário com base no ID.

## 3. Artigos
3.1 Listar Todos os Artigos
* Endpoint: GET /articles
* Descrição: Retorna uma lista de todos os artigos.

3.2 Obter Detalhes de um Artigo
* Endpoint: GET /articles/:id
* Descrição: Retorna detalhes de um artigo específico com base no ID.

3.3 Criar Novo Artigo
* Endpoint: POST /articles
* Descrição: Cria um novo artigo.

3.4 Atualizar Informações de um Artigo
* Endpoint: PUT /articles/:id
* Descrição: Atualiza as informações de um artigo existente com base no ID.

3.5 Excluir Artigo
* Endpoint: DELETE /articles/:id
* Descrição: Exclui um artigo com base no ID.

3.6 Curtir um Artigo
* Endpoint: POST /articles/:id/like
* Descrição: Incrementa o contador de curtidas de um artigo com base no ID.
