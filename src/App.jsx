import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Home from './pages/home/Home'
import Testing from './components/Testing'
// import Login from './pages/login/Login'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
// import SignUp from './pages/Signup/Signup'


function App() {
  return (
    <BrowserRouter>

    <Toaster position='top-right'/>
      <Routes path="/*">
        <Route path='/testing' element={<Testing/>} />
        {/* <Route path='/login' element={<Login/>} />
        //<Route path='/signup' element={<SignUp/>} /> */}
        <Route path="/admin/*" element={<Admin />} />
        <Route path='/*' element={<Home/>} />
        
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
