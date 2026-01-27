<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import { useExchangeRates } from '~/composables/useExchangeRates';
import { paginate } from '~/utils/paginate';

const baseCurrency = ref('USD')
const search = ref('')
const page = ref(1)
const pageSize = 10

const currencies = ['USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CAD', 'AUD', 'CHF']

const { rates, pending, error, apiError } = useExchangeRates(baseCurrency)

const filteredRates = computed(() => rates.value.filter(r =>
  r.code.toLowerCase().includes(search.value.toLowerCase())
))

const paginatedRates = computed(() =>
  paginate(filteredRates.value, page.value, pageSize)
)

// Reset page when search or baseCurrency changes
watch([search, baseCurrency], () => {
  page.value = 1
})

const getCurrency = (code: string) => code.slice(3)

const columns: TableColumn<{ code: string, rate: number }>[] = [
  {
    accessorKey: 'code',
    header: 'Currency',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left font-medium'
      }
    },
    cell: ({ row }) => {
      const currency = getCurrency(row.original.code)
      return h('span', {
      }, `${baseCurrency.value} → ${currency || row.original.code}`)
    }
  },
  {
    accessorKey: 'rate',
    header: 'Exchange Rate',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right font-medium'
      }
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('rate'))
      const currency = getCurrency(row.original.code)
      const value = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
      }).format(amount)

      return h('span', { class: 'tabular-nums' }, value)
    }
  }
]
</script>

<template>
  <div class="flex flex-col justify-center gap-4 mx-auto p-4 sm:p-6">
    <UCard :ui="{
      root: 'w-full max-w-full min-w-92 sm:max-w-xl md:min-w-96 lg:w-fit',
      header: 'flex flex-col sm:flex-row gap-3',
    }">
      <template #header>
        <div class="flex gap-3 max-sm:w-full">
          <USelectMenu v-model="baseCurrency" :items="currencies" :ui="{
            base: 'w-full sm:w-auto sm:min-w-24',
          }" />
          <UColorModeButton class="shrink-0" />
        </div>
        <UInput v-model="search" placeholder="Search currencies..." icon="i-lucide-search"
          :ui="{ root: 'w-full', base: 'w-full' }" />
      </template>

      <!-- Error State -->
      <div v-if="error || apiError" class="p-4">
        <UAlert icon="i-lucide-alert-circle" color="error" variant="soft" :title="error ? 'Network Error' : 'API Error'"
          :description="error ? error.message : apiError?.info || 'Failed to fetch exchange rates'" />
      </div>

      <!-- Loading State -->
      <div v-else-if="pending" class="p-4 space-y-3">
        <USkeleton class="h-10 w-full" v-for="i in pageSize" :key="i" />
      </div>

      <!-- Empty State -->
      <div v-else-if="paginatedRates.length === 0" class="p-8 text-center">
        <UIcon name="i-lucide-search-x" class="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p class="text-gray-600 dark:text-gray-400">No currencies found</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">Try adjusting your search</p>
      </div>

      <!-- Data Display -->
      <UTable v-else ref="table" :data="paginatedRates" :columns="columns" sticky>
        <template #expanded="{ row }">
          <pre>{{ row.original }}</pre>
        </template>
      </UTable>

      <template #footer>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          <div class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap order-2 sm:order-1">
            {{ filteredRates.length }} result{{ filteredRates.length !== 1 ? 's' : '' }}
          </div>
          <UPagination v-if="filteredRates.length > pageSize" v-model="page" :total="filteredRates.length"
            :page-count="pageSize" :ui="{ list: 'justify-center' }" :show-edges="false" :sibling-count="1"
            class="order-1 sm:order-2" @update:page="page = $event" />
        </div>
      </template>
    </UCard>
  </div>
</template>
