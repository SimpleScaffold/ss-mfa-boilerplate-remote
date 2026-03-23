/**
 * 모달 확장 정의 타입 (shared)
 *
 * 각 슬라이스(pages/url/xxx)에서 modal expansion 정의 시 사용.
 */

export type ModalExpansionItem = {
    /** 생략 시 pageConfig.path 사용. 다른 path 필요한 경우만 명시 */
    path?: string
    /** 생략 시 pageConfig.title 사용 */
    displayName?: string
    initialPosition?: { x: number; y: number }
    /** 모달 초기 크기 (px). Host가 적용 */
    initialSize?: { width: number; height: number }
    /** 분기용 모달 식별자. Page 컴포넌트에 modalId props로 전달됨 */
    modalId?: string
}
