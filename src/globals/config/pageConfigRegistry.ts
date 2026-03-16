/**
 * 페이지 설정 레지스트리 (aggregator)
 *
 * 각 슬라이스(pages/url/xxx)의 page.config.ts를 glob으로 수집.
 * - getPageList: Home 메뉴용
 * - getModalEntries: Host 모달용 (동기)
 *
 * eager 로드로 Host의 동기 getModalEntries 요구사항 충족.
 */

import type { PageConfig } from 'src/shared/types/pageConfig'

type PageConfigModule = { pageConfig: PageConfig }

const modules = import.meta.glob<PageConfigModule>(
    'src/pages/url/*/page.config.ts',
    { eager: true },
)

function getConfigs(): PageConfig[] {
    return Object.values(modules)
        .map((mod) => mod?.pageConfig)
        .filter((c): c is PageConfig => Boolean(c))
}

function getConfigsSorted(): PageConfig[] {
    const configs = getConfigs()
    return configs.sort(
        (a, b) =>
            (a.order ?? 999) - (b.order ?? 999) || a.path.localeCompare(b.path),
    )
}

/**
 * 메뉴용 페이지 목록 (path, title). order 기준 정렬
 */
export function getPageList(): { path: string; title: string }[] {
    return getConfigsSorted().map((c) => ({
        path: `/${c.path}`,
        title: c.title ?? c.path,
    }))
}

/** path → PageConfig. 모달용 동기 조회 */
export function getPageConfigByPath(path: string): PageConfig | undefined {
    const key = path.replace(/^\/+/, '')
    return getConfigs().find((c) => c.path === key)
}
