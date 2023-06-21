'use client'

import '@src/assets/sass/panel.scss'


export default function Login() {
  return (
    <div id="login" className="box">
      <form id="form" onSubmit={() => {}}>
        <div id="brand">
          <a href="/">deziper</a>
        </div>
          <div className="field">
            <label>
              <i className="icon-email"></i>
              <span>Email</span>
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
