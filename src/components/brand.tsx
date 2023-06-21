import Image from 'next/image'
import Logo from '@src/assets/images/logo.svg'


export default function Header() {
  return (
    <div id="brand">
      <a href="/">
        <Image src={Logo} alt="Deziper Logo"/>
      </a>
    </div>
  )
}
