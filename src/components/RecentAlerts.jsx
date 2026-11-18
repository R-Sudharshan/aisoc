// Live alert feed: newest detections first, colored by severity.

const SEV_CLASS = {
  Critical: 'sev-critical',
  High: 'sev-high',
  Medium: 'sev-medium',
  Low: 'sev-low',
}

export default function RecentAlerts({ alerts }) {
  return (
    <div className="panel">
      <div className="panel-title">Live Alerts</div>
      {alerts.length === 0 ? (
        <div className="panel-empty">No alerts yet</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Severity</th>
              <th>Alert</th>
              <th>Detection</th>
              <th>Source</th>
              <th>Destination</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td className="mono">{alert.timestamp.slice(11, 19)}</td>
                <td><span className={'sev-badge ' + (SEV_CLASS[alert.severity] || '')}>
                  {alert.severity}
                </span></td>
                <td>{alert.alert_name}</td>
                <td>{alert.detection_type}</td>
                <td className="mono">{alert.src_ip}</td>
                <td className="mono">{alert.dst_ip}</td>
                <td>{alert.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
