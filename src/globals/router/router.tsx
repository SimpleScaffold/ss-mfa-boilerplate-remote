/// <reference types="vite/client" />
import { createBrowserRouter, type RouteObject } from 'react-router'
import { Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import HomePage from 'src/pages/HomePage'
import NotFoundPage from 'src/pages/extra/NotFoundPage'

type RouteModule = { default: ComponentType }

const MODULES: Record<string, () => Promise<RouteModule>> =
    import.meta.glob<RouteModule>('src/pages/url/**/*Page.tsx')

const generateRoutes = (
    modules: Record<string, () => Promise<RouteModule>>,
): RouteObject[] => {
    return Object.entries(modules).map(([path, loadModule]) => {
        const routePath = path
            .replace(/.*src\/pages\/url\//, '')
            .replace(/\/[^/]+\.tsx$/, '') // 폴더명만 추출 (sample/SamplePage.tsx → sample)
            .toLowerCase()

        const LazyComponent = lazy(loadModule)

        return {
            path: `/${routePath}`,
            element: (
                <Suspense fallback={null}>
                    <LazyComponent />
                </Suspense>
            ),
        }
    })
}

const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    ...generateRoutes(MODULES),
    { path: '*', element: <NotFoundPage /> },
])

export default router
