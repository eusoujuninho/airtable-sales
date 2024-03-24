const express = require('express');
// Body-parser não é necessário se você estiver usando Express 4.16.0 ou superior
const bodyParser = require('body-parser');
const { handleWebhook } = require('../services/webhookService'); // Caminho ajustado conforme a estrutura do seu projeto

const app = express();
const PORT = 3000;

// Suporte para JSON e URL-encoded body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para receber o webhook
app.post('/webhook', async (req, res) => {
    try {
        console.log('Webhook recebido:', req.body);
        await handleWebhook(req.body); // Manipula os dados recebidos
        res.status(200).send('Webhook processado com sucesso!');
    } catch (error) {
        console.error('Erro ao processar o webhook:', error);
        res.status(500).send('Erro ao processar o webhook');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});