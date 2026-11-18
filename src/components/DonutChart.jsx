import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Donut chart used for severity split, action split and services.

const FALLBACK_COLORS = ['#38bdf8', '#a78bfa', '#f97316', '#22c55e', '#eab308', '#ef4444']

export default function DonutChart({ title, data, colors }) {
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
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            stroke="#0b1220"
          >
            {data.map((entry, i) => (
              <Cell key={entry.name}
                fill={colors ? colors[entry.name] : FALLBACK_COLORS[i % FALLBACK_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#0b1220', border: '1px solid #1e2a3d' }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
