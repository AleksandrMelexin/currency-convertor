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
              :loading="currencyStore.isLoading"
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
              :loading="currencyStore.isLoading"
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
        v-if="conversionResult"
        type="success"
        class="mt-4 text-center"
      >
        <div class="text-h6">
          {{ conversion.amount }} {{ conversion.from }} = 
          {{ conversionResult }} {{ conversion.to }}
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
import { convertCurrency } from '@/entities/currency/api/currency-api'

const currencyStore = useCurrencyStore()

const conversion = ref({
  from: '',
  to: '',
  amount: 1
})

const conversionResult = ref<number | null>(null)
const isConverting = ref(false)
const convertError = ref<string | null>(null)

const currencyOptions = computed(() => {
  return currencyStore.currencies.map(currency => ({
    code: currency.ISO, 
    displayName: `${currency.name} (${currency.ISO})`
  }))
})

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
  conversionResult.value = null

  try {
    const result = await convertCurrency(
      conversion.value.from,
      conversion.value.to,
      conversion.value.amount
    )
    conversionResult.value = result
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