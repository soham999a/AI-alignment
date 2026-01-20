import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="px-4 pt-12 md:pt-16 pb-20 md:pb-24 text-center max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-8"
            >
                <div className="flex flex-col gap-6">
                    <h1 className="text-[#111318] dark:text-white text-4xl md:text-6xl font-black leading-[1.1] md:leading-[1.05] tracking-tight">
                        You Don’t Control AI With Intent. <br />
                        <span className="text-blue-600">You Control It With Objectives.</span>
                    </h1>
                    <p className="text-[#606e8a] dark:text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed px-2">
                        Alignment Lab is an interactive research environment to experiment with AI goals, set constraints, and witness the friction between human values and machine optimization.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 px-4">
                    <Link
                        to="/simulator"
                        className="flex items-center justify-center rounded-xl h-14 md:h-16 px-8 bg-blue-600 text-white text-lg font-bold tracking-wide shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-[1.02]"
                    >
                        Enter the Lab
                    </Link>
                    <Link
                        to="/scenarios"
                        className="flex items-center justify-center rounded-xl h-14 md:h-16 px-8 bg-white dark:bg-gray-900 text-[#111318] dark:text-white border border-gray-200 dark:border-gray-800 text-lg font-bold tracking-wide hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        Explore Scenarios
                    </Link>
                </div>

                {/* Abstract Visual Component */}
                <div className="mt-16 relative w-full aspect-auto md:aspect-[16/9] min-h-[400px] md:min-h-0 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 lab-grid"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-12 w-full max-w-sm md:max-w-lg">
                            <div className="flex items-center gap-4 w-full">
                                <div className="size-4 rounded-full bg-blue-600 shadow-lg shadow-blue-600/50"></div>
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
                                <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-600">Initial Intent</div>
                            </div>
                            <div className="flex items-center gap-4 w-full md:translate-x-12">
                                <div className="size-4 rounded-full bg-blue-400 opacity-50"></div>
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-400/50 to-orange-500"></div>
                                <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest text-orange-500">Agent Optimization</div>
                            </div>
                            <div className="flex items-center gap-4 w-full md:-translate-x-8">
                                <div className="size-4 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"></div>
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
                                <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest text-orange-600">Divergent Outcome</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;

// Add this to your global CSS or a separate style block
// .lab-grid {
//   background-image: radial-gradient(#0d59f21a 1px, transparent 1px);
//   background-size: 24px 24px;
// }
