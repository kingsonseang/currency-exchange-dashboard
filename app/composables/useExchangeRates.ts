export interface ExchangeRateSuccessResponse {
  success: true;
  quotes: Record<string, number>;
  source: string;
  timestamp: number;
}

export interface ExchangeRateErrorResponse {
  success: false;
  error: { code: string; type: string; info: string };
}

type ExchangeRateResponse =
  | ExchangeRateSuccessResponse
  | ExchangeRateErrorResponse;

export function useExchangeRates(baseCurrency: Ref<string>) {
  const config = useRuntimeConfig();

  const { data, pending, error } = useFetch<ExchangeRateResponse>(
    "https://api.exchangerate.host/live",
    {
      lazy: true,
      query: {
        access_key: config.public.exchangeRateApiKey,
        source: baseCurrency.value,
        format: 1,
      },
    },
  );

  const rates = computed(() => {
    if (!data.value) return [];
    if (!data.value.success) return []; // handle error here
    return Object.entries(data.value.quotes).map(([code, rate]) => ({
      code,
      rate,
    }));
  });

  return {
    rates,
    pending,
    error,
  };
}
