import { Terminal, Shield, Cpu, BookOpen } from 'lucide-react';

const About = () => {
    return (
        <div className="animate-in fade-in duration-700">
            <section className="px-4 py-20 max-w-4xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                        Lab <span className="text-blue-600">Philosophy</span>
                    </h1>
                    <p className="text-xl text-[#606e8a] dark:text-gray-400 font-medium leading-relaxed">
                        Alignment Lab exists to bridge the gap between abstract AI safety research and tangible engineering experience.
                    </p>
                </div>

                <div className="space-y-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                <Shield size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Safety First</h2>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                We believe that safety is not a "feature" to be added later, but a foundational requirement of system architecture. The Lab focuses on revealing how easy it is for well-intentioned objectives to produce catastrophic results.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="size-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                                <Cpu size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Mechanistic Interpretability</h2>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                By simulating deterministic agents, we allow users to peer into the "black box" of optimization. Understanding why a system fails is the first step toward building one that succeeds.
                            </p>
                        </div>
                    </div>

                    <div className="p-10 bg-gray-900 rounded-[2rem] text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Terminal size={120} />
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <BookOpen size={20} className="text-blue-400" />
                                The Alignment Problem
                            </h3>
                            <p className="text-gray-400 leading-relaxed mb-6 font-medium">
                                "The core of the problem is that we do not know how to specify what we want in a way that is robust to the extreme optimization pressure of modern machine learning."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">AL</div>
                                <div>
                                    <span className="block font-bold">Alignment Lab Research</span>
                                    <span className="text-xs text-gray-500">Core Team</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white text-center">Open Research Framework</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { label: 'Transparency', value: '100% Open Source' },
                                { label: 'Methodology', value: 'Rule-Based Logic' },
                                { label: 'Iteration', value: 'Version 1.0.4' }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-center shadow-sm">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">{item.label}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
