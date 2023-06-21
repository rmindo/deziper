'use client'

import {
  usePathname
}
from 'next/navigation'

/**
 * Global styles
 */
import '@src/assets/sass/global.scss'
import '@src/assets/sass/common.scss'


import Panel from '@src/app/panel'
import Header from '@src/components/header'
import Footer from '@src/components/footer'



export default function RootLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname().split('/')[1]

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&amp;display=swap"/>
      </head>
      {pathname == 'panel' ? (
        <body>
          <Panel>{children}</Panel>
        </body>
      ):(
        <body>
          <Header/>
          <main id="content">{children}</main>
          <Footer/>
        </body>
      )}
    </html>
  )
}
