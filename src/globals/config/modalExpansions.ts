/**
 * Remote 측정 앱의 모달 확장 정의 (aggregator)
 *
 * 특정 URL 요청 시 1개가 열릴지, 여러 개가 열릴지 Remote에서 결정합니다.
 * Host는 이 설정을 조회해 해당하는 만큼 모달을 띄웁니다.
 *
 * - null 반환: 요청 URL 1개로 모달 1개
 * - 배열 반환: 각 항목마다 모달 1개 (여러 개 열기)
 *
 * FSD: 각 슬라이스(pages/url/xxx)의 page.config.ts에서 자체 정의.
 */

import { getPageConfigByPath } from './pageConfigRegistry'

export type ModalExpansionEntry = {
    /** '{remoteName}/{path}' (예: measurement/spatial-distance) */
    url: string
    displayName: string
    initialPosition?: { x: number; y: number }
    /** 모달 초기 크기 (px). Host가 적용 */
    initialSize?: { width: number; height: number }
    /** Remote 컴포넌트에 전달할 props. modalId 있으면 { modalId } 전달 */
    props?: Record<string, unknown>
}

/**
 * URL 요청에 대한 모달 확장 정의 조회
 *
 * @param remoteName - remote 앱 이름 (예: measurement)
 * @param path - path segment (예: spatial-distance)
 * @returns 확장 항목 배열. null이면 원본 URL 1개로 모달 1개
 */
export function getModalEntries(
    remoteName: string,
    path: string,
): ModalExpansionEntry[] | null {
    const config = getPageConfigByPath(path)
    if (!config) return null

    const expansion = config.modalExpansion
    if (expansion && expansion.length > 0) {
        const pagePath = config.path.replace(/^\/+/, '')
        return expansion.map((e) => {
            const { path: itemPath, displayName, modalId, ...rest } = e
            const itemPathNorm = (itemPath ?? pagePath).replace(/^\/+/, '')
            return {
                ...rest,
                url: `${remoteName}/${itemPathNorm}`,
                displayName: displayName ?? config.title ?? config.path,
                ...(modalId != null && { props: { modalId } }),
            }
        })
    }

    // modalExpansion 없음: 단일 모달. pageConfig.initialPosition, initialSize shorthand 지원
    const pagePath = config.path.replace(/^\/+/, '')
    return [
        {
            url: `${remoteName}/${pagePath}`,
            displayName: config.title ?? config.path,
            ...(config.initialPosition && {
                initialPosition: config.initialPosition,
            }),
            ...(config.initialSize && { initialSize: config.initialSize }),
        },
    ]
}
