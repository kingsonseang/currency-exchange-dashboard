<script setup lang="ts">
import { useExchangeRates } from '~/composables/useExchangeRates';
import { paginate } from '~/utils/paginate';

const baseCurrency = ref('USD'),
  search = ref(''),
  page = ref(1),
  pageSize = 10

const { rates, pending, error } = useExchangeRates(baseCurrency)

const filteredRates = computed(() => rates.value.filter(r =>
  r.code.toLowerCase().includes(search.value.toLowerCase())
))

const paginatedRates = computed(() =>
  paginate(filteredRates.value, page.value, pageSize)
)

</script>

<template>
  <div class="flex flex-col justify-center gap-4 w-min mx-auto">
    <div v-if="pending === true">
      Loading ...
    </div>
    <div v-else>
      <UCard class="">
        <div>
          <USelect :items="['USD', 'EUR', 'NGN']" />
          <UInput placeholder="Search..." />
        </div>
        <div>
          <div v-for="rate in paginatedRates" :key="rate.code" class="text-white">
            {{ baseCurrency }} -> {{ rate.code.replace(baseCurrency, '') }}: {{ rate.rate }}
          </div>
        </div>
        <UPagination />
      </UCard>
    </div>
  </div>
</template>
