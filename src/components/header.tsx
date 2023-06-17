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
          <a href="https://github.com/rmindo" target="_blank"><i className="icon-github"></i></a>
          <a href="https://twitter.com/ruelmindo" target="_blank"><i className="icon-twitter"></i></a>
          <a href="https://www.linkedin.com/in/ruelmindo/" target="_blank"><i className="icon-linkedin"></i></a>
          <a href="https://www.youtube.com/channel/UCBVUWjYR8vvqzJ2tKH7yqTQ" target="_blank"><i className="icon-youtube"></i></a>
        </div>
      </div>
    </header>
  )
}
