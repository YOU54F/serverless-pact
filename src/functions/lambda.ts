import { app } from './app'

import serverless from 'serverless-http'

export const run = serverless(app)
