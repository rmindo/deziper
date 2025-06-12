import Browser from '@build/browser'
import ReactDOM from 'react-dom/client'
import {createElement as create} from 'react'


const url = new URL(document.scripts.bundle.src)
const get = fetch(
  url.searchParams.get('id')
)

/**
 * Get the props in the backend
 */
async function map(res) {
  const data = await res.json()

  if(data) {
    const Page = Browser[data.name]
    if(Page) {
      ReactDOM.hydrateRoot(document.getElementById('root'), create(Page, data))
    }
  }
}
get.then(map)

/**
 * Live reload for development
 */
function reload({origin}) {
  const port = url.searchParams.get('port')
  if(port) {
    (new EventSource(origin.replace(/\d+/, port))).onmessage = function() {
      location.reload()
    }
  }
}
reload(location)