import {headers} from 'next/headers'

/**
 * Global styles
 */
import '@src/assets/sass/global.scss'
import '@src/assets/sass/common.scss'


import Panel from '@src/app/panel'
import Header from '@src/components/header'
import Footer from '@src/components/footer'



export default function RootLayout({children}: {children: React.ReactNode}) {
  var pathname = headers().get('x-page') ?? ''
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
      </head>
      {pathname == 'panel' ? (
        <body id="panel">
          <Panel>{children}</Panel>
        </body>
      ):(
        <body id="page">
          <Header/>
          <main id="content" className={pathname}>{children}</main>
          <Footer/>
        </body>
      )}
    </html>
  )
}
