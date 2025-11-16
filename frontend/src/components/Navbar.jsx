import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-pink-500 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">MultiClient App</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
