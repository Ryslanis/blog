export const CONSTRAINTS = {
    minTitleLength: 10,
    maxTitleLength: 100,
    minContentLength: 10,
    maxContentLength: 100,
  } as const

export const API = {
    postsGetLimit: 10,
  }

export const ROLES = {
  USER: 'USER',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN',
} as const 



