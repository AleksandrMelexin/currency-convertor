import type { IHistoryItem } from "@/entities/history/model/history-model";
import { defineStore } from "pinia";

export const useHistoryStore = defineStore("history", {
    state: () => ({
        history: [] as IHistoryItem[],
    }),

    actions: {
        addItem(item: IHistoryItem) {
            this.history = [item, ...this.history];
        },
    },

    getters: {
        getHistory: (state) => state.history
    }
});