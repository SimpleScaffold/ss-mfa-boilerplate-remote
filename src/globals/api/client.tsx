const baseURL = (import.meta.env.VITE_API_HOST as string) ?? ''

async function apiFetch(url: string, init?: RequestInit): Promise<Response> {
    const res = await fetch(`${baseURL}${url}`, init)
    if (!res.ok) {
        console.error(`[API] ${init?.method ?? 'GET'} ${url} → ${res.status}`)
        throw new Error(`API error: ${res.status} ${res.statusText}`)
    }
    return res
}

export const client = {
    baseURL,
    get: (url: string, config?: RequestInit) =>
        apiFetch(url, { ...config, method: 'GET' }),
    post: (url: string, body?: unknown, config?: RequestInit) =>
        apiFetch(url, {
            ...config,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...config?.headers },
            body: body ? JSON.stringify(body) : undefined,
        }),
}
