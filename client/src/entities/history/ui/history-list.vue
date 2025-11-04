<template>
  <div>
    <v-alert
      v-if="historyStore.getHistory.length === 0"
      type="info"
      class="text-center"
    >
      <div class="text-h6">История операций пуста</div>
      <div>Выполните конвертацию валют, чтобы увидеть здесь операции</div>
    </v-alert>

    <v-list v-else lines="three">
      <v-list-item
        v-for="(item, index) in historyStore.getHistory"
        :key="index"
        class="mb-2 text-center"
      >
        <v-list-item-title class="text-h6 text-center">
          <span class="d-none d-sm-inline">
            из {{ item.amount }} {{ item.from.name }} получено {{ item.result }} {{ item.to.name }}
          </span>
          
          <span class="d-sm-none">
            из {{ item.amount }} {{ item.from.ISO }} получено {{ item.result }} {{ item.to.ISO }}
          </span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/shared/store/history-store'

const historyStore = useHistoryStore()
</script>

<style scoped>
</style>