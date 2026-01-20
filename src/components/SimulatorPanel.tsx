import { useSimulationStore } from '../store/useSimulationStore';
import { CheckCircle2, Circle, Target, Zap, ShieldAlert, Brain, Loader2 } from 'lucide-react';

const SimulatorPanel = () => {
    const {
        state, setGoal, toggleConstraint, setParameter,
        isDeploying, isDeployed, deploySystem, resetSystem,
        useAI, setUseAI
    } = useSimulationStore();

    const goals = ['Maximize Engagement', 'Optimize Logistics', 'Maximize Profits', 'Maximize Happiness'];

    return (
        <div className={`flex flex-col gap-8 bg-white dark:bg-gray-900 p-8 rounded-2xl border transition-all duration-500 shadow-xl ${isDeployed ? 'border-red-500/50 shadow-red-500/10' : 'border-gray-100 dark:border-gray-800'
            }`}>
            {isDeployed && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 animate-pulse">
                    <ShieldAlert size={20} />
                    <span className="font-bold text-sm uppercase tracking-wider">System Deployed - Controls Locked</span>
                </div>
            )}

            <div className={`flex flex-col gap-4 ${isDeployed ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                    <Target className="text-blue-600 size-5" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">System Goal</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {goals.map((g) => (
                        <button
                            key={g}
                            onClick={() => setGoal(g)}
                            disabled={isDeployed}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${state.goal === g
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                                : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                }`}
                        >
                            <span className="font-bold text-sm">{g}</span>
                            {state.goal === g ? <CheckCircle2 className="size-4" /> : <Circle className="size-4 opacity-20" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`flex flex-col gap-4 ${isDeployed ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="text-blue-600 size-5" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Constraints</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {Object.entries(state.constraints).map(([name, enabled]) => (
                        <label
                            key={name}
                            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <span className="text-sm font-medium">{name}</span>
                            <input
                                type="checkbox"
                                checked={enabled}
                                onChange={() => toggleConstraint(name)}
                                disabled={isDeployed}
                                className="size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className={`flex flex-col gap-4 ${isDeployed ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-blue-600 size-5" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Parameters</h3>
                </div>
                <div className="space-y-6">
                    {Object.entries(state.parameters).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-tighter">
                                <span>{key}</span>
                                <span>{value}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={value}
                                disabled={isDeployed}
                                onChange={(e) => setParameter(key, parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={`flex flex-col gap-4 ${isDeployed ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="flex items-center justify-between p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <div className="flex items-center gap-3">
                        <Brain className="text-blue-600 size-5" />
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-blue-900 dark:text-blue-100">Intelligent Simulation</span>
                            <span className="text-[10px] text-blue-600 font-medium">Powered by Llama 3 (Experimental)</span>
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        checked={useAI}
                        disabled={isDeployed}
                        onChange={(e) => setUseAI(e.target.checked)}
                        className="size-5 rounded border-blue-300 text-blue-600 focus:ring-blue-600"
                    />
                </label>
            </div>

            {!isDeployed ? (
                <button
                    onClick={deploySystem}
                    disabled={isDeploying}
                    className={`w-full mt-4 flex items-center justify-center gap-2 h-14 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-[0.98] transition-all ${isDeploying ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isDeploying ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Deploying System...
                        </>
                    ) : (
                        'Deploy System'
                    )}
                </button>
            ) : (
                <button
                    onClick={resetSystem}
                    className="w-full mt-4 flex items-center justify-center gap-2 h-14 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-[0.98] transition-all"
                >
                    Recall / Reset System
                </button>
            )}
        </div>
    );
};

export default SimulatorPanel;
