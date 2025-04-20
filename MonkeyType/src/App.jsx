import ResultProvider from './assets/context/ResultPrvider'
import Textarea from './components/TextArea'
import Result from './components/Result'
import Auth from './components/Auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CPS from './components/CPS'

const App = () => {
  return (
    <ResultProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Textarea />} />
          {/* <Route path="/Auth" element={<Auth />} /> */}
          <Route path="/result" element={<Result />} />
          <Route path="/CPS" element={<CPS/>}/>
          <Route path="/Auth"element={<Auth/>}/>
        </Routes>
      </Router>
    </ResultProvider>
  )
}

export default App