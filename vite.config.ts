import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { getRemoteConfigByName, type EnvMode } from '../../../../config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../../../')

// git pull 시 폴더명(예: measurement)을 기반으로 MF name/exposes 자동 설정
const REMOTE_FOLDER_NAME = path.basename(__dirname)
const REMOTE_MODULE_NAME =
    REMOTE_FOLDER_NAME.charAt(0).toUpperCase() + REMOTE_FOLDER_NAME.slice(1)

function extractHostFromUrl(url: string): string {
    const u = (url ?? '').replace(/^https?:\/\//, '').split(':')[0]
    return u || 'localhost'
}

function getPortFromUrl(url: string): number {
    try {
        const p = new URL(url).port
        return p ? parseInt(p, 10) : 5173
    } catch {
        return 5173
    }
}

export default defineConfig(async ({ command }) => {
    const envMode = (process.env.MF_ENV || 'local') as EnvMode
    const remoteConfig = await getRemoteConfigByName(
        REMOTE_FOLDER_NAME,
        envMode,
    )
    if (!remoteConfig?.url) {
        throw new Error(
            `"${REMOTE_FOLDER_NAME}" remotes 설정을 config/env/local.ts에 추가해주세요.`,
        )
    }

    const baseUrl = remoteConfig.url
    const port = remoteConfig.port ?? getPortFromUrl(baseUrl)

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
                name: REMOTE_FOLDER_NAME,
                manifest: true,
                exposes: {
                    [`./${REMOTE_MODULE_NAME}`]: './src/App.tsx',
                },
                shared,
                dts: false,
            }),
        ],
        resolve: {
            alias: [
                {
                    find: /^src\//,
                    replacement: `${path.resolve(__dirname, 'src')}/`,
                },
                {
                    find: /^@\//,
                    replacement: `${path.resolve(__dirname, '../../../../packages/fe/ui/src')}/`,
                },
            ],
        },
        server: {
            origin: baseUrl,
            port,
            open: false,
            cors: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            hmr: {
                port,
                host: extractHostFromUrl(baseUrl),
            },
            fs: {
                allow: [repoRoot],
            },
        },
        preview: {
            host: extractHostFromUrl(baseUrl),
            port,
            strictPort: true,
            open: false,
            cors: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
        build: {
            target: 'chrome107',
            rollupOptions: {
                // Module Federation SDK의 eval 경고 억제
                // 참고: doc/kr/11-code-quality/build-eval-warning.md
                // 이 eval은 브라우저에서 실행되지 않는 Node.js 전용 코드입니다
                onwarn(warning, warn) {
                    // Module Federation SDK의 eval 경고는 무시
                    if (
                        warning.code === 'EVAL' &&
                        warning.id?.includes('@module-federation/sdk')
                    ) {
                        return
                    }
                    // 기타 경고는 정상적으로 표시
                    warn(warning)
                },
            },
        },
    }
})
