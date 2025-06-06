const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const glossaryRoutes = require('./routes/GlossaryRoute');
const articleRoutes = require('./routes/ArticleRoute');

app.use(express.json());
app.use(cors());
app.use('/api', glossaryRoutes);
app.use('/api', articleRoutes);

/**
 * @route GET /
 * @group Default - Operations related to the base route
 * @returns {string} 200 - Welcome message
 */
app.get('/', (req, res) => {
    res.send('Olá, mundo! Bem-vindo ao meu servidor com Express!');
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
