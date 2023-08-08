import Link from 'next/link'
import Brand from '@src/components/brand'

import {getMenu} from '@src/controllers/pages'


export default async function Header() {
  const pages = await getMenu({topMenu: true})
  return (
    <header id="header">
      <div className="inner">
        <Brand/>
        <nav id="menu">
          {pages.map((item: any) => {
            return (
              <Link href={item.slug == 'home' ? '/' : item.slug}>{item.title}</Link>
            )
          })}
        </nav>
        <div id="links">
          <Link href="https://github.com/rmindo" target="_blank"><i className="icon-github"></i></Link>
          <Link href="https://twitter.com/ruelmindo" target="_blank"><i className="icon-twitter"></i></Link>
          <Link href="https://www.linkedin.com/in/ruelmindo/" target="_blank"><i className="icon-linkedin"></i></Link>
          <Link href="https://www.instagram.com/ruelmindo/" target="_blank"><i className="icon-instagram"></i></Link>
          <Link href="https://www.youtube.com/channel/UCBVUWjYR8vvqzJ2tKH7yqTQ" target="_blank"><i className="icon-youtube"></i></Link>
        </div>
      </div>
    </header>
  )
}
