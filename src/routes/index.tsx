import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import logo from '../logo.svg'

const TIME_ZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'New York' },
  { value: 'America/Los_Angeles', label: 'Los Angeles' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Paris', label: 'Paris' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Asia/Shanghai', label: 'Shanghai' },
  { value: 'Australia/Sydney', label: 'Sydney' },
] as const

type TimeZone = typeof TIME_ZONES[number]['value']

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZone>('UTC')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { timeZone: selectedTimeZone })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: selectedTimeZone })
  }

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <div className="mb-4">
          <label className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
            <Globe className="w-4 h-4" />
            Time Zone
          </label>
          <select
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value as TimeZone)}
            className="bg-gray-700 text-white text-sm px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#61dafb] focus:border-transparent"
          >
            {TIME_ZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
        <p>
          <span className="block text-2xl font-mono mb-4 text-[#61dafb]">
            {formatTime(currentTime)}
          </span>
          <span className="block text-sm font-mono mb-4 text-gray-400">
            {formatDate(currentTime)}
          </span>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
