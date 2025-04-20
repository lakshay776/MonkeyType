import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ResultContext } from '../assets/context/ResultContext';
import { useContext } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Correct usage
  const { isLoggedIn, setLoggedIn } = useContext(ResultContext);

  const linkClasses = (path) =>
    `px-4 py-2 rounded-xl transition duration-200 ${
      location.pathname === path || location.pathname.startsWith(path)
        ? 'bg-lime-400 text-zinc-900 font-semibold'
        : 'text-white hover:bg-zinc-700 hover:text-lime-300'
    }`;

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('isLoggedIn', false); // Also clear from localStorage if needed
    navigate('/Auth'); // ✅ Navigate to login
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-700 px-6 py-4 shadow-md font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide">
          TypeX
        </h1>

        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <Link to="/TextArea" className={linkClasses('/TextArea')} aria-label="Home">
                Type test
              </Link>
              <Link to="/CPS" className={linkClasses('/CPS')} aria-label="CPS Test">
                CPS Test
              </Link>
              <Link to="/result" className={linkClasses('/result')} aria-label="User Stats">
                User Stats
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // Only show "Auth" button if we're NOT on the '/Auth' page
            location.pathname !== '/Auth' && (
              <Link to="/Auth" className={linkClasses('/Auth')} aria-label="Authentication">
                Auth
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
