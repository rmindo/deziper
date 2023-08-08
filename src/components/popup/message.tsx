import React from 'react'
import {getStatus} from '@src/helpers/common'


type PopupMessageProps = {
  notify: string,
  status: number,
}

/**
 * Popup message either success or error
 */
export default function PopupMessage({status, notify}: PopupMessageProps) {
  if(notify) {
    return <div className={`popup ${getStatus(status)}`}>{notify}</div>
  }
  return null
}