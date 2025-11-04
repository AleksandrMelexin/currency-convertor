import { Request, Router, Response } from "express";
import { CurrencyService } from "./currency.service";
import { IRequestParams } from "./currency.model";

export class CurrencyController {
    private _router: Router;
    private _CurrencyService: CurrencyService;

    constructor() {
        this._router = Router();
        this._CurrencyService = new CurrencyService();
        this.bindRoutes();
    }

    bindRoutes() {
        this._router.get('/currencies', this.getCurrencyArray.bind(this));
        this._router.get('/convert', this.convertCurrency.bind(this)); // Добавляем новый маршрут
    }

    get router() {
        return this._router;
    }

    async getCurrencyArray(req: Request, res: Response) {
        try {
            const currencies = this._CurrencyService.getCurrencyArray();
            res.json(currencies);
        } catch (err: any) {
            console.log(err.message);
            res.status(500).json({error: "Что-то пошло не так, приносим свои извинения за доставленные неудобства"});
        }
    }

    async convertCurrency(req: Request, res: Response) {
        try {
            const { from, to, amount }: IRequestParams = req.query;
    
            if (!from || !to || !amount) {
                return res.status(400).json({
                    error: "Недостаточно данных для конвертации"
                });
            }
    
            const amountNumber = parseFloat(amount);
            
            if (amountNumber <= 0) {
                return res.status(400).json({
                    error: "Сумма должна быть положительной"
                });
            }
    
            if (!this._CurrencyService.checkCurrencyInList(from)) {
                return res.status(400).json({
                    error: `Валюта '${from}' не найдена`
                });
            }
            if (!this._CurrencyService.checkCurrencyInList(to)) {
                return res.status(400).json({
                    error: `Валюта '${to}' не найдена`
                });
            }
    
            const response = {
                result: this._CurrencyService.convertCurrency(from, to, amountNumber)
            };
    
            res.json(response);
    
        } catch (err: any) {
            console.log(err.message);
            res.status(500).json({
                error: "Ошибка при конвертации валюты",
                details: err.message
            });
        }
    }
}