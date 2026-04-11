# 📝 API To-Do List - Node.js puro

> API RESTful de gerenciamento de tarefas construída **sem frameworks**, utilizando apenas o módulo nativo `http` do Node.js e ES Modules.  
> Projeto desenvolvido para a disciplina **Programação Web II** — Etec Bento Quirino, 2026.

---

## 📋 Índice

- [Descrição do Projeto](#-descrição-do-projeto)
- [Como o problema foi resolvido](#-como-o-problema-foi-resolvido)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Configuração do ambiente](#-configuração-do-ambiente)
- [Instalação](#-instalação)
- [Execução](#-execução)
- [Endpoints da API](#-endpoints-da-api)

- [Níveis do Desafio Implementados](#-níveis-do-desafio-implementados)

---

## 📌 Descrição do projeto

Esta API permite gerenciar uma lista de tarefas (To-Do List), permitindo a criação, edição e deleção de tarefas (veja mais em [Endpoints da API](#-endpoints-da-api)).

---

## 🧩 Como os problemas foram resolvidos

### Nível **Júnior**
> Desafio #1: adicionar novo campo de `completed` no tarefa
><br> ―― **Solução**: foi resolvido mudando o arquivo `models/taskModel.js`, adicionando um novo campo, chamado `completed`, que pode ser `true` ou `false`
> <br>
> <br>
> Desafio #2: atualizar status de `completed` da tarefa
><br> ―― **Solução**: criação de um rota com URI `tasks/:id/:status` com método `PUT`. Com isso, podemos atualizar o status de `completed` da tarefa, sendo `0 = false` e `1 = true`

### Nível **Pleno**
> Desafio #1: buscar tarefa por ID
><br> ―― **Solução**: criar uma rota com URI `tasks/:id` com método `GET`. Com isso, criamos uma lógica que procura uma tarefa com o ID correspondente ao da URI no Array. Se achar, retorna, se não achar, retorna que não existe uma tarefa com esse ID no Array

### Nível **Sênior**
> Desafio #1: substitua o array em memória por um arquivo
><br> ―― **Solução**: usar o módulo `fs` (filesystem) do Node.js para criar arquivos (`fs.writeFileSync()`) e ler arquivos (`fs.readFileSync()`). Com isso, toda inicialização do servidor, há a tentativa de ler o arquivo JSON local, caso haja erro, criamos o arquivo. No fim, guardamos isso na variável `tasks`. Em cada modificação de tarefas (POST, DELETE e PUT), atualizamos o arquivo JSON local, usando o `fs.writeFileSync()` com o Array de tarefas convertidos para formato de dado JSON usando `JSON.stringfy()`


---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| **Node.js** | ≥ v24.14.1 | Runtime JavaScript |
| **Módulo `http`** | nativo | Criação do servidor HTTP |
| **ES Modules** | nativo | Sistema de módulos (`import`/`export`) |
| **Git** | ≥ 2.53.0 Windows | Envio de alterações para o GitHub |

---

## 📁 Estrutura de Pastas

```
apiToDoList/
├── app.js                          # Ponto de entrada — cria e inicia o servidor
├── package.json                    # Configurações do projeto (type: module)
└── src/
    ├── controllers/
    │   └── taskController.js       # Controla o fluxo de cada requisição
    ├── models/
    │   └── taskModel.js            # Define a estrutura do objeto tarefa
    ├── routes/
    │   └── taskRoutes.js           # Mapeia URLs e métodos HTTP para os controllers
    └── services/
        └── taskServices.js         # Lógica de negócio
```

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- **Node.js** instalado    → Verifique com: `node -v` no terminal

> O projeto usa ES Modules nativos (`"type": "module"` no `package.json`), então **não é compatível com versões antigas do Node.js**.

### Verificar instalação do Node.js

```bash
node -v   # deve retornar v18 ou superior para funcionar
npm -v
```

Caso não tenha o Node.js instalado, baixe ele [aqui](https://nodejs.org).

---

## 📦 Instalação

1. **Clone o repositório** (ou extraia o arquivo ZIP):

```bash
git clone https://github.com/seu-usuario/apiToDoList.git
cd apiToDoList
```

2. **Instale as dependências** (o projeto não possui dependências externas, mas é bom executar assim mesmo para garantir):

```bash
npm install
```

---

## ▶️ Execução

Execute o servidor com o Node.js:

```bash
node app.js
```

Se tudo estiver correto, você verá no terminal:

```
Servidor iniciado em localhost:3000
```

A API estará disponível em: **http://localhost:3000**

Para encerrar o servidor, pressione `Ctrl + C` no terminal.

---

## 🔌 Endpoints da API

**URL Base:** `http://localhost:3000`

| Método | Rota | Descrição |
|---|---|---
| `GET` | `/tasks` | Lista todas as tarefas |
| `GET` | `/tasks/:id` | Retorna uma tarefa específica |
| `POST` | `/tasks` | Cria uma nova tarefa |
| `PUT` | `/tasks/:id` | Atualiza uma tarefa específica |
| `PUT` | `/tasks/:id/:status` | Atualiza o status de `completed` de uma tarefa (`0 = false`, `1 = true`) |
| `DELETE` | `/tasks/:id` | Remove uma tarefa específica |

---

## 📡 Exemplos de Uso

> Você pode testar com **Postman**, **Insomnia**, **Thunder Client** ou **cURL**. O usado durante os testes da API foi a exntesão **Thunder Client** do VS Code.

---

### 1. Criar uma tarefa — `POST /tasks`

**Body (JSON):**
```json
{
  "title": "Estudar Node.js"
}
```

**Resposta:**
```json
{
  "id": 0,
  "title": "Estudar Node.js",
  "completed": false
}
```

---

### 2. Listar todas as tarefas — `GET /tasks`

**Resposta:**
```json
[
  {
    "id": 0,
    "title": "Estudar Node.js",
    "completed": false
  }
]
```

---

### 3. Buscar tarefa por ID — `GET /tasks/0`

**Resposta:**
```json
{
  "id": 0,
  "title": "Estudar Node.js",
  "completed": false
}
```

**Erro (ID que não existe):**
```json
{
  "message": "Tarefa não encontrada!"
}
```

---

### 4. Atualizar tarefa — `PUT /tasks/0`

**Body (JSON):**
```json
{
  "title": "Estudar HTTP no Node.js"
}
```

**Resposta:**
```json
{
  "id": 0,
  "title": "Estudar HTTP no Node.js",
  "completed": false
}
```

---

### 5. Atualizar status — `PUT /tasks/0/1`

> `1 = true` | `0 = false`

**Resposta:**
```json
{
  "id": 0,
  "title": "Estudar HTTP no Node.js",
  "completed": true
}
```

---

### 6. Deletar tarefa — `DELETE /tasks/0`

**Resposta:**
```json
{
  "message": "Removida"
}
```

---

### 7. Rota inválida — `GET /qualquer-outra-rota`

```json
{
  "message": "Rota não encontrada"
}
```

***Projeto desenvolvido para fins educacionais por [Lucas Siqueira](https://www.linkedin.com/in/lucasdesouzasiqueira/).***
