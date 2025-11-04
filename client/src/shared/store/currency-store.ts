import { getCurrencyList } from "@/entities/currency/api/currency-api";
import type { ICurrency } from "@/entities/currency/model/currency-model";
import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currency", {
    state: () => ({
        currencies: [] as ICurrency[],
    }),

    actions: {
        async fetchCurrencyList() {
            this.currencies = await getCurrencyList();
        },
    },
});