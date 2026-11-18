// Small helpers for talking to the Flask backend.

async function request(url, options) {
  const res = await fetch(url, options)
  const data = await res.json()
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || 'Request failed: ' + res.status)
  }
  return data
}

export function getJSON(url) {
  return request(url)
}

export function postJSON(url, body) {
  return request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export function deleteJSON(url) {
  return request(url, { method: 'DELETE' })
}

// 1234567 -> "1.2 MB" for the KPI cards
export function formatBytes(n) {
  if (n === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(n) / Math.log(1024))
  return (n / Math.pow(1024, i)).toFixed(1) + ' ' + units[i]
}
