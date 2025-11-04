import express from 'express';
import cors from 'cors';
import { ConfigService } from './services/config.service';
import { CurrencyController } from './entities/currency/currency.controller';

async function startApp() {
    const app = express();
    const configService = new ConfigService();
    const currencyController = new CurrencyController();
    const URL = `${configService.get('CLIENT_URL')}:${configService.get('CLIENT_PORT')}`;
    app.use(cors({
        origin: URL, 
        methods: ['GET', 'POST'], 
        allowedHeaders: ['Content-Type'],
    }));
    app.use(express.json());
    app.use('/', currencyController.router);
    const PORT = configService.get('SERVER_PORT');
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}

startApp();