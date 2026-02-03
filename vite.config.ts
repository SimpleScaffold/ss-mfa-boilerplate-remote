import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { getRemoteConfig, type EnvMode } from '../../../../config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../../../')

const DEFAULT_ENV_MODE = 'local' as const

const envMode = (process.env.MF_ENV || DEFAULT_ENV_MODE) as EnvMode
const remoteConfig = getRemoteConfig(envMode)

const SHARED_DEPENDENCIES = {
    react: { singleton: true },
    'react/': { singleton: true },
    'react-dom': { singleton: true },
} as const

function extractHostFromOrigin(origin: string): string {
    const match = origin.replace(/^https?:\/\//, '').split(':')[0]
    return match || 'localhost'
}

export default defineConfig({
    build: {
        target: 'chrome107',
    },
    plugins: [
        react(),
        tailwindcss(),
        federation({
            name: 'remoteapp1',
            manifest: true,
            exposes: {
                './RemoteApp1': './src/RemoteApp1.tsx',
            },
            shared: SHARED_DEPENDENCIES,
            dts: false,
        }),
    ],
    resolve: {
        alias: [
            {
                find: /^@\//,
                replacement: `${path.resolve(__dirname, '../../../../packages/fe/ui/src')}/`,
            },
        ],
    },
    server: {
        origin: remoteConfig.origin,
        port: remoteConfig.port,
        // Host(다른 origin)에서 remote 모듈을 로드하므로 CORS 허용이 필요합니다.
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        hmr: {
            port: remoteConfig.port,
            host: extractHostFromOrigin(remoteConfig.origin),
        },
        fs: {
            allow: [repoRoot],
        },
    },
})
