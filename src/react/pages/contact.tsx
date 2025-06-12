import Count from '@components/count.browser'
import Follow from '@components/follow.browser'



export default function contact({title, content}:any) {
  return (
    <div id="contact" className="inner">
      <h1>{title}</h1>
      <textarea cols={30} rows={8}></textarea>
      <div>
        <Follow/>
        <Count label={'Likes'}/>
      </div>
    </div>
  )
}

