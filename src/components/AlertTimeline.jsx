import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Stacked bar chart of alerts over time, one bar segment per severity.

const COLORS = { Critical: '#ef4444', High: '#f97316', Medium: '#eab308', Low: '#22d3ee' }

export default function AlertTimeline({ title, data }) {
  const rows = data.buckets.map((bucket, i) => {
    const row = { time: bucket.slice(11, 16) }
    for (const [name, values] of Object.entries(data.series)) {
      row[name] = values[i]
    }
    return row
  })

  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={rows} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="time" stroke="#475569" fontSize={11} />
          <YAxis stroke="#475569" fontSize={11} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: '#0b1220', border: '1px solid #1e2a3d' }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Legend />
          {Object.entries(data.series).map(([name]) => (
            <Bar key={name} dataKey={name} stackId="1"
              fill={COLORS[name] || '#38bdf8'} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
