'use client'

import '@src/assets/sass/panel.scss'
import Brand from '@src/components/brand'


export default function Login() {
  return (
    <div id="login" className="box">
      <form id="form" onSubmit={() => {}}>
          <Brand/>
          <div className="field">
            <label>
              <i className="icon-user"></i>
              <span>User Name</span>
            </label>
            <input type="email" onChange={() => {}} required/>
          </div>
          <div className="field" style={{marginBottom: 10}}>
            <label>
              <i className="icon-lock"></i>
              <span>Password</span>
            </label>
            <input type="password" onChange={() => {}} required/>
          </div>
          <div className="action">
            <button
              className="button-1"
              style={{
                width: '100%',
                alignSelf: 'center'
              }}>
              Login
            </button>
          </div>
        </form>
    </div>
  )
}
