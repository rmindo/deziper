'use client'

import Brand from '@src/components/brand'
import Checkbox from '@src/components/panel/fields/checkbox'
import {HTTPResponse} from '@src/interface/common'
import {
  http,
  hooks,
  getQuery
}
from '@src/helpers/common'


export default function LoginForm() {
  const state = hooks.useState({email: null, password: null})

  return (
  <form
    onSubmit={(e) => {
      e.preventDefault()
      
      http.post('auth', {
        data: state
      })
      .then(({code, message, data: user}: HTTPResponse) => {
        if(code == 200) {
          if(user) {
            window.location.href = getQuery(window.location.href).ref ?? '/panel'
          }
        }
        else {
          state.set({error: message})
        }
      })
      .catch((e: any) => console.log(e))
    }}>
      <Brand/>

      {state.error && (
        <p className="error">{state.error}</p>
      )}
      <div className="field">
        <label>
          <i className="icon-user"></i>
          <span>Email</span>
        </label>
        <input type="email" onChange={(e) => state.set({email: e.target.value})} required/>
      </div>
      <div className="field" style={{marginBottom: 15}}>
        <label>
          <i className="icon-lock"></i>
          <span>Password</span>
        </label>
        <input type="password" onChange={(e) => state.set({password: e.target.value})} required/>
      </div>
      <div className="flex remember">  
        <Checkbox label={'Remember Me'}/>
      </div>
      <div className="action">
        <button style={{width: '100%'}} className="button-1">Login</button>
      </div>
    </form>
  )
}
