import Count from '@components/count.browser'



export default function home({title, content}:any) {
  return (
    <div id="home">
      <section className="row-1">
        <div className="inner">
          <h1>Hello, I'm Ruel and I'm a Software Developer</h1>
          <p>This site serves as my archive for everything related to software engineering, and latest tech trends.</p>
          <Count/>
        </div>
      </section>
      <section className="row-2">
        <div className="inner">
          <div className="grid">
            <a href="/code">
              <strong>Code</strong>
              <span className="text">All about Development, Code, Tricks, Issues, Data Structure and Algorithms.</span>
              <span className="arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="/network">
              <strong>Network</strong>
              <span className="text">Network Programming, Deployment, Scalable System and Software Architecture.</span>
              <span className="arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="/security">
              <strong>Security</strong>
              <span className="text">Securing Application, Penetration Testing, Preparing and Mitigation.</span>
              <span className="arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="/tech">
              <strong>Tech and Others</strong>
              <span className="text">Technology, Arts and Design, Idea, Business, Investment, and Others.</span>
              <span className="arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

