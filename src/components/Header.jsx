// Top bar: title, time window selector, LIVE toggle, generate and purge buttons.

const WINDOWS = ['15m', '1h', '6h', '24h', 'all']

export default function Header({ window, onWindow, live, onLive,
                                onGenerate, onPurge, busy, threatLevel }) {
  const threatClass = 'threat-' + threatLevel.toLowerCase()
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">AISOC</span>
        <span className="subtitle">Security Operations Dashboard</span>
        <span className={'threat-badge ' + threatClass}>{threatLevel}</span>
      </div>

      <div className="header-right">
        <div className="window-select">
          {WINDOWS.map((w) => (
            <button
              key={w}
              className={w === window ? 'win-btn active' : 'win-btn'}
              onClick={() => onWindow(w)}
            >
              {w.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          className={live ? 'btn live-on' : 'btn'}
          onClick={() => onLive(!live)}
        >
          {live ? 'LIVE ON' : 'LIVE OFF'}
        </button>

        <button className="btn primary" onClick={onGenerate} disabled={busy}>
          {busy ? 'Working...' : 'Generate Logs'}
        </button>

        <button className="btn danger" onClick={onPurge} disabled={busy}>
          Purge
        </button>
      </div>
    </header>
  )
}
