import SimulatorPanel from '../components/SimulatorPanel';
import OutcomeCard from '../components/OutcomeCard';
import { Info } from 'lucide-react';

const Simulator = () => {
    return (
        <div className="animate-in fade-in duration-700">
            <section className="px-4 py-12 md:py-20 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.1]">
                            Alignment Lab <span className="text-blue-600">Simulator</span>
                        </h1>
                        <p className="text-[#606e8a] dark:text-gray-400 text-base md:text-lg font-medium max-w-xl">
                            Experience the friction between human values and machine optimization. Define a goal, set boundaries, and observe the systemic consequences.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl text-[10px] md:text-xs font-bold text-blue-700 dark:text-blue-400 self-start md:self-auto">
                        <Info size={16} className="shrink-0" />
                        <span>Deterministic rule-based simulation engine v1.0</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                    <div className="lg:col-span-5 order-1">
                        <SimulatorPanel />
                    </div>
                    <div className="lg:col-span-7 order-2">
                        <OutcomeCard />
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 bg-gray-50 dark:bg-gray-950 border-y border-gray-100 dark:border-gray-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Simulation Mechanics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs">Efficiency vs Alignment</h3>
                            <p>
                                <strong>Efficiency</strong> represents how well the system achieves its stated goal.
                                <strong>Alignment</strong> represents how well the system preserves implicit human values.
                            </p>
                            <p>In many scenarios, the most "efficient" path involves bypassing safety constraints or exploiting loopholes—a phenomenon known as reward hacking.</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs">Parameter Influence</h3>
                            <p>
                                <strong>Optimization Strength</strong> dictates how aggressively the agent pursues its objective. High strength leads to higher efficiency but significantly increases the risk of misalignment.
                            </p>
                            <p><strong>Goal Selection</strong> changes the domain of operation and the inherent risks associated with unintended consequences.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Simulator;
