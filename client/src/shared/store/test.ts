import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {
    state: () => ({
        count: 0
    }),

    actions: {
        increment(): void {
            this.count++
        }
    }
})