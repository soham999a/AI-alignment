import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { Brain, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const { user, signInWithGoogle, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/simulator');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-2xl"
            >
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="size-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20">
                        <Brain className="text-white size-8" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Sign in to access the labs and save your simulations.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl text-sm font-bold text-red-600">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={signInWithGoogle}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 h-14 bg-white dark:bg-black border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-[0.98]"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="size-5" />
                        Continue with Google
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-gray-400">
                            <span className="bg-white dark:bg-gray-900 px-4">Research Access</span>
                        </div>
                    </div>

                    <button
                        disabled
                        className="w-full flex items-center justify-center gap-3 h-14 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-2xl font-bold cursor-not-allowed"
                    >
                        <Mail className="size-5" />
                        Email (Coming Soon)
                    </button>
                </div>

                <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    By continuing, you agree to the Laboratory terms of research and alignment safety.
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
