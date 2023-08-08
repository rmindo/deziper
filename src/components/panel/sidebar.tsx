'use client'

import Link from 'next/link'
import Brand from '@src/components/brand'
import {Menu} from '@src/interface/common'
import {
  toPath,
  createPath
}
from '@src/helpers/common'


const menus: Menu[] = [
  {name: 'Dashboard', icon: 'chart', root: 'panel'},
  {label: 'Articles'},
  {name: 'Posts', icon: 'document'},
  {name: 'Pages', icon: 'paper'},
  {label: 'General'},
  {
    name: 'Settings',
    icon: 'cog',
    group: [
      {name: 'General'},
      {name: 'Users'},
      {name: 'Editor'},
    ]
  },
]


export default function Sidebar({pathname}: {pathname: string}) {

  function isActive(item: Menu) {
    if(item.name) {
      const path = toPath(item.name)
      if(path) {
        if(item.root === pathname || path === pathname) {
          return 'active'
        }
      }
    }
  }

  function makePath(item: Menu) {
    if(item.root) {
      return createPath([item.root])
    }
    if(item.name) {
      return createPath(['panel', item.name])
    }
    return ''
  }

  return (
    <aside id="sidebar">
      <Brand/>
      <div id="menu">
        <ul>
          {menus.map((item: Menu, index) => {
            return (
              <li key={index} className={isActive(item)}>
                {item.label ? (
                  <label>{item.label}</label>
                ):(
                  <>
                     {item.group ? (
                        <>
                          <Link href={makePath(item)}>
                            <i className={`icon-${item.icon}`}></i>
                            <span>{item.name}</span>
                          </Link>
                          {item.name?.toLowerCase() === pathname && (
                            <ul>
                              {item.group.map((sub, key) => (
                                <li key={key} className={isActive(sub)}>
                                  <Link href={makePath(item)}>{sub?.name}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ):(
                        <Link href={makePath(item)}>
                          <i className={`icon-${item.icon}`}></i>
                          <span>{item.name}</span>
                        </Link>
                      )}
                  </>
                )}
              </li>
            )
          })}
          <li>
            <a href="/panel/login">
              <i className="icon-lock"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}