import type { PageConfig } from 'src/shared/types/pageConfig'

export const pageConfig: PageConfig = {
    path: 'sample-multi',
    title: '샘플(다중)',
    order: 0,
    modalExpansion: [
        {
            displayName: '샘플 버전 1',
            initialPosition: { x: 0, y: 0 },
            modalId: 'sample-multi1',
        },
        {
            displayName: '샘플 버전 2',
            initialPosition: { x: 24, y: 80 },
            modalId: 'sample-multi2',
        },
    ],
}
