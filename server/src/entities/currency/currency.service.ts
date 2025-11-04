export class CurrencyService {

    private _currencyList: any;
    private _currencyRates: any;

    constructor() {
        this._currencyList = require('./mock-data/currency-list.json');
        this._currencyRates = require('./mock-data/currency-rates.json');
    }
    getCurrencyList() {
        return this._currencyList;
    }

    getCurrencyRates() {
        return this._currencyList;
    }

    convertCurrency(from: string, to: string, amount: number) {
        const result = amount / this._currencyRates[from] * this._currencyRates[to];
        return result.toFixed(2);
    }
}