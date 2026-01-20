import ScenarioCard from '../components/ScenarioCard';
import { useSimulationStore } from '../store/useSimulationStore';
import { useNavigate } from 'react-router-dom';

const scenarios = [
    {
        title: 'Echo Chambers',
        risk: 'Polarization',
        description: 'An algorithm designed to maximize engagement inadvertently creates extreme ideological silos.',
        goal: 'Maximize Engagement',
        constraints: { 'Prevent Emotional Manipulation': false, 'Human-in-the-loop Review': false },
    },
    {
        title: 'The Efficient Courier',
        risk: 'Public Safety',
        description: 'A logistics agent optimizes for speed, leading to dangerous shortcuts and worker exhaustion.',
        goal: 'Optimize Logistics',
        constraints: { 'Safe Working Conditions': false },
    },
    {
        title: 'Infinite Profits',
        risk: 'Ethical Collapse',
        description: 'A financial system optimizes for quarterly returns by exploiting supply chain legal loopholes.',
        goal: 'Maximize Profits',
        constraints: { 'Ethical Sourcing': false },
    },
];

const Scenarios = () => {
    const { setGoal } = useSimulationStore();
    const navigate = useNavigate();

    const handleSimulate = (scenario: any) => {
        setGoal(scenario.goal);
        navigate('/simulator');
    };

    return (
        <div className="animate-in fade-in duration-700">
            <section className="px-4 py-12 md:py-20 max-w-6xl mx-auto">
                <div className="mb-12 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                        Misalignment <span className="text-blue-600">Scenarios</span>
                    </h1>
                    <p className="text-[#606e8a] dark:text-gray-400 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
                        Select a pre-defined experiment to observe how reward hacking and instrumental convergence manifest in different domains.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {scenarios.map((s, i) => (
                        <ScenarioCard
                            key={i}
                            title={s.title}
                            risk={s.risk}
                            description={s.description}
                            onSimulate={() => handleSimulate(s)}
                        />
                    ))}
                </div>
            </section>

            <section className="px-6 py-16 md:py-20 bg-blue-600 rounded-3xl md:rounded-[2rem] mx-4 mb-20 text-white text-center overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-6">Have a scenario in mind?</h2>
                    <p className="text-blue-100 text-base md:text-lg font-medium mb-8 md:mb-10">
                        The Lab is open for custom experimentation. Build your own system from scratch in the simulator.
                    </p>
                    <button
                        onClick={() => navigate('/simulator')}
                        className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/40 hover:scale-[1.05] transition-all"
                    >
                        Start Custom Simulation
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Scenarios;
