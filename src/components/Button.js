import React from 'react'

const Button = ({text,style}) => {
  return (
    <div>
        <button type='button' hover className={style ? style : 'py-1 px-4 rounded-l-full rounded-r-full border bg-transparent'}>
                {text}
        </button>
    </div>
  )
}

export default Button