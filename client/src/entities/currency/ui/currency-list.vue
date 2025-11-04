<template>
  <v-card class="mt-6 mx-auto" max-width="600" width="100%">
    <v-card-title class="text-h6 font-weight-bold text-center">
      Список доступных валют
    </v-card-title>
    
    <v-card-text>
      <v-text-field
        v-model="search"
        label="Поиск валюты"
        prepend-inner-icon="mdi-magnify"
        clearable
        class="mb-4"
      ></v-text-field>

      <v-list lines="two" class="currency-list">
        <v-list-item
          v-for="currency in filteredCurrencies"
          :key="currency.ISO"
        >
          <template v-slot:prepend>
            <v-avatar color="primary" size="36" class="mr-3">
              <span class="text-white text-caption">{{ currency.ISO }}</span>
            </v-avatar>
          </template>
          
          <v-list-item-title>
            {{ currency.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
    
    <v-card-actions class="justify-center">
      <v-chip color="primary" variant="outlined">
        Всего валют: {{ currencyStore.currencies.length }}
      </v-chip>
      <v-chip color="secondary" variant="outlined" v-if="search">
        Найдено: {{ filteredCurrencies.length }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCurrencyStore } from '@/shared/store/currency-store'

const currencyStore = useCurrencyStore()
const search = ref('')

const filteredCurrencies = computed(() => {
  if (!search.value) {
    return currencyStore.currencies
  }
  
  const searchLower = search.value.toLowerCase()
  return currencyStore.currencies.filter(currency => 
    currency.ISO.toLowerCase().includes(searchLower) ||
    currency.name.toLowerCase().includes(searchLower)
  )
})

onMounted(async () => {
  await currencyStore.fetchCurrencyList()
})
</script>

<style scoped>
.currency-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>