# Weather Lookup

A lightweight React app for checking the current weather in any city using the OpenWeatherMap API. Enter a city name to see the latest temperature, conditions, feels-like reading, and humidity.

## Prerequisites

- Node.js 18+
- An [OpenWeatherMap](https://openweathermap.org/api) API key

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and add your API key:

   ```bash
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

## Development

Start the Vite dev server:

```bash
npm run dev
```

The app runs at the URL shown in the terminal (default: `http://localhost:5173`).

## Build

Create a production build:

```bash
npm run build
```

Preview the build output locally:

```bash
npm run preview
```
