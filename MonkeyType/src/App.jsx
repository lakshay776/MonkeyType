import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import TextArea from './components/TextArea'
import Result from './components/Result'


function App() {
  return (
   
      <Router>
        <nav>
          <Link to="/">TEST</Link>
          <Link to="/stats">Results</Link>
        </nav>
        <Routes>
          <Route path='/' element={<TextArea />} />
          <Route path='/stats' element={<Result />} />
        </Routes>
      </Router>

  )
}

export default App
