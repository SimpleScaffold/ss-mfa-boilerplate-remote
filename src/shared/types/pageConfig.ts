/**
 * 페이지 메뉴·모달 설정 타입
 *
 * 각 슬라이스(pages/url/xxx)에서 page.config.ts로 정의.
 */

import type { ModalExpansionItem } from './modalExpansion'

export type PageConfig = {
    /** URL path (예: planar-distance) */
    path: string
    /** 메뉴·모달 표시명. 생략 시 path 사용 */
    title?: string
    /** 메뉴 순서 (작을수록 먼저). 없으면 path 기준 */
    order?: number
    /** 단일 모달 시 shorthand. initialPosition만 필요할 때 modalExpansion 대신 사용 */
    initialPosition?: { x: number; y: number }
    /** 모달 설정. 1개=단일 모달, 2개+=다중 모달. displayName 생략 시 title 사용 */
    modalExpansion?: ModalExpansionItem[]
}
