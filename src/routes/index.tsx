import { createFileRoute } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import logo from "../logo.svg"

export const Route = createFileRoute('/')({
	component: App,
})

function App() {
	const [currentTime, setCurrentTime] = useState(new Date())
	const [selectedTimezone, setSelectedTimezone] = useState("en-US")

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	const timezones = [
		{ value: "en-US", label: "US", tz: "America/New_York" },
		{ value: "en-GB", label: "UK", tz: "Europe/London" },
		{ value: "ja-JP", label: "JP", tz: "Asia/Tokyo" },
		{ value: "de-DE", label: "DE", tz: "Europe/Berlin" },
		{ value: "zh-CN", label: "CN", tz: "Asia/Shanghai" }
	]

	const getCurrentTimezone = () => {
		return timezones.find(tz => tz.value === selectedTimezone) || timezones[0]
	}

	const formatTime = (date: Date) => {
		const timezone = getCurrentTimezone()
		return date.toLocaleTimeString(timezone.value, {
			timeZone: timezone.tz
		})
	}

	const formatDate = (date: Date) => {
		const timezone = getCurrentTimezone()
		return date.toLocaleDateString(timezone.value, {
			month: "long",
			year: "numeric",
			timeZone: timezone.tz
		})
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
					<select
						value={selectedTimezone}
						onChange={(e) => setSelectedTimezone(e.target.value)}
						className="bg-gray-700 text-white text-sm px-2 py-1 rounded border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#61dafb] opacity-70 hover:opacity-100 transition-opacity"
					>
						{timezones.map((tz) => (
							<option key={tz.value} value={tz.value}>
								{tz.label}
							</option>
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
