'use client'

import React from 'react'
import {usePathname} from 'next/navigation'

/**
 * Panel styles
 */
import '@src/assets/sass/panel.scss'

/**
 * Components
 */
import Sidebar from '@src/components/panel/sidebar'


export default function Layout({children}: {children: React.ReactNode}) {
  var pathname = usePathname().split('/')[2] ?? 'panel'
  return (
    <React.Fragment>
      {['login', 'setup'].includes(pathname) ? (
        <>{children}</>
      ):(
        <main id="container">
          <Sidebar
            pathname={pathname}
          />
          <div id="content">{children}</div>
        </main>
      )}
    </React.Fragment>
  )
}
