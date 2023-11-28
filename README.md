This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   t r a b a l h o * f i n a l * w e b 2 
 
 

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
