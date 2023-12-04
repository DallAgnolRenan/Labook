# Projeto Labook

O Labook é uma rede social que tem como objetivo promover a interação entre usuários, permitindo a criação, edição, exclusão, curtidas e descurtidas em publicações..<br>

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

## Métodos

Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro ou acesso a Login. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |

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

Endpoint protegido, requer um token jwt para acessá-lo.<br>
Quem criou o post não pode dar like ou dislike no mesmo.<br><br>
Caso dê um like em um post que já tenha dado like, o like é desfeito.<br>
Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.<br><br>
Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.<br>
Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.

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

### Para entender a tabela likes_dislikes

- no SQLite, lógicas booleanas devem ser controladas via 0 e 1 (INTEGER)
- quando like valer 1 na tabela é porque a pessoa deu like no post
  - na requisição like é true
- quando like valor 0 na tabela é porque a pessoa deu dislike no post
  - na requisição like é false
- caso não exista um registro na tabela de relação, é porque a pessoa não deu like nem dislike
- caso dê like em um post que já tenha dado like, o like é removido (deleta o item da tabela)
- caso dê dislike em um post que já tenha dado dislike, o dislike é removido (deleta o item da tabela)

## Documentação Postman

https://documenter.getpostman.com/view/28314331/2s9YeK5WC6
