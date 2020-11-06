import React, {MouseEvent, useEffect, useRef} from 'react'


type IArr = string

function Table() {
  const arr = useRef<IArr[]>(new Array(10).fill(''))
  useEffect(() => {
    console.log(arr.current)
  }, [])
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e.target)
  }
  return (
    <>
      {arr?.current.map((_, j) => (
        <div key={j} style={{width: '100%', height: '20px', display: 'flex'}}>
          {arr.current.map((_, i) => (
            <div onClick={onClick} className={'cell'} key={i}
                 style={{width: '20px', height: '100%'}}/>
          ))}
        </div>
      ))}
      <style jsx>{`
        .cell {
          border:black 1px solid;
        }
      `}</style>
    </>

  )
}

export default Table