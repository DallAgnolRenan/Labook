Projeto Labook
O Labook é uma rede social desenvolvida em NodeJS, Typescript e Express, que tem como objetivo promover a interação entre usuários, permitindo a criação, edição, exclusão, curtidas e descurtidas em publicações. O projeto também implementa conceitos de segurança, como autenticação e autorização, utilizando tokens JWT.

Conteúdos Abordados
NodeJS
Typescript
Express
SQL e SQLite
Knex
POO (Programação Orientada a Objetos)
Arquitetura em Camadas
Geração de UUID
Geração de Hashes (Bcrypt)
Autenticação e Autorização
Roteamento com Express
Postman
Banco de Dados
Estrutura do Banco de Dados
O modelo do banco de dados pode ser visualizado aqui.

Lista de Requisitos
Documentação Postman
É obrigatória a documentação no Postman de todos os endpoints para correção.

Endpoints
Signup (Cadastro)

Método: POST
Endpoint: /users/signup
Body:
json
Copy code
{
  "name": "Beltrana",
  "email": "beltrana@email.com",
  "password": "beltrana00"
}
Response:
json
Copy code
{
  "token": "um token jwt"
}
Login

Método: POST
Endpoint: /users/login
Body:
json
Copy code
{
  "email": "beltrana@email.com",
  "password": "beltrana00"
}
Response:
json
Copy code
{
  "token": "um token jwt"
}
Create Post

Método: POST
Endpoint: /posts
Headers: Authorization: "token jwt"
Body:
json
Copy code
{
  "content": "Partiu happy hour!"
}
Response: Status 201 CREATED
Get Posts

Método: GET
Endpoint: /posts
Headers: Authorization: "token jwt"
Response:
json
Copy code
[
  {
    "id": "uma uuid v4",
    "content": "Hoje vou estudar POO!",
    "likes": 2,
    "dislikes": 1,
    "createdAt": "2023-01-20T12:11:47:000Z",
    "updatedAt": "2023-01-20T12:11:47:000Z",
    "creator": {
      "id": "uma uuid v4",
      "name": "Fulano"
    }
  },
  {
    "id": "uma uuid v4",
    "content": "kkkkkkkkkrying",
    "likes": 0,
    "dislikes": 0,
    "createdAt": "2023-01-20T15:41:12:000Z",
    "updatedAt": "2023-01-20T15:49:55:000Z",
    "creator": {
      "id": "uma uuid v4",
      "name": "Ciclana"
    }
  }
]
Edit Post

Método: PUT
Endpoint: /posts/:id
Headers: Authorization: "token jwt"
Body:
json
Copy code
{
  "content": "Partiu happy hour lá no point de sempre!"
}
Response: Status 200 OK
Delete Post

Método: DELETE
Endpoint: /posts/:id
Headers: Authorization: "token jwt"
Response: Status 200 OK
Like or Dislike Post

Método: PUT
Endpoint: /posts/:id/like
Headers: Authorization: "token jwt"
Body:
json
Copy code
{
  "like": true
}
Response: Status 200 OK
ou

Método: PUT
Endpoint: /posts/:id/like
Headers: Authorization: "token jwt"
Body:
json
Copy code
{
  "like": false
}
Response: Status 200 OK
Autenticação e Autorização
Identificação UUID
Senhas hasheadas com Bcrypt
Tokens JWT
Código
Programação Orientada a Objetos (POO)
Arquitetura em Camadas
Roteadores no Express
Token Payload e User Roles
typescript
Copy code
export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export interface TokenPayload {
  id: string,
  name: string,
  role: USER_ROLES
}
Exemplos de Requisição
Signup
Request:

json
Copy code
// POST /users/signup
// Body JSON
{
  "name": "Beltrana",




