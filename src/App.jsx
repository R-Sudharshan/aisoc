import { useCallback, useEffect, useState } from 'react'
import { getJSON, postJSON, deleteJSON } from './api.js'
import Header from './components/Header.jsx'
import KpiStrip from './components/KpiStrip.jsx'
import EventTimeline from './components/EventTimeline.jsx'
import AlertTimeline from './components/AlertTimeline.jsx'
import DonutChart from './components/DonutChart.jsx'
import HBarChart from './components/HBarChart.jsx'
import ThroughputChart from './components/ThroughputChart.jsx'
import RecentAlerts from './components/RecentAlerts.jsx'
import LogExplorer from './components/LogExplorer.jsx'

export default function App() {
  const [window, setWindow] = useState('1h')
  const [overview, setOverview] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [live, setLive] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const refresh = useCallback(() => {
    getJSON('/api/overview?window=' + window)
      .then((data) => { setOverview(data); setError(null) })
      .catch((e) => setError(e.message))
    getJSON('/api/alerts?limit=50')
      .then(setAlerts)
      .catch(() => {})
  }, [window])

  // first load + every time the window changes
  useEffect(() => { refresh() }, [refresh])

  // live mode: generate a small batch and refresh every 5 seconds
  useEffect(() => {
    if (!live) return undefined
    const timer = setInterval(async () => {
      try {
        await postJSON('/api/generate', { count: 60 })
        refresh()
      } catch (e) {
        setError(e.message)
        setLive(false)
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [live, refresh])

  async function handleGenerate() {
    setBusy(true)
    try {
      await postJSON('/api/generate', { count: 300 })
      refresh()
      setError(null)
    } catch (e) {
      setError(e.message)
    }
    setBusy(false)
  }

  async function handlePurge() {
    setBusy(true)
    try {
      await deleteJSON('/api/logs')
      refresh()
    } catch (e) {
      setError(e.message)
    }
    setBusy(false)
  }

  const empty = overview && overview.kpis.events === 0

  // wait for the first fetch before drawing the dashboard
  if (!overview && !error) {
    return (
      <div className="app">
        <div className="empty-state"><h2>Connecting to backend...</h2></div>
      </div>
    )
  }

  if (error && !overview) {
    return (
      <div className="app">
        <div className="error-banner">{error}</div>
        <div className="empty-state">
          <h2>Backend unreachable</h2>
          <p>Start it with: <b>cd backend &amp;&amp; python app.py</b></p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header
        window={window}
        onWindow={setWindow}
        live={live}
        onLive={setLive}
        onGenerate={handleGenerate}
        onPurge={handlePurge}
        busy={busy}
        threatLevel={overview ? overview.threat_level : 'NORMAL'}
      />

      {error && <div className="error-banner">{error}</div>}

      {empty ? (
        <div className="empty-state">
          <h2>No events in this window</h2>
          <p>Click <b>Generate Logs</b> to create synthetic traffic, or turn on <b>LIVE</b>.</p>
        </div>
      ) : (
        <>
          <KpiStrip kpis={overview.kpis} />

          <div className="row two-thirds">
            <EventTimeline title="Event Volume" subtitle={'bucketed every ' + window}
              data={overview.event_timeline} />
            <DonutChart title="Alert Severity" data={overview.severity_pie}
              colors={{ Critical: '#ef4444', High: '#f97316', Medium: '#eab308', Low: '#22d3ee' }} />
          </div>

          <div className="row two-thirds">
            <AlertTimeline title="Alerts by Severity" data={overview.alert_timeline} />
            <DonutChart title="Traffic Actions" data={overview.action_pie}
              colors={{ ALLOW: '#22c55e', DENY: '#ef4444' }} />
          </div>

          <div className="row three">
            <HBarChart title="Top Attacking Sources" color="#ef4444" data={overview.top_attackers} />
            <HBarChart title="Top Services" color="#38bdf8" data={overview.top_services} />
            <HBarChart title="Top Destinations" color="#a78bfa" data={overview.top_destinations} />
          </div>

          <div className="row two-thirds">
            <ThroughputChart title="Network Throughput" data={overview.throughput} />
            <DonutChart title="Events by Service" data={overview.service_pie} />
          </div>

          <RecentAlerts alerts={alerts} />
          <LogExplorer window={window} />
        </>
      )}
    </div>
  )
}
