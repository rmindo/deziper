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
          <h1>Hello, I'm Ruel and I'm a Full Stack Developer</h1>
          <p>Nothing much to see here, this site is just a place that will hold all my knowledge and journey as a developer.</p>
        </div>
      </section>
      <section className="row-2">
        <div className="inner">
          <div className="grid">
            <a href="">
              <strong>Programming</strong>
              <span className="text">All about Development, Code, Tricks, Issues, Data Structure and Algorithms.</span>
              <span className="button-arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="">
              <strong>Security</strong>
              <span className="text">Securing the application, Penetration Testing, Preparing and Mitigation.</span>
              <span className="button-arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="">
              <strong>Blockchain</strong>
              <span className="text">DApp Development, Cypto Invistment, Business, Trading and Analysis.</span>
              <span className="button-arrow">
                <i className="icon-arrow-right"></i>
              </span>
            </a>
            <a href="">
              <strong>Cloud and Network</strong>
              <span className="text">Deplyoment, Infrastructure, System Structure, Network Programming.</span>
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
