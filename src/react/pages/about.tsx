import Count from '@components/count.browser'


export default function({title}:any) {
  return (
    <div id="about" className="inner">
      <h1>{title}</h1>
      <p>React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps.</p>
      <Count/>
    </div>
  )
}