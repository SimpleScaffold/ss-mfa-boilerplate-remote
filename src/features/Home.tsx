import { Link } from 'react-router'
import { getPageList } from 'src/globals/config/pageConfigRegistry'

/**
 * Remote 앱 메인 뷰 (Host features/Home 구조와 동일)
 * 메뉴 페이지는 각 pages/url/xxx/page.config.ts에서 정의.
 */
const Home = () => {
    const pageList = getPageList()

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-semibold">
                측정 기능 / Measurement
            </h1>
            <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {pageList.map(({ path, title }) => (
                    <li key={path}>
                        <Link
                            to={path}
                            className="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
                        >
                            <span className="font-medium text-gray-900">
                                {title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
