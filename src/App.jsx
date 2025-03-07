import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='w-full h-screen flex'>
      <div className='w-[300px] h-full bg-green-200'>

      </div>
      <div className='w-full bg-red-900'>
        
      </div>
    </div>
    </>
  )
}

export default App
