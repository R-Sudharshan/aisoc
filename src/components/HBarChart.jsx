import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Horizontal bars: top attackers, top services, top destinations.

export default function HBarChart({ title, color, data }) {
  if (!data.length) {
    return (
      <div className="panel">
        <div className="panel-title">{title}</div>
        <div className="panel-empty">No data</div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
        >
          <XAxis type="number" stroke="#475569" fontSize={11} allowDecimals={false} />
          <YAxis type="category" dataKey="name" stroke="#475569" fontSize={11} width={90} />
          <Tooltip
            contentStyle={{ background: '#0b1220', border: '1px solid #1e2a3d' }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Bar dataKey="value" fill={color} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
