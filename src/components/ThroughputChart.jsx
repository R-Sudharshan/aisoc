import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatBytes } from '../api.js'

// Two lines: bytes sent vs bytes received over time.

export default function ThroughputChart({ title, data }) {
  const rows = data.buckets.map((bucket, i) => ({
    time: bucket.slice(11, 16),
    sent: data.sent_bytes[i],
    received: data.received_bytes[i],
  }))

  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={rows} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="time" stroke="#475569" fontSize={11} />
          <YAxis
            stroke="#475569" fontSize={11}
            tickFormatter={(v) => formatBytes(v)}
          />
          <Tooltip
            contentStyle={{ background: '#0b1220', border: '1px solid #1e2a3d' }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value) => formatBytes(value)}
          />
          <Legend />
          <Area type="monotone" dataKey="sent" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.3} />
          <Area type="monotone" dataKey="received" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
