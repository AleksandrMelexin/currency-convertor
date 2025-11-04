<template>
  <v-container class="d-flex justify-center align-center min-height-100">
    <Converter />
    <CurrencyList />
  </v-container>
</template>

<script setup lang="ts">
import Converter from '@/widgets/converter.vue'
import CurrencyList from '@/entities/currency/ui/currency-list.vue'
</script>

<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>