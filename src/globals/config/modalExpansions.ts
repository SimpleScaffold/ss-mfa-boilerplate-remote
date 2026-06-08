import 'src/styles.css'
import { createModalEntries } from '@repo/packages/fe-utils/remote/createModalEntries'
import { getPageConfigByPath } from './pageConfigRegistry'

export type { ModalExpansionEntry } from '@repo/packages/fe-utils/remote/createModalEntries'

export const getModalEntries = (remoteName: string, path: string) =>
    createModalEntries(remoteName, path, getPageConfigByPath)
