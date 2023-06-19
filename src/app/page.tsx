import '@src/assets/sass/home.scss'


export const metadata = {
  title: 'Deziper',
  description: 'Personal blog'
}

export default function Home() {
  return (
    <div id="home">
      <section className="row-1">
        <div className="inner">
          <h1>Hello, I'm Ruel and I'm a Software Developer</h1>
          <p>This site serves as my archive for everything related to software engineering, and latest tech trends.</p>
        </div>
      </section>
      <section className="row-2">
        <div className="inner">
          <div className="grid">
            <a href="/code">
              <strong>Code</strong>
              <span className="text">All about Development, Code, Tricks, Issues, Data Structure and Algorithms.</span>
              <span className="button-arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="/security">
              <strong>Security</strong>
              <span className="text">Securing Application, Scanning, Penetration, Preparing and Mitigation.</span>
              <span className="button-arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="/network">
              <strong>Network</strong>
              <span className="text">Deplyoment, Infrastructure, System Structure, Network Programming.</span>
              <span className="button-arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="/others">
              <strong>Tech and Others</strong>
              <span className="text">Technology, Arts and Design, Idea, Business, Investment, and Others.</span>
              <span className="button-arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
