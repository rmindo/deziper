import Header from '@components/header'
import Footer from '@components/footer'


export default function(meta:any) {
  return (
    <html lang="en">
      <head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/assets/styles.css"/>
      </head>
      <body id="root">
        <Header/>
        <main id="content">{meta.content}</main>
        <Footer/>
      </body>
    </html>
  )
}