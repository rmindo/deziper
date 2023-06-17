export default function Header() {
  return (
    <header id="header">
      <div className="inner">
        <div id="brand">
          <a href="/">deziper</a>
        </div>
        <nav id="menu">
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div id="links">
          <a href={'/'}>
            <i className="icon-github"></i>
          </a>
          <a href={'/'}>
            <i className="icon-youtube"></i>
          </a>
          <a href={'/'}>
            <i className="icon-twitter"></i>
          </a>
          <a href={'/'}>
            <i className="icon-linkedin"></i>
          </a>
        </div>
      </div>
    </header>
  )
}
