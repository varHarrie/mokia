import React from 'react'

export default function Example(props) {
  const { title, signatures, code } = props
  const result = 'result'

  const capitalizedTitle = title[0].toUpperCase() + title.slice(1)

  return (
    <div className='Example'>
      <div className='Example__header'>
        <div className='Example__title'>{capitalizedTitle}</div>
        <div className='Example__signature'>
          <pre>
            <code dangerouslySetInnerHTML={{ __html: signatures }} />
          </pre>
        </div>
      </div>
      <div className='Example__container'>
        <div className='Example__code'>
          <pre>
            <code dangerouslySetInnerHTML={{ __html: code }} />
          </pre>
        </div>
        <div className='Example__result'>{result}</div>
      </div>
    </div>
  )
}
