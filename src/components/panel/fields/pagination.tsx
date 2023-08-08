'use client'

import {hooks} from '@src/helpers/common'



export default function Pagination() {
  var state:any = hooks.useState({page: 1})

  return (
    <div className="pagination">
      <span
        className="back"
        onClick={() => {
          state.set({back: true})
        }}>
        <i className="icon-caret-left"></i>
      </span>
      <span className="number">1</span>
      <span
        onClick={() => {
          state.set({next: true})
        }}>
        <i className="icon-caret-right"></i>
      </span>
    </div>
  )
}
