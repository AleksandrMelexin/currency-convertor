import type { ICurrency } from "@/entities/currency/model/currency-model";

export interface IHistoryItem {
    from: ICurrency;
    to: ICurrency;
    amount: string;
    result: string;
}