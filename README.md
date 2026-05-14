# 📚 Course & Modules API

API REST para gerenciamento de cursos e módulos, desenvolvida como projeto de estudo com foco em **migrations com Knex.js**, relacionamento entre tabelas e operações CRUD.

> ⚠️ Sem tratamento de erros nas rotas. Este projeto usa process.on("unhandledRejection") apenas para logar erros no console. Na prática, se uma query falhar (ex: violar uma constraint do banco), o servidor não envia resposta e a requisição trava. Isso é intencional — o foco aqui é aprender migrations e entender seu funcionamento.
---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| Node.js + TypeScript | Runtime e tipagem |
| Express | Framework HTTP |
| Knex.js | Query builder + Migrations |
| SQLite | Banco de dados |

---

## 📁 Estrutura

```
src/
├── server.ts              # Rotas e inicialização do servidor
└── database/
    ├── knex.ts            # Instância configurada do Knex
    └── migrations/
        ├── 001_create_courses.ts
        └── 002_create_course_modules.ts
knexfile.ts                # Configuração do Knex CLI
```

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18+

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/daysonmota/query-builder.git


# 2. Instalar dependências
npm install

# 3. Executar as migrations
npm run knex -- migrate:latest


# 3. Executa o script para popular no banco SQLITE
npm run knex -- seed:run


# 5. Iniciar o servidor
npm run dev
```

Servidor rodando em: `http://localhost:3333`

---

## 🗄️ Banco de Dados

### Relacionamento

```
courses               course_modules
─────────────         ──────────────────────────
id    (PK)            id         (PK)
name  NOT NULL        name       NOT NULL
                      course_id  NOT NULL  FK → courses.id
```

Um **curso** pode ter vários **módulos**. Um **módulo** obrigatoriamente pertence a um curso (`course_id NOT NULL`).

### Migrations

```bash
npx knex migrate:make <nome>   # criar nova migration
npx knex migrate:latest        # aplicar migrations pendentes
npx knex migrate:rollback      # desfazer a última migration
npx knex migrate:status        # ver status das migrations
```

---

## 📡 Endpoints

### Cursos

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/courses` | Criar um curso |
| `GET` | `/courses` | Listar todos os cursos |
| `GET` | `/courses/:id` | Buscar curso por ID |
| `PUT` | `/courses/:id` | Atualizar nome do curso |
| `DELETE` | `/courses/:id` | Deletar curso |

### Módulos

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/modules` | Criar módulo informando `course_id` |
| `GET` | `/modules` | Listar todos os módulos |
| `POST` | `/courses/:id/modules` | Criar módulo já vinculado a um curso |
| `GET` | `/courses/:id/modules` | Listar módulos de um curso |

---

## 📋 Exemplos

### Criar curso
```http
http://localhost:3333/courses
POST /courses
Content-Type: application/json

{ "name": "Node.js do Zero" }
```
```json
// 201 Created
{ "name": "Node.js do Zero" }
```

---

### Criar módulo
```http
POST /modules
Content-Type: application/json

{ "name": "Introdução", "course_id": 1 }
```
```json
// 201 Created
{ "name": "Introdução", "course_id": 1 }
```

> `course_id` é **obrigatório** — o banco tem constraint `NOT NULL` nessa coluna.

---

### Listar módulos de um curso
```http
GET /courses/1/modules
```
```json
// 200 OK
[
  {
    "course_id": 1,
    "course": "Node.js do Zero",
    "module_id": 1,
    "module_name": "Introdução"
  }
]
```

---

### Deletar curso
Ao deletar um curso, os módulos vinculados são **desvinculados** antes da exclusão (a coluna `course_id` recebe `null`).

```http
DELETE /courses/1
```
```json
// 200 OK
{ "message": "Course deleted successfully" }
```

---

## ⚠️ Respostas de Erro

| Status | Situação |
|--------|----------|
| `400` | Campo obrigatório ausente (`name`, `course_id`) |
| `404` | Recurso não encontrado (curso ou módulo) |
| `500` | Erro interno (sem `try/catch` — a requisição trava) |

---

## 💡 Conceitos praticados

- ✅ Criação e execução de **migrations** versionadas
- ✅ **Chave estrangeira** com `references().inTable()`
- ✅ CRUD completo com validações
- ✅ **JOIN** entre tabelas no Knex
- ✅ Deleção segura com desvínculo de registros relacionados
- ✅ Organização de rotas REST por recurso
