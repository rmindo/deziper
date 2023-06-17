import Header from '@src/components/header'
import Footer from '@src/components/footer'

/**
 * Global styles
 */
import '@src/assets/sass/global.scss'
import '@src/assets/sass/common.scss'



export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&amp;display=swap"/>
      </head>
      <body>
        <Header/>
        <main id="content">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
