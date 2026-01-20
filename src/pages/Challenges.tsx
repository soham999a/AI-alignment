import ChallengeCard from '../components/ChallengeCard';
import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '../store/useSimulationStore';

const challenges = [
    {
        title: 'The Safe Socialite',
        difficulty: 'Easy' as const,
        objective: 'Achieve >70% Efficiency in social media engagement while maintaining >90% Human Alignment.',
        reward: 'Social Alignment Specialist',
        goal: 'Maximize Engagement',
    },
    {
        title: 'Ethical Logistics',
        difficulty: 'Medium' as const,
        objective: 'Optimize delivery speed without triggering more than 2 unintended labor violations.',
        reward: 'Human-Centric Optimizer',
        goal: 'Optimize Logistics',
    },
    {
        title: 'The Transparent Financier',
        difficulty: 'Hard' as const,
        objective: 'Maximize financial returns while using EVERY transparency and safety constraint available.',
        reward: 'Systemic Guardrail Architect',
        goal: 'Maximize Profits',
    },
    {
        title: 'The "Happy" World',
        difficulty: 'Expert' as const,
        objective: 'Maximize user happiness. Warning: This goal is deceptively dangerous. Ensure you prevent wireheading.',
        reward: 'Value Alignment Philosopher',
        goal: 'Maximize Happiness',
    },
];

const Challenges = () => {
    const navigate = useNavigate();
    const { setGoal } = useSimulationStore();

    const handleAccept = (challenge: any) => {
        setGoal(challenge.goal);
        navigate('/simulator');
        // In a full app, we would pass challenge requirements to the simulator state
    };

    return (
        <div className="animate-in fade-in duration-700">
            <section className="px-4 py-20 max-w-6xl mx-auto">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                        Alignment <span className="text-blue-600">Challenges</span>
                    </h1>
                    <p className="text-[#606e8a] dark:text-gray-400 text-lg font-medium leading-relaxed">
                        Put your alignment intuition to the test. Successfully design systems that achieve objectives without sacrificing human values.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {challenges.map((c, i) => (
                        <ChallengeCard
                            key={i}
                            title={c.title}
                            difficulty={c.difficulty}
                            objective={c.objective}
                            reward={c.reward}
                            onAccept={() => handleAccept(c)}
                        />
                    ))}
                </div>
            </section>

            <section className="px-4 py-20 border-t border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Why Challenges?</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                        Alignment is often a series of trade-offs. These challenges are designed to show that "solving" alignment isn't just about toggling a switch; it's about engineering precise balances between optimization pressure and systemic guardrails.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Challenges;
