import './style.less'

import React from 'react'
import sections from './docs'
import Example from './components/Example'

export default function App() {
  return (
    <div className='App'>
      <div className='App__wrapper'>
        <div className='App__header'>
          <div className='App__title'>Mokia</div>
          <input className='App__search' />
        </div>
        <div className='App__container'>
          {sections.map((section) => (
            <div key={section.title} className='App__section'>
              <div className='App__section-title'>{section.title}</div>
              {section.examples.map((example) => (
                <Example key={example.title} {...example} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
