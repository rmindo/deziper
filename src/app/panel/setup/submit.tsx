'use client'

import React from 'react'
import {HTTPResponse} from '@src/interface/common'
import {
  http,
  hooks
}
from '@src/helpers/common'


const initialState = {
  role: 'Administrator',
  email: null,
  confirm: null,
  password: null,
  lastname: null,
  firstname: null,
}

export default function Submit() {
  const info = hooks.useState(initialState)
  const state = hooks.useState({error: null})

  /**
   * Redirect if super user is already exist
   */
  React.useEffect(() => {
    http.get('users', {
      query: {id: 1}
    })
    .then(({data}: any) => {
      if(data) {
        window.location.href = '/panel/login'
      }
    })
  }, [])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        http.post('users', {
          data: info
        })
        .then(({code, message, data: user}: HTTPResponse) => {
          if(code == 201) {
            if(user) {
              window.location.href = '/panel'
            }
          }
          else {
            state.set({error: message})
          }
        })
        .catch((e: any) => console.log(e))
      }}>
      <header>
        <div className="logo">
          <a href="/">
            <i className="icon-box"></i>
          </a>
        </div>
        <div className="heading">
          <h3>Getting Started</h3>
          <p>Create your credential as a super user.</p>
        </div>
      </header>

      {state.error && (
        <p className="error">{state.error}</p>
      )}
      
      <div className="inline">
        <div className="field">
          <label>First Name</label>
          <input type="text" onChange={(e) => info.set({firstname: e.target.value})} required/>
        </div>
        <div className="field">
          <label>Last Name</label>
          <input type="text" onChange={(e) => info.set({lastname: e.target.value})} required/>
        </div>
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" onChange={(e) => info.set({email: e.target.value})} required/>
      </div>
      <div className="field">
        <label>Password</label>
        <input type="password" onChange={(e) => info.set({password: e.target.value})} required/>
      </div>
      <div className="field">
        <label>Confirm Password</label>
        <input type="password" onChange={(e) => info.set({confirm: e.target.value})} required/>
      </div>
      
      <div className="action">
        <button style={{width: '100%'}} className="button-1">Start</button>
      </div>
    </form>
  )
}
