<template>
  <v-card class="mx-auto" max-width="500" width="100%">
    <v-card-title class="text-h5 font-weight-bold text-center">
      Конвертер валют
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="performConversion">
        <v-row>
          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="conversion.from"
              :items="currencyOptions"
              item-title="displayName"
              item-value="code"
              label="Из валюты"
              :loading="isConverting"
              clearable
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="conversion.to"
              :items="currencyOptions"
              item-title="displayName"
              item-value="code"
              label="В валюту"
              :loading="isConverting"
              clearable
              required
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-text-field
          v-model.number="conversion.amount"
          type="number"
          label="Сумма"
          min="0"
          step="0.01"
          required
          class="mb-4"
        ></v-text-field>

        <v-btn
          type="submit"
          color="primary"
          size="large"
          :loading="isConverting"
          :disabled="!isFormValid"
          block
        >
          Конвертировать
        </v-btn>
      </v-form>

      <v-alert
        v-if="lastConversionResult"
        type="success"
        class="mt-4 text-center"
      >
        <div class="text-h6">
          {{ lastConversionResult.amount }} {{ lastConversionResult.from }} = 
          {{ lastConversionResult.result }} {{ lastConversionResult.to }}
        </div>
      </v-alert>

      <v-alert
        v-if="convertError"
        type="error"
        class="mt-4 text-center"
      >
        Ошибка конвертации: {{ convertError }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCurrencyStore } from '@/shared/store/currency-store'
import { useHistoryStore } from '@/shared/store/history-store'
import { convertCurrency } from '@/entities/currency/api/currency-api'

const currencyStore = useCurrencyStore()
const historyStore = useHistoryStore()

const conversion = ref({
  from: '',
  to: '',
  amount: 1
})

const lastConversionResult = ref<{
  from: string;
  to: string;
  amount: number;
  result: number;
} | null>(null)

const isConverting = ref(false)
const convertError = ref<string | null>(null)

const currencyOptions = computed(() => {
  return currencyStore.currencies.map(currency => ({
    code: currency.ISO, 
    displayName: `${currency.name} (${currency.ISO})`
  }))
})

const getCurrencyByCode = (isoCode: string) => {
  const currency = currencyStore.currencies.find(c => c.ISO === isoCode)
  return currency ? currency : { ISO: isoCode, name: isoCode }
}

const isFormValid = computed(() => {
  return conversion.value.from && 
         conversion.value.to && 
         conversion.value.amount > 0 &&
         conversion.value.from !== conversion.value.to
})

const performConversion = async () => {
  if (!isFormValid.value) return

  isConverting.value = true
  convertError.value = null
  lastConversionResult.value = null

  try {
    const result = await convertCurrency(
      conversion.value.from,
      conversion.value.to,
      conversion.value.amount
    )

    lastConversionResult.value = {
      from: conversion.value.from,
      to: conversion.value.to,
      amount: conversion.value.amount,
      result: result
    }

    const fromCurrency = getCurrencyByCode(conversion.value.from)
    const toCurrency = getCurrencyByCode(conversion.value.to)

    historyStore.addItem({
      from: fromCurrency,
      to: toCurrency,
      amount: conversion.value.amount.toString(),
      result: result.toString()
    })

  } catch (error) {
    convertError.value = error instanceof Error ? error.message : 'Неизвестная ошибка'
    console.error('Ошибка конвертации:', error)
  } finally {
    isConverting.value = false
  }
}

onMounted(async () => {
  await currencyStore.fetchCurrencyList()
})
</script>

<style scoped>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>