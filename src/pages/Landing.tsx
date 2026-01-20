import HeroSection from '../components/HeroSection';
import { AdjustmentsHorizontalIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const FeatureCard = ({ title, description, icon: Icon, colorClass }: any) => (
    <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex flex-col sm:flex-row items-start gap-6 shadow-sm hover:shadow-md transition-shadow">
        <div className={`size-12 md:size-14 shrink-0 rounded-xl flex items-center justify-center ${colorClass}`}>
            <Icon className="size-5 md:size-6" />
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="text-[#111318] dark:text-white text-lg font-bold leading-tight">{title}</h3>
            <p className="text-[#606e8a] dark:text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

const Landing = () => {
    return (
        <div className="animate-in fade-in duration-700">
            <HeroSection />

            <section className="px-4 py-20 max-w-6xl mx-auto">
                <div className="mb-12">
                    <h4 className="text-blue-600 text-xs font-black leading-normal tracking-[0.2em] uppercase mb-2">The Alignment Process</h4>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Three Steps to Safety Research</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Define a Goal"
                        description="Set the reward function and operational boundaries for your AI agent."
                        colorClass="bg-blue-600/10 text-blue-600"
                        icon={AdjustmentsHorizontalIcon}
                    />
                    <FeatureCard
                        title="Watch it Optimize"
                        description="The agent finds the shortest path through the state space, often ignoring human nuances."
                        colorClass="bg-blue-600/10 text-blue-600"
                        icon={BoltIcon}
                    />
                    <FeatureCard
                        title="Observe Misalignment"
                        description="Analyze why the actual outcome diverges from human intent through post-simulation metrics."
                        colorClass="bg-orange-500/10 text-orange-500"
                        icon={ExclamationTriangleIcon}
                    />
                </div>
            </section>

            <section className="px-6 py-24 text-center bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-2xl mx-auto">
                    <p className="text-[#111318] dark:text-white text-3xl font-medium italic leading-snug">
                        "We are building systems smarter than us. The most important challenge of our century is ensuring they want what we want."
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-gray-300 dark:bg-gray-700"></div>
                        <span className="text-[#606e8a] dark:text-gray-500 text-sm font-bold uppercase tracking-widest italic">Alignment Research Institute</span>
                        <div className="h-px w-12 bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
