import LoginForm from '@src/app/panel/login/form'


export const metadata = {
  title: 'Login'
}

export default function Login() {

  return (
    <main id="login">
      <div className="box">
        <LoginForm/>
      </div>
    </main>
  )
}