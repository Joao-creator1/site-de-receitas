// Importamos o Express para criar o servidor
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Faz o servidor "entregar" os arquivos da pasta atual (front-end)
app.use(express.static(__dirname));

// Configura o body-parser para entender as requisições
app.use(bodyParser.json());

// Array para simular um banco de dados de usuários
const users = [];

// Array para simular um banco de dados de receitas
const recipes = [
    // Suas receitas atuais do script.js podem ser colocadas aqui
    {
        title: "Torta de Frango Cremosa",
        image: "https://via.placeholder.com/600/FF5733",
        text: "Uma deliciosa torta com recheio cremoso de frango..."
    },
    {
        title: "Salada Colorida de Verão",
        image: "https://via.placeholder.com/600/33FF57",
        text: "Refrescante e saudável, ideal para dias quentes..."
    },
];

// Rota para cadastrar um novo usuário
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).send('Usuário já existe.');
    }
    users.push({ username, password });
    res.status(201).send('Usuário cadastrado com sucesso!');
});

// Rota para login de usuário
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).send('Login bem-sucedido!');
    } else {
        res.status(401).send('Nome de usuário ou senha incorretos.');
    }
});

// Rota para obter as receitas
app.get('/recipes', (req, res) => {
    res.json(recipes);
});

// Rota para adicionar uma nova receita (precisamos adicionar a lógica de autenticação aqui depois)
app.post('/recipes', (req, res) => {
    const newRecipe = req.body;
    recipes.push(newRecipe);
    res.status(201).send('Receita adicionada com sucesso!');
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});