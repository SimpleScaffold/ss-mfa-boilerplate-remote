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
// NOTE: config 로더는 런타임 환경에 따라 타입이 넓게(unknown) 잡힐 수 있어,
// vite.config.ts에서는 필요한 필드만 보장하도록 캐스팅합니다.
const remoteConfig = getRemoteConfig(envMode) as {
    origin: string
    port: number
}

function extractHostFromOrigin(origin: string): string {
    const match = origin.replace(/^https?:\/\//, '').split(':')[0]
    return match || 'localhost'
}

export default defineConfig(({ command }) => {
    const envMode = (process.env.MF_ENV || 'local') as EnvMode
    const remoteConfig = getRemoteConfig(envMode) as {
        origin: string
        port: number
    }

    const isDev = command === 'serve'
    const shared: Record<string, { singleton?: boolean }> = isDev
        ? {}
        : {
              react: { singleton: true },
              'react-dom': { singleton: true },
          }

    return {
        plugins: [
            react(),
            tailwindcss(),
            federation({
                name: 'remoteapp1',
                manifest: true,
                exposes: {
                    './RemoteApp1': './src/RemoteApp1.tsx',
                },
                shared,
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
            open: false,
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
        build: {
            target: 'chrome107',
        },
    }
})
