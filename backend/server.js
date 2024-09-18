// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Conexão MySQL

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota para registrar um novo usuário
app.post('/users', async (req, res) => {
    const { nome, email, password } = req.body;
    try {
        const [result] = await db.query('INSERT INTO users (nome, email, password) VALUES (?, ?, ?)', [nome, email, password]);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
    }
});

// Rota para login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (rows.length > 0) {
            const user = rows[0];
            res.json(user); // Retorna os dados do usuário
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao efetuar login.' });
    }
});



// Rota para obter todas as tarefas de um usuário
app.get('/todos/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const [todos] = await db.query('SELECT * FROM todos WHERE user_id = ?', [userId]);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefas.' });
    }
});

// Rota para adicionar uma nova tarefa
app.post('/todos', async (req, res) => {
    const { text, date, completed, user_id } = req.body;
    try {
      const [result] = await db.query('INSERT INTO todos (text, date, completed, user_id) VALUES (?, ?, ?, ?)', [text, date, completed, user_id]);
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar tarefa.' });
    }
});

// Rota para obter todas as tarefas (independente do usuário)
app.get('/todos', async (req, res) => {
    try {
      const [todos] = await db.query('SELECT * FROM todos'); // Get all tasks
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefas.' });
    }
  });

// Rota para obter todos os usuários
app.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

// Rota para deletar uma tarefa
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM todos WHERE id = ?', [id]);
      res.status(204).send(); // No content response
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar tarefa.' });
    }
  });

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
