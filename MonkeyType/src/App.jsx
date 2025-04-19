import ResultProvider from './assets/context/ResultPrvider'
import Textarea from './components/TextArea'
import Result from './components/Result'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <ResultProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Textarea />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ResultProvider>
  )
}

export default App