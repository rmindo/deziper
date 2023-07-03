import {NextRequest, NextResponse} from 'next/server'

export const config = {
  matcher: [
    '/panel',
    '/panel/:path*',
  ],
}

export async function middleware({url, headers, nextUrl, cookies}: NextRequest) {
  const parsedURL = new URL(url)
  const reqHeader = new Headers(headers)


  const response = NextResponse.next({
    request: {
      headers: (({pathname}: URL) => {
        const path = pathname.split('/')

        if(path.length > 0) {
          reqHeader.set('x-page', path[1])
          reqHeader.set('x-page-panel', path[2])
        }
        return reqHeader
      })
      (parsedURL),
    }
  })

  if(nextUrl.pathname.endsWith('/setup')) {
    return response
  }
  else {
    if(cookies.has('deziper')) {
      /**
       * If it has a session and redirect
       * to login then remomve the cookie to logout
       */
      if(url.match(/\/login/g)) {
        response.headers.set('Set-Cookie', 'deziper=;max-age=0')
      }
      return response
    }
    else {
      /**
       * Redirect to login if there's no cookie with referer url
       */
      if(url.match(/\/panel/g)) {
        nextUrl.pathname = `/panel/login`
        nextUrl.search = `?ref=${encodeURIComponent(url)}`

        if(!url.match(/\/login/g)) {
          return NextResponse.redirect(nextUrl)
        }
      }
    }
  }
  return response
}
 