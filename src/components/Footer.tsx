import { Linkedin, Github, Twitter, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 p-12 mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
                <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2">
                        <div className="text-blue-600 flex size-6 items-center justify-center bg-blue-600/10 rounded">
                            <FlaskConical size={16} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Alignment Lab</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                        A sandbox for exploring AI safety, reward hacking, and instrumental convergence through interactive simulation.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Experiments</h4>
                    <nav className="flex flex-col gap-2">
                        <Link to="/simulator" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Simulator</Link>
                        <Link to="/scenarios" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Scenarios</Link>
                        <Link to="/challenges" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Challenges</Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Resources</h4>
                    <nav className="flex flex-col gap-2">
                        <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">About the Lab</Link>
                        <Link to="/alignment-101" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Alignment 101</Link>
                        <a href="https://github.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                            <Github size={14} /> GitHub
                        </a>
                    </nav>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center gap-4 text-center px-4">
                <div className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-400">
                    <span className="text-blue-600">Alignment Lab v1.0</span> — Research Prototype
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-400 dark:text-gray-500 max-w-md leading-relaxed">
                    Built to explore alignment intuition, not to deploy real-world AI systems.
                </p>
            </div>

            <div className="max-w-6xl mx-auto mt-6 flex justify-center px-4">
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    <a
                        href="https://x.com/dassoham345"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-500 transition-all"
                    >
                        <Twitter size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 group-hover:text-white transition-colors">@dassoham345</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/sohamdev999/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-700 transition-all"
                    >
                        <Linkedin size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 group-hover:text-white transition-colors">LinkedIn</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
