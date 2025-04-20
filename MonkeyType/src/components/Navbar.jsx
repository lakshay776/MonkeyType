import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-xl transition duration-200 ${
      location.pathname === path || location.pathname.startsWith(path)
        ? 'bg-lime-400 text-zinc-900 font-semibold'
        : 'text-white hover:bg-zinc-700 hover:text-lime-300'
    }`;

  return (
    <nav className="bg-zinc-900 border-b border-zinc-700 px-6 py-4 shadow-md font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-lime-400 tracking-wide">
          TypeX
        </h1>
        <div className="flex gap-4">
          <Link to="/" className={linkClasses('/')} aria-label="Home">
            Home
          </Link>
          <Link to="/result" className={linkClasses('/result')} aria-label="User Stats">
            User Stats
          </Link>
          <Link to="/CPS" className={linkClasses('/CPS')} aria-label="CPS Test">
            CPS Test
          </Link>
          <Link to="/Auth" className={linkClasses('/Auth')} aria-label="Authentication">
            Auth
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
