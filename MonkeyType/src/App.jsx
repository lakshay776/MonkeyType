// App.jsx
import ResultProvider from './assets/context/ResultPrvider';
import Textarea from './components/TextArea';
import Result from './components/Result';
import Auth from './components/Auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CPS from './components/CPS';
import { useContext } from 'react';
import { ResultContext } from './assets/context/ResultContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <ResultProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Auth" element={<Auth />} />
          <Route
            path="/TextArea"
            element={
              <ProtectedRoute>
                <Textarea />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CPS"
            element={
              <ProtectedRoute>
                <CPS />
              </ProtectedRoute>
            }
          />
          {/* 👇 Add this route at the bottom to handle default redirection */}
          <Route path="/" element={<RedirectHome />} />
        </Routes>
      </Router>
    </ResultProvider>
  );
};

// 👇 Add RedirectHome below the App component
const RedirectHome = () => {
  const { isLoggedIn } = useContext(ResultContext);
  return <Navigate to={isLoggedIn ? '/TextArea' : '/Auth'} replace />;
};

export default App;
