# Currency Exchange Dashboard

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.3.0-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com)
[![Nuxt UI](https://img.shields.io/badge/Nuxt%20UI-4.4.0-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

A modern, responsive currency exchange dashboard built with Nuxt 4 that displays real-time exchange rates from an external API. This application demonstrates best practices in state management, error handling, and user experience design.

## 📋 Project Overview

This application fetches live currency exchange rates from the [ExchangeRate API](https://exchangerate.host/) and displays them in a clean, user-friendly interface. Users can:

- Select a base currency from 8 major world currencies
- View real-time exchange rates in a paginated table
- Search for specific currencies
- Toggle between light and dark modes
- Experience proper loading, error, and empty states

## ✨ Features

### ✅ Core Requirements

- **API Integration**: Fetches data from ExchangeRate API using Nuxt's `useFetch` composable
- **Loading State**: Displays skeleton loaders during data fetching
- **Error State**: Handles both network errors and API-level errors with detailed alerts
- **Empty State**: Shows a friendly message when no search results are found

### 🎯 Additional Features

- **Reactive Currency Selection**: Switch between USD, EUR, GBP, NGN, JPY, CAD, AUD, and CHF
- **Real-time Search**: Filter currencies with instant search feedback
- **Pagination**: Navigate through results with client-side pagination (10 items per page)
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Dark Mode**: Full dark mode support with system preference detection
- **Formatted Currency Display**: Proper currency formatting using `Intl.NumberFormat`
- **TypeScript**: Fully typed for better development experience and fewer runtime errors

## 🏗️ Architecture & Design Decisions

### Technology Stack

#### Why Nuxt 4?

- **Latest Features**: Access to the newest Nuxt capabilities and performance improvements
- **Auto-imports**: Reduced boilerplate with automatic component and composable imports
- **File-based routing**: Intuitive page structure that scales well
- **TypeScript support**: Built-in TypeScript integration for type safety

#### Why Nuxt UI 4?

- **Design System**: Pre-built components following modern design principles
- **Dark Mode**: Built-in theme switching without additional configuration
- **Accessibility**: Components are ARIA-compliant out of the box
- **Customization**: Easy to customize with Tailwind CSS
- **Table Component**: Powerful table component with built-in sorting and styling

#### Why Bun?

- **Performance**: Significantly faster package installation and script execution
- **Modern tooling**: Better compatibility with latest JavaScript features
- **Simplified workflow**: Single tool for package management and script running

### Code Organization

```
app/
├── composables/
│   └── useExchangeRates.ts    # Reusable data fetching logic
├── pages/
│   └── index.vue               # Main dashboard page
├── utils/
│   └── paginate.ts             # Client-side pagination utility
└── app.vue                     # Root layout with SEO meta tags
```

#### Composables Pattern

The `useExchangeRates` composable encapsulates all API fetching logic, making it:

- **Reusable**: Can be used across multiple components
- **Testable**: Easy to unit test in isolation
- **Maintainable**: Changes to API logic happen in one place
- **Type-safe**: Fully typed interfaces for API responses

**Key implementation details:**

```typescript
// Separate success and error response types
export interface ExchangeRateSuccessResponse {
  success: true;
  quotes: Record<string, number>;
  // ... other fields
}

export interface ExchangeRateErrorResponse {
  success: false;
  error: { code: string; type: string; info: string };
}
```

This approach provides:

- **Discriminated unions**: TypeScript can narrow types based on the `success` field
- **Error distinction**: Separate handling for network errors vs API errors
- **Better UX**: Different error messages for different failure scenarios

#### Utility Functions

The `paginate` utility function handles client-side pagination:

- **Pure function**: No side effects, easy to test
- **Generic**: Works with any array type
- **Efficient**: Slices arrays rather than filtering entire datasets

### State Management

**Reactive State:**

- `baseCurrency`: Ref for selected base currency (triggers API refetch)
- `search`: Ref for search input (filters results locally)
- `page`: Ref for current pagination page

**Computed Properties:**

- `filteredRates`: Filters rates based on search query
- `paginatedRates`: Applies pagination to filtered results
- `apiError`: Detects API-level errors from response

**Watchers:**

- Resets pagination to page 1 when search or base currency changes
- Ensures users don't end up on empty pages after filtering

### Error Handling Strategy

**Two-tier error handling:**

1. **Network Errors** (from `useFetch`):
   - DNS failures
   - Network timeouts
   - CORS issues
   - Displays: "Network Error" alert

2. **API Errors** (from API response):
   - Invalid API key
   - Rate limiting
   - Invalid parameters
   - Displays: "API Error" alert with specific error info

This separation provides users with more actionable error messages.

### Performance Optimizations

1. **Lazy Loading**: API calls use `lazy: true` to prevent blocking initial page render
2. **Watch-based Refetching**: Only refetches when base currency changes
3. **Client-side Filtering**: Search and pagination happen locally, reducing API calls
4. **Computed Properties**: Results are cached and only recalculated when dependencies change
5. **Skeleton Loading**: Improves perceived performance by showing placeholders

### UX Decisions

1. **Mobile-first Design**: Stacks filters vertically on small screens
2. **Smart Pagination**: Hides pagination when all results fit on one page
3. **Result Count**: Always shows total filtered results for user awareness
4. **Icon Consistency**: Uses Lucide icons throughout for visual coherence
5. **Tabular Numbers**: Uses `tabular-nums` class for aligned number columns
6. **Accessible Inputs**: All form elements have proper labels and ARIA attributes

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+ or Bun 1.1+
- ExchangeRate API key (free tier available at [exchangerate.host](https://exchangerate.host/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kingsonseang/currency-exchange-dashboard.git
cd currency-exchange-dashboard
```

2. **Install dependencies**

```bash
bun install
# or
npm install
# or
pnpm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```bash
NUXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_api_key_here
```

**Important:** Never commit your `.env` file. It's already in `.gitignore`.

4. **Start development server**

```bash
bun dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
bun run build

# Preview production build locally
bun run preview
```

## 🧪 Testing the Application

### Manual Testing Checklist

**Loading States:**

- [ ] Skeleton loaders appear when changing base currency
- [ ] Loaders show 10 placeholder rows

**Error States:**

- [ ] Invalid API key shows "API Error" alert
- [ ] Disconnected network shows "Network Error" alert
- [ ] Error alerts display appropriate error messages

**Empty States:**

- [ ] Searching for "XYZ123" shows "No currencies found"
- [ ] Empty state includes helpful message and icon

**Functionality:**

- [ ] Changing base currency fetches new rates
- [ ] Search filters currencies in real-time
- [ ] Pagination navigates through results correctly
- [ ] Result count updates with filtering
- [ ] Dark mode toggle works properly

**Responsive Design:**

- [ ] Mobile: Filters stack vertically
- [ ] Tablet: Layout adjusts appropriately
- [ ] Desktop: All elements visible without scrolling

## 📁 Project Structure

```
currency-exchange-dashboard/
├── app/
│   ├── app.config.ts           # App configuration
│   ├── app.vue                 # Root component with SEO
│   ├── assets/
│   │   └── css/
│   │       └── main.css        # Global styles
│   ├── composables/
│   │   └── useExchangeRates.ts # API integration logic
│   ├── pages/
│   │   └── index.vue           # Main dashboard page
│   └── utils/
│       └── paginate.ts         # Pagination helper
├── public/
│   └── favicon.ico             # App favicon
├── .env                        # Environment variables (not committed)
├── .gitignore                  # Git ignore rules
├── nuxt.config.ts              # Nuxt configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🔧 Configuration

### Nuxt Config (`nuxt.config.ts`)

**Key configurations:**

- **Modules**: ESLint for code quality, Nuxt UI for components
- **Runtime Config**: Exposes `NUXT_PUBLIC_EXCHANGE_RATE_API_KEY` to client
- **Dev Tools**: Enabled for better development experience
- **ESLint**: Configured with stylistic rules (no trailing commas, 1tbs brace style)

### Package Manager

Uses **Bun 1.1.42** for faster operations. Can also use npm or pnpm if preferred.

## 🎨 Styling Approach

- **Tailwind CSS 4**: Utility-first styling for rapid development
- **Nuxt UI Components**: Pre-styled components for consistency
- **Custom Utilities**: Minimal custom CSS for specific needs
- **Dark Mode**: Automatic dark mode support via Nuxt UI
- **Responsive Design**: Mobile-first approach using Tailwind breakpoints

## 🔐 Environment Variables

| Variable                            | Description                  | Required |
| ----------------------------------- | ---------------------------- | -------- |
| `NUXT_PUBLIC_EXCHANGE_RATE_API_KEY` | API key for ExchangeRate API | Yes      |

## 📝 Code Quality

- **TypeScript**: Strict type checking throughout
- **ESLint**: Configured with Nuxt-recommended rules
- **Consistent Formatting**: Enforced via ESLint stylistic rules
- **Component Organization**: Clear separation of concerns

## 🚧 Future Improvements

- [ ] Add unit tests with Vitest
- [ ] Implement E2E tests with Playwright
- [ ] Add historical rate comparisons
- [ ] Include currency conversion calculator
- [ ] Add favorites/pinned currencies
- [ ] Cache API responses with TTL
- [ ] Add rate change indicators (up/down arrows)
- [ ] Support for cryptocurrency rates
- [ ] Export rates to CSV/PDF
- [ ] Add chart visualizations

## 📄 License

[MIT License](LICENSE)

## 👤 Author

**Kingson Seang**

- GitHub: [@kingsonseang](https://github.com/kingsonseang)

## 🙏 Acknowledgments

- [Nuxt](https://nuxt.com) - The Vue.js framework
- [Nuxt UI](https://ui.nuxt.com) - Beautiful UI components
- [ExchangeRate API](https://exchangerate.host/) - Free exchange rate data
- [Lucide Icons](https://lucide.dev) - Beautiful icon set
