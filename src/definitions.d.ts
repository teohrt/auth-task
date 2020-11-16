// This is needed because our JWT middleware adds user to our request object

interface jwtPayload {
  user: string
  id: number
}

declare namespace Express {
  export interface Request {
    user: jwtPayload
  }
}
