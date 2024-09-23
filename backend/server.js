// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Conexão MySQL
const nodemailer = require('nodemailer'); // Para envio de e-mails
const cron = require('node-cron'); // Para agendamento de tarefas

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do transporte do Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'johnatanduartefranco95@gmail.com', // Seu email Gmail
      pass: 'bgod shsf kzvd gyey' // Senha de aplicativo gerada no Gmail
    },
});

// Função para enviar o e-mail
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'johnatanduartefranco95@gmail.com', // Remetente
            to: to,                     // Destinatário
            subject: subject,           // Assunto do email
            text: text,                 // Texto do email
        });
        console.log('Email enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
    }
};

// Função para verificar tarefas para hoje e enviar e-mails
const checkTasksForToday = async () => {
    try {
        const today = new Date().toISOString().slice(0, 10); // Pega a data de hoje no formato YYYY-MM-DD

        // Buscar todas as tarefas que têm a data de hoje
        const [tasks] = await db.query('SELECT * FROM todos WHERE DATE(date) = ?', [today]);

        for (const task of tasks) {
            // Buscar o email do usuário vinculado à tarefa
            const [user] = await db.query('SELECT email FROM users WHERE id = ?', [task.user_id]);

            if (user.length > 0) {
                const email = user[0].email;
                const subject = `Lembrete: Tarefa "${task.text}" para hoje`;
                const message = `Olá, você tem uma tarefa agendada para hoje: "${task.text}" em ${task.date}.`;

                // Enviar email para o usuário
                await sendEmail(email, subject, message);
            }
        }
    } catch (error) {
        console.error('Erro ao verificar tarefas de hoje:', error);
    }
};

// Agendamento diário para verificar tarefas às 00:00
//minuto hora dia-do-mês mês dia-da-semana
cron.schedule('0 18 * * *', () => {
    console.log('Verificando tarefas agendadas para hoje...');
    checkTasksForToday(); // Verifica as tarefas e envia e-mails
});

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
  console.log(req.body); // Adicione esta linha para verificar o que está sendo enviado
  try {
      const [result] = await db.query('INSERT INTO todos (text, date, completed, user_id) VALUES (?, ?, ?, ?)', [text, date, completed, user_id]);
      res.status(201).json({ id: result.insertId });
  } catch (error) {
      console.error('Erro ao adicionar tarefa:', error); // Adicione um log para erros
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
