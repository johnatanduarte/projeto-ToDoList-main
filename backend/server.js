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

// Função para verificar se uma tarefa ocorrerá em 5 minutos
const isTaskInFiveMinutes = (taskDate) => {
    const currentTime = new Date();
    const taskTime = new Date(taskDate);

    // Diferença em milissegundos
    const difference = taskTime - currentTime;

    // Verifica se está entre 0 e 5 minutos (300000 ms = 5 minutos)
    return difference > 0 && difference <= 5 * 60 * 1000;
};

// Função para verificar tarefas futuras e enviar e-mails
const checkTasksForReminder = async () => {
    try {
        const now = new Date();

        // Buscar todas as tarefas futuras que ainda não tiveram o e-mail enviado
        const [tasks] = await db.query('SELECT * FROM todos WHERE completed = 0 AND date >= ? AND email_sent = 0', [now]);

        for (const task of tasks) {
            // Verifica se a tarefa está a 5 minutos de ser realizada
            if (isTaskInFiveMinutes(task.date)) {
                // Buscar o email do usuário vinculado à tarefa
                const [user] = await db.query('SELECT email FROM users WHERE id = ?', [task.user_id]);

                if (user.length > 0) {
                    const email = user[0].email;
                    const subject = `Lembrete: Tarefa "${task.text}" em 5 minutos`;
                    const message = `Olá, você tem uma tarefa agendada para daqui 5 minutos: "${task.text}" em ${task.date}.`;

                    // Enviar email para o usuário
                    await sendEmail(email, subject, message);

                    // Atualizar a tarefa para marcar que o email foi enviado
                    await db.query('UPDATE todos SET email_sent = 1 WHERE id = ?', [task.id]);
                }
            }
        }
    } catch (error) {
        console.error('Erro ao verificar tarefas futuras:', error);
    }
};

// Agendamento para verificar tarefas a cada minuto
cron.schedule('* * * * *', () => {
    console.log('Verificando tarefas agendadas para os próximos 5 minutos...');
    checkTasksForReminder(); // Verifica as tarefas e envia e-mails
});

// Rota para registrar um novo usuário
app.post('/users', async (req, res) => {
    const { email, name, password } = req.body;
    console.log('Dados recebidos:', req.body);
    try {
        const [result] = await db.query('INSERT INTO users (nome, email, password) VALUES (?, ?, ?)', [name, email, password]);
        console.log('Usuário inserido com ID:', result.insertId);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Erro', error);
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

// Rota para atualizar uma tarefa existente
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID da tarefa na URL
    const { text, date, completed } = req.body; // Pega os dados do corpo da requisição

    try {
        // Atualiza a tarefa no banco de dados
        const updatedTodo = await db.query(
            'UPDATE todos SET text=?, date=?, completed=? WHERE id = ?', [text, date, completed, id]);

        if (updatedTodo.rowCount.length === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }

        // Retorna a tarefa atualizada ao cliente
        res.json(updatedTodo.rowCount[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
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
