import Chat from './components/Chat'
import About from "./components/About";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Chat />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
