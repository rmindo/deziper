'use client'

import {hooks} from '@src/helpers/common'



export default function Search() {
  var input:any = null
  var state:any = hooks.useState({keyword: ''})

  return (
    <div className="tool search">
      <span>
        <input
          type="text"
          ref={(ref) => {
            input = ref
          }}
          onChange={(e) => {
            state.set({keyword: e.target.value})
          }}/>
      </span>
      <span
        className="icon"
        onClick={() => {
          input.focus()
        }}>
        <i className="icon-search"></i>
      </span>
    </div>
  )
}
