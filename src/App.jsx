import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-red-300 w-full h-screen'></div>
     <p className='text-xl'>Hello world</p>
    </>
  )
}

export default App
