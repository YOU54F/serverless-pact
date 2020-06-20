import { app } from './handler'
// import { Router } from './router'

import serverless from 'serverless-http'

export const run = serverless(app)
