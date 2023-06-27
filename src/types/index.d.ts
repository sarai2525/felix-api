declare global {
  namespace Express {
    interface Request {
      body: unknown
    }
    // add interface body to Response
    interface Response {
      status: (status: number) => Response
    }
  }
}
