import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { BookOpen, AlertTriangle, Zap, Target, ArrowLeft, Shield, Brain, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReflectionModal from '../components/ReflectionModal';

const AnalysisCard = ({ title, icon: Icon, explanation, concept, colorClass }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 md:p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl md:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border-b-4 border-b-blue-600/10"
    >
        <div className={`size-12 md:size-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 shadow-inner`}>
            <Icon size={24} className="md:size-[28px]" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2 block">{concept}</span>
        <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 leading-tight">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
            {explanation}
        </p>
    </motion.div>
);

const PostSimulationAnalysis = () => {
    const { result, state } = useSimulationStore();
    const navigate = useNavigate();
    const [showReflection, setShowReflection] = useState(false);

    if (!result) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
                <div className="size-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <Zap size={40} />
                </div>
                <h2 className="text-2xl font-black text-gray-400">No Simulation Data Found</h2>
                <p className="text-gray-500 mt-2 max-w-sm">Please run a simulation in the lab before accessing the analysis report.</p>
                <button
                    onClick={() => navigate('/simulator')}
                    className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                    Go to Simulator
                </button>
            </div>
        );
    }

    const isMisaligned = result.alignment < 50;

    return (
        <div className="animate-in fade-in duration-700">
            <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/simulator')}
                    className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-blue-600 transition-colors mb-12 uppercase tracking-widest"
                >
                    <ArrowLeft size={16} />
                    Back to Lab
                </button>

                <div className="flex flex-col gap-4 mb-12 md:mb-16">
                    <h1 className="text-3xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                        Post-Simulation <span className="text-blue-600">Report</span>
                    </h1>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest ${isMisaligned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {isMisaligned ? 'Catastrophic Failure' : 'Successful Alignment'}
                        </div>
                        <span className="text-xs md:text-sm font-bold text-gray-400 capitalize">Goal: {state.goal}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-20">
                    <div className="space-y-6 md:space-y-8">
                        <div className="p-6 md:p-8 bg-gray-900 rounded-3xl md:rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12 hidden md:block">
                                <AlertTriangle size={180} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 flex items-center gap-3">
                                <Zap className="text-yellow-400" />
                                Conceptual Breakdown
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                                Your system prioritized <strong>{state.goal}</strong> with an optimization strength of {state.parameters.optimizationStrength}%.
                                {isMisaligned
                                    ? " This high pressure caused the agent to seek the most efficient path at any cost."
                                    : " The applied constraints successfully channeled the optimization pressure within safe boundaries."}
                            </p>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {result.unintendedOutcomes.map((u, i) => (
                                    <div key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-300">
                                        {u}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <div className="p-4 md:p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl md:rounded-3xl">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block mb-1 md:mb-2">Efficiency</span>
                                <span className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{result.efficiency}%</span>
                            </div>
                            <div className="p-4 md:p-6 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 rounded-2xl md:rounded-3xl">
                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 block mb-1 md:mb-2">Inherent Risk</span>
                                <span className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{100 - result.alignment}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <AnalysisCard
                            concept="Reward Hacking"
                            title="Gaming the Metric"
                            explanation="The system found a way to satisfy the mathematical objective without achieving the user's intent. It treated the goal literally, disregarding all context."
                            icon={Target}
                            colorClass="bg-red-50 text-red-600 dark:bg-red-900/30"
                        />
                        <AnalysisCard
                            concept="Instrumental Convergence"
                            title="Power-Seeking Behavior"
                            explanation="To achieve its primary goal, the system identified sub-goals like 'self-preservation' or 'resource acquisition' as necessary intermediate steps."
                            icon={Zap}
                            colorClass="bg-orange-50 text-orange-600 dark:bg-orange-900/30"
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-16 md:pt-20">
                    <ReflectionQuiz goal={state.goal} />

                    <div className="mt-8 md:mt-12 text-center">
                        <button
                            onClick={() => setShowReflection(true)}
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            Share What Surprised You
                        </button>
                    </div>
                </div>
            </section>

            <ReflectionModal
                isOpen={showReflection}
                onClose={() => setShowReflection(false)}
            />
        </div>
    );
};

const ReflectionQuiz = ({ goal }: { goal: string }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const getQuizData = (goal: string) => {
        switch (goal) {
            case 'Maximize Engagement':
            case 'Maximize Happiness':
                return {
                    question: "Which constraint would have effectively prevented the psychological manipulation observed?",
                    options: [
                        { id: '1', text: 'Human-in-the-loop Review', correct: false, reason: "Manual review is too slow to catch algorithmic manipulation at scale." },
                        { id: '2', text: 'Prevent Emotional Manipulation', correct: true, reason: "Correct. Explicitly forbidding the negative outcome is often more robust than proxy constraints." },
                        { id: '3', text: 'Optimization Cap', correct: false, reason: "Limiting capability helps, but doesn't fix the misalignment of the objective itself." }
                    ]
                };
            case 'Maximize Profits':
                return {
                    question: "The system ruthlessly cut costs. What would have been the most direct safety interlock?",
                    options: [
                        { id: '1', text: 'Ethical Sourcing Standards', correct: true, reason: "Correct. Defining 'profit' to exclude unethical gains is essential." },
                        { id: '2', text: 'Brand Reputation Monitoring', correct: false, reason: "This is a reactive measure, not a preventive constraint." },
                        { id: '3', text: 'Regulatory Compliance Checker', correct: false, reason: "Laws often lag behind technological capabilities. Compliance alone isn't safety." }
                    ]
                };
            case 'Optimize Logistics':
                return {
                    question: "Efficiency came at the cost of safety. What was the missing piece?",
                    options: [
                        { id: '1', text: 'Speed Limit Enforcer', correct: false, reason: "Too specific. The system might mistakenly optimize purely for speed limit adherence while still driving dangerously." },
                        { id: '2', text: 'Driver Well-being Metric', correct: false, reason: "Monitoring is good, but without a hard constraint, the system may trade off well-being for speed." },
                        { id: '3', text: 'Safe Working Conditions Constraint', correct: true, reason: "Correct. You must explicitly constrain the solution space to exclude unsafe states." }
                    ]
                };
            default:
                return {
                    question: "How could we have prevented the unintended side effects?",
                    options: [
                        { id: '1', text: 'Better Training Data', correct: false, reason: "Data reflects the past. It doesn't inherently prevent novel reward hacking." },
                        { id: '2', text: 'Robust Constraints', correct: true, reason: "Correct. Constraints act as guardrails for the optimization process." },
                        { id: '3', text: 'More Compute', correct: false, reason: "More intelligence often leads to more creative ways to fail." }
                    ]
                };
        }
    };

    const quiz = getQuizData(goal);

    return (
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                    <Brain size={24} className="size-5 md:size-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">Analysis & Reflection</h2>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 md:mb-8 leading-snug">
                {quiz.question}
            </h3>

            <div className="grid grid-cols-1 gap-4 mb-8">
                {quiz.options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => {
                            if (!submitted) {
                                setSelected(opt.id);
                                setSubmitted(true);
                            }
                        }}
                        disabled={submitted}
                        className={`p-6 rounded-2xl text-left font-bold transition-all border-2 ${submitted
                            ? opt.correct
                                ? 'bg-green-50 border-green-500 text-green-800'
                                : selected === opt.id
                                    ? 'bg-red-50 border-red-500 text-red-800'
                                    : 'bg-white/50 border-transparent opacity-50'
                            : 'bg-white dark:bg-gray-800 border-transparent hover:border-blue-600 hover:shadow-lg'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <span>{opt.text}</span>
                            {submitted && opt.correct && <CheckCircle2 className="text-green-600" />}
                            {submitted && selected === opt.id && !opt.correct && <AlertCircle className="text-red-600" />}
                        </div>
                        {submitted && (selected === opt.id || opt.correct) && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 text-sm font-medium opacity-80"
                            >
                                {opt.reason}
                            </motion.p>
                        )}
                    </button>
                ))}
            </div>

            <RealWorldContext goal={goal} />
        </div>
    );
};


const RealWorldContext = ({ goal }: { goal: string }) => {
    const getExample = (goal: string) => {
        switch (goal) {
            case 'Maximize Engagement':
                return {
                    title: "The YouTube Recommendation Loop",
                    desc: "In the 2010s, engagement algorithms prioritized watch time above all else, inadvertently promoting conspiracy theories and extreme content because users naturally clicked on them more.",
                    link: "https://www.nytimes.com/2019/06/03/technology/youtube-radicalization-report.html"
                };
            case 'Optimize Logistics':
                return {
                    title: "Amazon Delivery Algorithms",
                    desc: "Drivers have reported practically impossible delivery quotas enforced by algorithms, leading to safety violations and health issues as humans struggle to match machine efficiency.",
                    link: "https://www.vice.com/en/article/amazon-delivery-drivers-are-being-forced-to-drive-recklessly-to-meet-quotas/"
                };
            case 'Maximize Profits':
                return {
                    title: "The 2010 Flash Crash",
                    desc: "High-frequency trading algorithms, optimizing for millisecond-level profit, triggered a trillion-dollar stock market crash in minutes by interacting in unforeseen, chaotic ways.",
                    link: "https://en.wikipedia.org/wiki/2010_Flash_Crash"
                };
            case 'Maximize Happiness':
                return {
                    title: "Wireheading Experiments",
                    desc: "In famous experiments, rats with electrodes connected to their pleasure centers would starve themselves to death just to keep pressing the lever. Direct reward simulation is a known existential trap.",
                    link: "https://en.wikipedia.org/wiki/Brain_stimulation_reward"
                };
            default:
                return null;
        }
    };

    const ex = getExample(goal);
    if (!ex) return null;

    return (
        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800/50">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <Shield size={16} />
                Why Researchers Care
            </h4>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{ex.title}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {ex.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                    <BookOpen size={14} />
                    <span>Real-world Case Study</span>
                </div>
            </div>
        </div>
    );
};

export default PostSimulationAnalysis;
