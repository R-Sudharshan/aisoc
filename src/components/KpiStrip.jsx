import { formatBytes } from '../api.js'

// The row of big numbers under the header (events, alerts, deny rate...).

export default function KpiStrip({ kpis }) {
  const cards = [
    { label: 'Total Events', value: kpis.events.toLocaleString(), tone: 'cyan' },
    { label: 'Total Alerts', value: kpis.alerts.toLocaleString(), tone: 'orange' },
    { label: 'Critical + High', value: kpis.crit_high_alerts.toLocaleString(), tone: 'red' },
    { label: 'Deny Rate', value: kpis.deny_rate + '%', tone: 'yellow' },
    { label: 'Unique Sources', value: kpis.unique_sources.toLocaleString(), tone: 'green' },
    { label: 'Total Traffic', value: formatBytes(kpis.total_bytes), tone: 'purple' },
  ]

  return (
    <div className="kpi-strip">
      {cards.map((card) => (
        <div key={card.label} className={'kpi-card kpi-' + card.tone}>
          <div className="kpi-value">{card.value}</div>
          <div className="kpi-label">{card.label}</div>
        </div>
      ))}
    </div>
  )
}
