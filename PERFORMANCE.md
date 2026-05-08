# PERFORMANCE.md - News Aggregator Audit

This document tracks the performance audit and optimization process for the React News Aggregator.

## Baseline Performance Report Table

| Metric / Issue | Baseline Score / Observation | Root Cause Analysis | Proposed Solution Hypothesis |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | ~8.5s | Large, unoptimized hero image (2MB+) blocking the main thread. | Compress image, serve in WebP format, use `srcset`, and eager load. |
| **INP** (Interaction to Next Paint) | ~1200ms (from TBT) | Re-rendering 500+ DOM nodes on every keystroke in the filter. | Implement list virtualization to only render visible items. |
| **CLS** (Cumulative Layout Shift) | ~0.45 | Hero image loading without dimensions, pushing content down. | Add explicit `width` and `height` attributes to the `<img>` tag. |
| **Bundle Size** (main.js) | ~1.5MB | Importing full `lodash` library; no code splitting. | Use cherry-picked imports for `lodash`; implement code splitting. |
| **Network Waterfall** | 501 serial requests | Sequential `fetch` calls in a `for` loop. | Parallelize data fetching with `Promise.all`. |

## Phase 3: Systematic Optimization Plan

### 1. Parallelize Network Requests
- **Why**: Instead of waiting for each of the 500 detail requests to finish sequentially, we can fire them all off in parallel.
- **How**: Refactor data fetching logic to use `Promise.all`.

### 2. Implement List Virtualization
- **Why**: Rendering 500+ elements is computationally expensive. Virtualization renders only items currently in the viewport.
- **How**: Use `@tanstack/react-virtual`.

### 3. Optimize Dependencies and Expensive Calculations
- **Why**: Large dependencies bloat bundle size. Un-memoized calculations cause slow re-renders.
- **How**: 
    - Change `import _ from 'lodash'` to `import sortBy from 'lodash/sortBy'`.
    - Wrap expensive calculations in `useMemo`.
    - Apply `React.memo` to `ArticleItem`.

### 4. Optimize Image Delivery
- **Why**: Images are often the largest assets on a page.
- **How**: 
    - Convert hero image to WebP.
    - Add explicit `width` and `height`.
    - Use `srcset` for responsive sizes.

### 5. Implement Code Splitting
- **Why**: Reduces the size of the initial JavaScript payload.
- **How**: Use `React.lazy` and `Suspense`.
