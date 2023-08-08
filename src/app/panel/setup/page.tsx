import Setup from '@src/app/panel/setup/submit'


export const metadata = {
  title: 'Getting Started'
}

export default async function Start() {
  return (
    <main id="start" className="box">
      <Setup/>
    </main>
  )
}