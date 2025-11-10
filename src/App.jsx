import { useState } from 'react'
import './App.css'

const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather'

const formatTemperature = (temperature) => {
  if (temperature === null || temperature === undefined || Number.isNaN(temperature)) {
    return '—'
  }

  return `${Math.round(temperature)}°`
}

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState({ loading: false, error: null })

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!city.trim()) {
      setStatus({ loading: false, error: 'Please enter a city name.' })
      setWeather(null)
      return
    }

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

    if (!apiKey) {
      setStatus({
        loading: false,
        error: 'Missing OpenWeather API key. Add VITE_OPENWEATHER_API_KEY to a .env file.',
      })
      setWeather(null)
      return
    }

    setStatus({ loading: true, error: null })

    try {
      const response = await fetch(
        `${WEATHER_ENDPOINT}?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`,
      )

      if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message || 'Unable to fetch weather data.')
      }

      const data = await response.json()

      setWeather({
        city: `${data.name}, ${data.sys?.country ?? ''}`.trim().replace(/,$/, ''),
        description: data.weather?.[0]?.description ?? 'No description available',
        temperature: data.main?.temp ?? null,
        feelsLike: data.main?.feels_like ?? null,
        humidity: data.main?.humidity ?? null,
      })
      setStatus({ loading: false, error: null })
    } catch (error) {
      setWeather(null)
      setStatus({
        loading: false,
        error: error instanceof Error ? error.message : 'Something went wrong.',
      })
    }
  }

  return (
    <div className="sky">
      <div className="cloud cloud-one" aria-hidden="true" />
      <div className="cloud cloud-two" aria-hidden="true" />
      <div className="cloud cloud-three" aria-hidden="true" />
      <div className="cloud cloud-four" aria-hidden="true" />

      <div className="app-shell">
        <header>
          <h1>Weather Lookup</h1>
          <p>Search for current conditions in any city worldwide.</p>
        </header>

        <form className="search-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="city-input">
            City
          </label>
          <input
            id="city-input"
            type="text"
            placeholder="e.g. Tokyo, Paris, Toronto"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            aria-label="City name"
          />
          <button type="submit" disabled={status.loading}>
            {status.loading ? 'Searching…' : 'Search'}
          </button>
        </form>

        {status.error && <p role="alert" className="feedback error">{status.error}</p>}

        {weather && !status.loading && (
          <section className="weather-card" aria-live="polite">
            <h2>{weather.city}</h2>
            <p className="weather-main">{formatTemperature(weather.temperature)}</p>
            <p className="weather-description">{weather.description}</p>
            <div className="weather-details">
              <div>
                <span className="label">Feels like</span>
                <span>{formatTemperature(weather.feelsLike)}</span>
              </div>
              <div>
                <span className="label">Humidity</span>
                <span>{weather.humidity ?? '—'}%</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default App
