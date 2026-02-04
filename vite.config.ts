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
        // NOTE:
        // Yarn(node-modules) 환경에서 vite가 중복 설치되면(루트/워크스페이스)
        // 플러그인 타입이 서로 달라 TS 오버로드 에러가 발생할 수 있습니다.
        // 런타임에는 문제 없어서 캐스팅으로 해결합니다.
        react() as any,
        tailwindcss() as any,
        federation({
            name: 'remoteapp1',
            manifest: true,
            exposes: {
                './RemoteApp1': './src/RemoteApp1.tsx',
            },
            shared: SHARED_DEPENDENCIES,
            dts: false,
        }) as any,
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
        // remote 앱은 자동으로 브라우저를 열지 않도록 고정합니다.
        // (yarn dev 시 host가 아닌 remote(12000)가 먼저 열리는 현상 방지)
        open: false,
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
