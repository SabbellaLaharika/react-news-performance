# High-Performance React News Aggregator

A professional news aggregator built with React and the HackerNews API, demonstrating systematic performance optimization.

## Features

- **HackerNews API Integration**: Fetches top 500 stories.
- **Optimized Performance**:
    - **Parallel Fetching**: Uses `Promise.all` for rapid data retrieval.
    - **List Virtualization**: Efficiently renders 500+ items using `@tanstack/react-virtual`.
    - **Image Optimization**: Responsive images with `srcset` and explicit dimensions.
    - **Code Splitting**: Lazy-loaded components for faster initial load.
    - **Memoization**: Strategic use of `React.memo` and `useMemo`.

## Audit Results

See [PERFORMANCE.md](./PERFORMANCE.md) for a detailed breakdown of the performance audit and the impact of each optimization.

## Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd react-news-performance
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment**:
   ```bash
   cp .env.example .env
   ```

4. **Run the app**:
   ```bash
   npm run dev
   ```

### Running the "Slow" Version

To view the initial, unoptimized version of the application:
```bash
git checkout slow-version
npm install
npm run dev
```

### Docker Setup (Production Build)

To run the production-optimized application in a container:
```bash
docker-compose up -d --build
```
The application will be accessible at `http://localhost:3000`.

## Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build for production (generates `stats.html`).
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.
