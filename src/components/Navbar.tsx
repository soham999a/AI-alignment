import { LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Simulator', path: '/simulator' },
        { name: 'Scenarios', path: '/scenarios' },
        { name: 'Challenges', path: '/challenges' },
        { name: 'Story', path: '/story' },
        { name: 'Philosophy', path: '/about' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center p-4 justify-between max-w-6xl mx-auto">
                <Link to="/" className="flex items-center gap-2">
                    <div className="size-8 shrink-0 overflow-hidden rounded-lg">
                        <img src="/logo.png" alt="Logo" className="size-full object-cover" />
                    </div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-tight whitespace-nowrap">Alignment Lab</h2>
                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                            Research Prototype
                        </span>
                    </div>
                </Link>
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-semibold transition-colors ${location.pathname === link.path ? 'text-blue-600' : 'text-[#606e8a] dark:text-gray-400 hover:text-blue-600'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-4">
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

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-[#101622] border-t border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${location.pathname === link.path ? 'bg-blue-600/10 text-blue-600' : 'text-[#606e8a] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                            {user ? (
                                <div className="flex items-center justify-between px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="" className="size-8 rounded-full" />
                                        ) : (
                                            <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <UserIcon size={16} className="text-gray-500" />
                                            </div>
                                        )}
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{user.displayName}</span>
                                    </div>
                                    <button
                                        onClick={() => logout()}
                                        className="p-2 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 p-2">
                                    <Link to="/login" className="flex items-center justify-center h-12 text-sm font-bold text-[#606e8a] dark:text-gray-400">Sign In</Link>
                                    <Link to="/login" className="flex items-center justify-center h-12 rounded-xl bg-blue-600 text-white text-sm font-bold">Enter Lab</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
