import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-zinc-800 p-4 text-white flex  justify-between  items-center">
      <h1 className="text-xl font-bold">TypeX</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/result" className="hover:underline">User Stats</Link>
      </div>
    </nav>
  )
}

export default Navbar
