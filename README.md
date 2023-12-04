# Projeto Labook

O Labook é uma rede social que tem como objetivo promover a interação entre usuários, permitindo a criação, edição, exclusão, visualização, curtidas e descurtidas em publicações.<br>

## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman

# Banco de dados

![projeto-labook (2)](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

## Documentação Postman

https://documenter.getpostman.com/view/28314331/2s9YeK5WC6

## Instruções de Instalação

1. Clone o repositório.
2. No gerenciador de pacotes NPM, execute:

  ```sh
  npm i
  ```
  
3. Crie seu arquivo `file-name.db` na pasta `database`.
4. Abra o arquivo `labook.sql` e execute os comandos de criação de tabelas.
5. Crie um arquivo chamado `.env` na raiz do projeto para armazenar as variáveis de ambiente listadas abaixo.

  ```sh
  
  #Express Port
  PORT=3003
  #SQLite database file path
  DB_FILE_PATH=./src/database/file-name.db
  #Credentials and secret keys
  JWT_KEY=chose-a-secret-key
  #Token expiration time (exemple: 1 day)
  JWT_EXPIRES_IN=1d
  ```
  
6. Inicie o servidor.
  
  ```sh
  npm run dev
  ```

# Lista de requisitos

- Endpoints

  - [ ] signup
  - [ ] login
  - [ ] create post
  - [ ] get post
  - [ ] edit post
  - [ ] delete post
  - [ ] like / dislike post

- Autenticação e autorização

  - [ ] identificação UUID
  - [ ] senhas hasheadas com Bcrypt
  - [ ] tokens JWT

- Código
  - [ ] POO
  - [ ] Arquitetura em camadas
  - [ ] Roteadores no Express

## Signup

Endpoint público utilizado para cadastro. Devolve um token jwt.

```typescript
// request POST /users/signup
// body JSON
 {
        "name": "Romp",
        "password": "1234",
        "email": "romp@gmail.com"
  }

// response
// status 201 CREATED
{
  token: "um token jwt"
}
```

## Login

Endpoint público utilizado para login. Devolve um token jwt.

```typescript
// request POST /users/login
// body JSON
{
  "email": "romp1@gmail.com",
  "password": "1234"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
```

## Create post

Endpoint protegido, requer um token jwt para acessá-lo.

```typescript
// request POST /posts
// headers.authorization = "token jwt"
// body JSON
{
    "content": "A vida nao é em preto e branco romp"
}

// response
// status 201 CREATED
```

## Get posts

Endpoint protegido, requer um token jwt para acessá-lo.

```typescript
// request GET /posts
// headers.authorization = "token jwt"

// response
// status 200 OK
;[
  {
    id: "ea740c08-3d26-4399-90db-e019cb02bc95",
    content: "A vida nao é em preto e branco romp",
    likes: 0,
    dislikes: 1,
    createdAt: "2023-12-03T03:08:17.348Z",
    updatedAt: "2023-12-03T03:08:17.348Z",
    creator: {
      creatorId: "f27ad6ce-10f0-4d76-ac19-c8b43412ce41",
      creatorName: "Romp",
    },
  },
]
```

## Edit post

Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado.

```typescript
// request PUT /posts/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "O amanhã é uma esperança, nunca uma promessa "
}

// response
// status 200 OK
```

## Delete post

Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa.

```typescript
// request DELETE /posts/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
```

## Like or dislike post (mesmo endpoint faz as duas coisas)

### Like (funcionalidade 1)

```typescript
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

### Dislike (funcionalidade 2)

```typescript
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```
