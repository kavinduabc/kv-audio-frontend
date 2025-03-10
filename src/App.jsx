import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Home from './pages/home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/admin/*" element={<Admin />} />
        <Route path='/*' element={<Home/>} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
