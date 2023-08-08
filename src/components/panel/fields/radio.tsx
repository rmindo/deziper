'use client'

import {hooks} from '@src/helpers/common'


export default function Radio() {
  var state = hooks.useState({check: false})

  return (
    <span
      className={state.check ? 'radio checked' : 'radio'}
      onClick={() => {
        state.set({check: state.check ? false : true})
      }}>
      {state.check && (
        <i className={'icon-check'}></i>
      )}
    </span>
  )
}
