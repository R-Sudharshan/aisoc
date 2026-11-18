import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Stacked area chart of events over time, split by ALLOW / DENY.

const COLORS = { ALLOW: '#22c55e', DENY: '#ef4444' }

export default function EventTimeline({ title, subtitle, data }) {
  // recharts wants one object per bucket: { time, ALLOW, DENY }
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
      <div className="panel-sub">{subtitle}</div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={rows} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="time" stroke="#475569" fontSize={11} />
          <YAxis stroke="#475569" fontSize={11} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: '#0b1220', border: '1px solid #1e2a3d' }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Legend />
          {Object.entries(data.series).map(([name]) => (
            <Area key={name} type="monotone" dataKey={name} stackId="1"
              stroke={COLORS[name] || '#38bdf8'} fill={COLORS[name] || '#38bdf8'}
              fillOpacity={0.35} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
