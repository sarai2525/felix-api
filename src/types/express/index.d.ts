declare namespace Express {
  interface Request {
    email: string
    password: string
    role?: string
  }
}
