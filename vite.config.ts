import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { getRemoteConfigByName, type EnvMode } from '../../../../config'
import { extractHostFromUrl, getPortFromUrl } from '../../../../config/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../../../')

const REMOTE_FOLDER_NAME = path.basename(__dirname)
const REMOTE_MODULE_NAME =
    REMOTE_FOLDER_NAME.charAt(0).toUpperCase() + REMOTE_FOLDER_NAME.slice(1)

async function loadConfig(): Promise<UserConfig> {
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

    // dev/build 모두 MF 사용 → shared singleton 항상 필요
    const shared = {
        react: { singleton: true },
        'react-dom': { singleton: true },
    }

    return {
        plugins: [
            react(),
            tailwindcss(),
            federation({
                name: REMOTE_FOLDER_NAME,
                filename: 'remoteEntry.js',
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
                onwarn(warning, warn) {
                    if (
                        warning.code === 'EVAL' &&
                        warning.id?.includes('@module-federation/sdk')
                    ) {
                        return
                    }
                    warn(warning)
                },
            },
        },
    } as UserConfig
}

export default defineConfig(loadConfig())
