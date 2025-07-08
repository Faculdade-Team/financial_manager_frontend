import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import SignIn from '../pages/SignIn/SignIn'
import Register from '../pages/Register/Register'
import 'antd/dist/reset.css'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<SignIn />} />
        <>
          <Route path="/register" element={<Register />} />
        </>
      </Routes>
    </BrowserRouter>
  )
}
