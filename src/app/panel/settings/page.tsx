'use client'

import {hooks} from '@src/helpers/common'


export default function Settings() {
  const state = hooks.useState({loading: false, posts: []})
  return (
    <>
      <header>
        <div className="left">
          <h4>Settings</h4>
        </div>
      </header>
    </>
  )
}
