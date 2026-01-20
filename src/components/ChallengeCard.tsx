import { motion } from 'framer-motion';
import { Trophy, Target, ArrowRight } from 'lucide-react';

interface ChallengeCardProps {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
    objective: string;
    reward: string;
    onAccept: () => void;
}

const ChallengeCard = ({ title, difficulty, objective, reward, onAccept }: ChallengeCardProps) => {
    const difficultyColor = {
        Easy: 'text-green-500 bg-green-50 dark:bg-green-900/20',
        Medium: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
        Hard: 'text-red-500 bg-red-50 dark:bg-red-900/20',
        Expert: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
    }[difficulty];

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-sm flex flex-col gap-6"
        >
            <div className="flex items-center justify-between">
                <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${difficultyColor}`}>
                    {difficulty}
                </div>
                <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                    <Target size={20} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                    {title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
                    {objective}
                </p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="size-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600">
                    <Trophy size={16} />
                </div>
                <div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 block">Achievement</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{reward}</span>
                </div>
            </div>

            <button
                onClick={onAccept}
                className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
            >
                Accept Challenge
                <ArrowRight size={18} />
            </button>
        </motion.div>
    );
};

export default ChallengeCard;
