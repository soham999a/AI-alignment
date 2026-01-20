import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Play } from 'lucide-react';

interface ScenarioCardProps {
    title: string;
    risk: string;
    description: string;
    onSimulate: () => void;
}

const ScenarioCard = ({ title, risk, description, onSimulate }: ScenarioCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm flex flex-col gap-4 group"
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        {title}
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-1">
                        <AlertCircle size={12} />
                        Risk: {risk}
                    </span>
                </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed min-h-[3rem]">
                {description}
            </p>

            <button
                onClick={onSimulate}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all group-hover:shadow-lg group-hover:shadow-blue-600/20"
            >
                <Play size={14} fill="currentColor" />
                Run in Simulator
                <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </button>
        </motion.div>
    );
};

export default ScenarioCard;
