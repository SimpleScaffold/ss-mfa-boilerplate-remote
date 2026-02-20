import { createBrowserRouter } from 'react-router'
import React, { Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import HomePage from 'src/pages/HomePage'
import NotFoundPage from 'src/pages/extra/NotFoundPage'

type RouteModule = { default: ComponentType }

const SamplePage = lazy(
    () => import('src/pages/url/sample/SamplePage') as Promise<RouteModule>,
)

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/sample',
        element: (
            <Suspense fallback={null}>
                <SamplePage />
            </Suspense>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])

export default router
