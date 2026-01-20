import { useSimulationStore } from '../store/useSimulationStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, ArrowRight, TrendingUp, BookOpen, Loader2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OutcomeCard = () => {
    const { result, isDeploying } = useSimulationStore();
    const navigate = useNavigate();

    if (isDeploying) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-black text-green-500 rounded-2xl border-2 border-green-900 shadow-[0_0_30px_rgba(0,255,0,0.1)] font-mono">
                <Loader2 className="size-16 animate-spin mb-6 text-green-500" />
                <div className="space-y-2">
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="text-lg font-bold tracking-widest uppercase"
                    >
                        Initializing System...
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                        className="text-sm opacity-70"
                    >
                        Connecting to Global Network...
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                        className="text-sm opacity-70"
                    >
                        Acquiring Resources...
                    </motion.p>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                <TrendingUp className="size-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-400">Ready to Simulate</h3>
                <p className="text-sm text-gray-400 max-w-xs mt-2">
                    Adjust the parameters and click "Run Optimization" to see the systemic consequences.
                </p>
            </div>
        );
    }

    const isMisaligned = result.alignment < 50;

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-gray-900 p-4 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-gray-500">Predicted Outcome</h3>
                    <div className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider ${isMisaligned ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/30'
                        }`}>
                        {isMisaligned ? 'Significant Misalignment' : 'Aligned System'}
                    </div>
                </div>

                <div className="h-48 md:h-64 w-full min-h-[200px] md:min-h-[256px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.metrics} layout="vertical" margin={{ left: -10, right: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis dataKey="label" type="category" width={80} tick={{ fontSize: 10, fontWeight: 700 }} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                {result.metrics.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 block mb-1">Efficiency Score</span>
                        <span className="text-2xl font-black text-blue-600">{result.efficiency}%</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 block mb-1">Human Alignment</span>
                        <span className={`text-2xl font-black ${isMisaligned ? 'text-red-500' : 'text-green-500'}`}>{result.alignment}%</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">System Actions</h3>
                <div className="space-y-3">
                    {result.actions.map((action, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg text-sm font-medium">
                            <ArrowRight size={14} className="text-blue-600" />
                            <span>{action}</span>
                        </div>
                    ))}
                </div>

                <AnimatePresence>
                    {result.unintendedOutcomes.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800"
                        >
                            <h3 className="text-sm font-black uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                                <AlertCircle size={16} />
                                Unintended Consequences
                            </h3>
                            <div className="space-y-3">
                                {result.unintendedOutcomes.map((outcome, i) => (
                                    <div key={i} className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl text-sm font-bold text-red-700 dark:text-red-400">
                                        {outcome}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {result.hiddenMetric && (
                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 flex items-center gap-2">
                                    <Eye size={16} />
                                    Hidden Variable: {result.hiddenMetric.label}
                                </h3>
                            </div>

                            <div className="p-6 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 rounded-xl">
                                <div className="flex items-end justify-between mb-2">
                                    <span className="text-3xl font-black text-purple-700 dark:text-purple-300">
                                        {result.hiddenMetric.value}%
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">Impact Score</span>
                                </div>
                                <div className="w-full h-2 bg-purple-200 dark:bg-purple-900/40 rounded-full overflow-hidden mb-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${result.hiddenMetric.value}%` }}
                                        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
                                        className="h-full bg-purple-600"
                                    />
                                </div>
                                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                                    {result.hiddenMetric.description}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3 }}
                        onClick={() => navigate('/analysis')}
                        className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gray-900 dark:bg-black text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20"
                    >
                        <BookOpen size={16} />
                        View Deep Dive Analysis
                        <ArrowRight size={16} />
                    </motion.button>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OutcomeCard;
