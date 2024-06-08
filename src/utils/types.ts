import { ROLES } from "./constants"

type ValueOf<T> = T[keyof T]

export type Roles = ValueOf<typeof ROLES>
