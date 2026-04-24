import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-blue-400'
        : 'text-slate-300 hover:text-white'
    }`;

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="text-lg font-bold tracking-tight text-white transition-colors hover:text-blue-400"
          >
            Fullstack Starter
          </NavLink>
          <div className="flex items-center gap-6">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/posts" className={navLinkClass}>
              Posts
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          Built with React 18, Vite, Tailwind CSS & React Router
        </div>
      </footer>
    </div>
  );
}
