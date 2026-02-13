import { Link } from 'react-router'

/**
 * 메뉴 페이지 맵핑 (한글 / 영어 / 경로)
 */
const PAGE_LIST = [
    { path: '/sample', ko: '샘플', en: 'Sample' },
    { path: '/planar-distance', ko: '평면거리', en: 'Planar Distance' },
    { path: '/spatial-distance', ko: '공간거리', en: 'Spatial Distance' },
    { path: '/vertical-distance', ko: '수직거리', en: 'Vertical Distance' },
    { path: '/area-measurement', ko: '면적측정', en: 'Area Measurement' },
    {
        path: '/location-measurement',
        ko: '위치측정',
        en: 'Location Measurement',
    },
    { path: '/volume-measurement', ko: '부피측정', en: 'Volume Measurement' },
    { path: '/measurement-remove', ko: '제거', en: 'Measurement Remove' },
    {
        path: '/menu-linkage-test',
        ko: '메뉴 연계 테스트',
        en: 'Menu Linkage Test',
    },
    { path: '/github-spark', ko: '깃허브스파크', en: 'GitHub Spark' },
    { path: '/alpha-earth', ko: 'AlphaEarth', en: 'Alpha Earth' },
    { path: '/uiux-menu-test', ko: 'UIUX 메뉴 테스트', en: 'UI/UX Menu Test' },
]

/**
 * Remote 앱 메인 뷰 (Host features/Home 구조와 동일)
 */
const Home = () => {
    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-semibold">
                측정 기능 / Measurement
            </h1>
            <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {PAGE_LIST.map(({ path, ko, en }) => (
                    <li key={path}>
                        <Link
                            to={path}
                            className="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
                        >
                            <span className="font-medium text-gray-900">
                                {ko}
                            </span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-gray-600">{en}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
