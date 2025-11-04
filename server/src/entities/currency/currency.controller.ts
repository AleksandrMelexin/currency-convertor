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
        this._router.get('/list', this.getCurrencyList.bind(this));
        this._router.get('/convert', this.convertCurrency.bind(this)); // Добавляем новый маршрут
    }

    get router() {
        return this._router;
    }

    async getCurrencyList(req: Request, res: Response) {
        try {
            const currencies = this._CurrencyService.getCurrencyList();
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
    
            const currencyList = this._CurrencyService.getCurrencyList();
            if (!currencyList[from]) {
                return res.status(400).json({
                    error: `Валюта '${from}' не найдена`
                });
            }
            if (!currencyList[to]) {
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