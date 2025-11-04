<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-h4 font-weight-bold text-center">
        История операций
      </v-card-title>

      <v-card-text>
        <HistoryList />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import HistoryList from '@/entities/history/ui/history-list.vue'
</script>

<style scoped>
</style>