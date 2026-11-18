import { useEffect, useState } from 'react'
import { getJSON } from '../api.js'

// Searchable, filterable, paginated raw log table.

export default function LogExplorer({ window }) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [action, setAction] = useState('')
  const [result, setResult] = useState({ rows: [], total: 0, pages: 1 })

  useEffect(() => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: '15',
      window: window,
      search: search,
      action: action,
    })
    getJSON('/api/logs?' + params.toString()).then(setResult).catch(() => {})
  }, [page, search, action, window])

  return (
    <div className="panel">
      <div className="panel-row">
        <div className="panel-title">Log Explorer</div>
        <div className="explorer-controls">
          <input
            className="input"
            placeholder="Search ip, user, message..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
          <select
            className="input"
            value={action}
            onChange={(e) => { setAction(e.target.value); setPage(1) }}
          >
            <option value="">All actions</option>
            <option value="ALLOW">ALLOW</option>
            <option value="DENY">DENY</option>
          </select>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Service</th>
            <th>Action</th>
            <th>Bytes</th>
            <th>User</th>
            <th>Device</th>
            <th>Attack</th>
          </tr>
        </thead>
        <tbody>
          {result.rows.map((log) => (
            <tr key={log.id} className={log.is_attack ? 'row-attack' : ''}>
              <td className="mono">{log.timestamp.slice(11, 19)}</td>
              <td>{log.log_type}</td>
              <td className="mono">{log.src_ip}:{log.src_port}</td>
              <td className="mono">{log.dst_ip}:{log.dst_port}</td>
              <td>{log.service}</td>
              <td>
                <span className={'action-badge action-' + log.action.toLowerCase()}>
                  {log.action}
                </span>
              </td>
              <td className="mono">{log.bytes_sent + log.bytes_received}</td>
              <td>{log.user}</td>
              <td>{log.device}</td>
              <td>{log.is_attack ? <span className="attack-flag">ATTACK</span> : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pager">
        <button className="btn small" disabled={page <= 1}
          onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {result.page} of {result.pages} ({result.total} logs)</span>
        <button className="btn small" disabled={page >= result.pages}
          onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  )
}
