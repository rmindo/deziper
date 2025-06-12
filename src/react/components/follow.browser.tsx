import React from 'react'


export default function Count({label = 'Clicks'}: {label?: string}) {
  const [count, setCount] = React.useState(0)

  return (
    <button
      onClick={() => {
        setCount(count+1)
      }}>
      {count} {label}
    </button>
  )
}