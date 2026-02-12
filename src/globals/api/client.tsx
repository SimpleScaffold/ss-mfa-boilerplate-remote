/**
 * API 클라이언트 (Host와 동일한 구조)
 */
const baseURL = import.meta.env.VITE_API_HOST || ''

export const client = {
    baseURL,
    get: (url: string, config?: RequestInit) =>
        fetch(`${baseURL}${url}`, { ...config, method: 'GET' }),
    post: (url: string, body?: unknown, config?: RequestInit) =>
        fetch(`${baseURL}${url}`, {
            ...config,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        }),
}
