import {cors} from '@vindo/cors'
import {server} from '@vindo/core'
import {parser} from '@vindo/body'
import {serve} from '@vindo/static'


/**
 * Local
 */
import reactSSR from './middleware/react'
import response from './middleware/response'
import {ExtendedContext} from './types/common'

/**
 * Instantiate server
 */
const app = server()


/**
 * Custom middleware
 */
app.set(cors())
app.set(parser)
app.set(response)
app.set(reactSSR)
app.set(serve({path: 'src/assets'}))

/**
 * Run the app
 */
app.run((ctx:ExtendedContext) => {
  console.log(`Server running on port ${ctx.env.PORT}`)
})
