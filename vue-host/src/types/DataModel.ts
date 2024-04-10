import type { ModuleInfo } from './ModuleInfo'

export type DataModel = {
  [key: string]: {
    modules: ModuleInfo[]
  }
}
