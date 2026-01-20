import { LogOut, User as UserIcon, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
    const { user, logout } = useAuthStore();

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center p-4 justify-between max-w-6xl mx-auto">
                <Link to="/" className="flex items-center gap-2">
                    <div className="text-blue-600 flex size-8 shrink-0 items-center justify-center bg-blue-600/10 rounded-lg">
                        <FlaskConical size={20} />
                    </div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-tight whitespace-nowrap">Alignment Lab</h2>
                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                            Research Prototype
                        </span>
                    </div>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/simulator" className="text-[#606e8a] dark:text-gray-400 text-sm font-semibold hover:text-blue-600 transition-colors">Simulator</Link>
                    <Link to="/scenarios" className="text-[#606e8a] dark:text-gray-400 text-sm font-semibold hover:text-blue-600 transition-colors">Scenarios</Link>
                    <Link to="/challenges" className="text-[#606e8a] dark:text-gray-400 text-sm font-semibold hover:text-blue-600 transition-colors">Challenges</Link>
                    <Link to="/story" className="text-[#606e8a] dark:text-gray-400 text-sm font-semibold hover:text-blue-600 transition-colors">Story</Link>
                    <Link to="/about" className="text-[#606e8a] dark:text-gray-400 text-sm font-semibold hover:text-blue-600 transition-colors">Philosophy</Link>
                </nav>
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || ''}
                                        className="size-5 rounded-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <UserIcon className="size-4 text-gray-500" />
                                )}
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 hidden sm:inline">
                                    {user.displayName?.split(' ')[0]}
                                </span>
                            </div>
                            <button
                                onClick={() => logout()}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Sign Out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="text-[#606e8a] dark:text-gray-400 text-sm font-bold leading-normal tracking-wide">Sign In</Link>
                            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors">Enter Lab</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
