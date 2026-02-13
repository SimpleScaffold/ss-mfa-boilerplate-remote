import { createBrowserRouter } from 'react-router'
import React, { Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import HomePage from 'src/pages/HomePage'
import NotFoundPage from 'src/pages/extra/NotFoundPage'

type RouteModule = { default: ComponentType }

const SamplePage = lazy(
    () => import('src/pages/url/sample/SamplePage') as Promise<RouteModule>,
)
const PlanarDistancePage = lazy(
    () =>
        import('src/pages/url/planar-distance/PlanarDistancePage') as Promise<RouteModule>,
)
const SpatialDistancePage = lazy(
    () =>
        import('src/pages/url/spatial-distance/SpatialDistancePage') as Promise<RouteModule>,
)
const VerticalDistancePage = lazy(
    () =>
        import('src/pages/url/vertical-distance/VerticalDistancePage') as Promise<RouteModule>,
)
const AreaMeasurementPage = lazy(
    () =>
        import('src/pages/url/area-measurement/AreaMeasurementPage') as Promise<RouteModule>,
)
const LocationMeasurementPage = lazy(
    () =>
        import('src/pages/url/location-measurement/LocationMeasurementPage') as Promise<RouteModule>,
)
const VolumeMeasurementPage = lazy(
    () =>
        import('src/pages/url/volume-measurement/VolumeMeasurementPage') as Promise<RouteModule>,
)
const MeasurementRemovePage = lazy(
    () =>
        import('src/pages/url/measurement-remove/MeasurementRemovePage') as Promise<RouteModule>,
)
const MenuLinkageTestPage = lazy(
    () =>
        import('src/pages/url/menu-linkage-test/MenuLinkageTestPage') as Promise<RouteModule>,
)
const GithubSparkPage = lazy(
    () =>
        import('src/pages/url/github-spark/GithubSparkPage') as Promise<RouteModule>,
)
const AlphaEarthPage = lazy(
    () =>
        import('src/pages/url/alpha-earth/AlphaEarthPage') as Promise<RouteModule>,
)
const UiuxMenuTestPage = lazy(
    () =>
        import('src/pages/url/uiux-menu-test/UiuxMenuTestPage') as Promise<RouteModule>,
)

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>{children}</Suspense>
)

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/sample',
        element: (
            <SuspenseWrapper>
                <SamplePage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/planar-distance',
        element: (
            <SuspenseWrapper>
                <PlanarDistancePage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/spatial-distance',
        element: (
            <SuspenseWrapper>
                <SpatialDistancePage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/vertical-distance',
        element: (
            <SuspenseWrapper>
                <VerticalDistancePage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/area-measurement',
        element: (
            <SuspenseWrapper>
                <AreaMeasurementPage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/location-measurement',
        element: (
            <SuspenseWrapper>
                <LocationMeasurementPage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/volume-measurement',
        element: (
            <SuspenseWrapper>
                <VolumeMeasurementPage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/measurement-remove',
        element: (
            <SuspenseWrapper>
                <MeasurementRemovePage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/menu-linkage-test',
        element: (
            <SuspenseWrapper>
                <MenuLinkageTestPage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/github-spark',
        element: (
            <SuspenseWrapper>
                <GithubSparkPage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/alpha-earth',
        element: (
            <SuspenseWrapper>
                <AlphaEarthPage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/uiux-menu-test',
        element: (
            <SuspenseWrapper>
                <UiuxMenuTestPage />
            </SuspenseWrapper>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])

export default router
