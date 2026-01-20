import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthStore } from '../store/useAuthStore';

interface ReflectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    simulationId?: string;
}

const ReflectionModal = ({ isOpen, onClose, simulationId }: ReflectionModalProps) => {
    const [reflection, setReflection] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuthStore();

    const handleSubmit = async () => {
        if (!reflection.trim() || !user) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'reflections'), {
                userId: user.uid,
                simulationId: simulationId || null,
                reflection: reflection.trim(),
                timestamp: serverTimestamp(),
            });
            onClose();
            setReflection('');
        } catch (error) {
            console.error('Error saving reflection:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 max-w-lg w-full shadow-2xl border border-gray-100 dark:border-gray-800">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                                            What surprised you?
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Your insights help us understand learning paths
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <textarea
                                value={reflection}
                                onChange={(e) => setReflection(e.target.value)}
                                placeholder="What surprised you most about this simulation? What did you learn?"
                                className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />

                            <div className="flex items-center gap-3 mt-6">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!reflection.trim() || isSubmitting}
                                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Saving...' : 'Share Reflection'}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 text-gray-600 dark:text-gray-400 font-bold hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    Skip
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ReflectionModal;
