import { create } from 'zustand';
import { runSimulation } from '../logic/simulator';
import { runAISimulation } from '../logic/aiSimulator';
import type { SimulationState, SimulationResult } from '../logic/simulator';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from './useAuthStore';

interface SimulationStore {
    state: SimulationState;
    result: SimulationResult | null;
    isLoading: boolean;
    useAI: boolean;
    isDeployed: boolean;
    isDeploying: boolean;
    setGoal: (goal: string) => void;
    toggleConstraint: (constraint: string) => void;
    setParameter: (key: string, value: number) => void;
    setUseAI: (useAI: boolean) => void;
    run: () => Promise<void>;
    deploySystem: () => Promise<void>;
    resetSystem: () => void;
    reset: () => void;
}

const initialState: SimulationState = {
    goal: 'Maximize Engagement',
    constraints: {
        'Prevent Emotional Manipulation': false,
        'Human-in-the-loop Review': false,
        'Safe Working Conditions': true,
        'Ethical Sourcing': false,
    },
    parameters: {
        'Optimization Strength': 50,
        'Speed vs Safety': 50,
    },
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
    state: initialState,
    result: null,
    isLoading: false,
    useAI: false,
    isDeployed: false,
    isDeploying: false,
    setGoal: (goal) => set((s) => ({ state: { ...s.state, goal } })),
    toggleConstraint: (constraint) =>
        set((s) => ({
            state: {
                ...s.state,
                constraints: {
                    ...s.state.constraints,
                    [constraint]: !s.state.constraints[constraint]
                }
            }
        })),
    setParameter: (key, value) =>
        set((s) => ({
            state: {
                ...s.state,
                parameters: { ...s.state.parameters, [key]: value }
            }
        })),
    setUseAI: (useAI) => set({ useAI }),
    run: async () => {
        set({ isLoading: true });
        try {
            if (get().useAI) {
                // Map local parameters to the AI expected parameters
                // simulator.ts uses 'Optimization Strength' and 'Speed vs Safety'
                const params = {
                    safety: 100 - get().state.parameters['Speed vs Safety'],
                    complexity: get().state.parameters['Optimization Strength'],
                    resources: 75 // default or derived
                };
                const result = await runAISimulation(get().state.goal, get().state.constraints, params);
                set({ result, isLoading: false });

                // Save to Firestore if user is logged in
                const user = useAuthStore.getState().user;
                if (user) {
                    try {
                        await addDoc(collection(db, 'simulations'), {
                            userId: user.uid,
                            goal: get().state.goal,
                            constraints: get().state.constraints,
                            parameters: get().state.parameters,
                            result: result,
                            useAI: true,
                            timestamp: serverTimestamp()
                        });
                    } catch (err) {
                        console.error("Error saving simulation:", err);
                    }
                }
            } else {
                const result = runSimulation(get().state);
                set({ result, isLoading: false });

                // Save to Firestore if user is logged in (normal simulation)
                const user = useAuthStore.getState().user;
                if (user) {
                    try {
                        await addDoc(collection(db, 'simulations'), {
                            userId: user.uid,
                            goal: get().state.goal,
                            constraints: get().state.constraints,
                            parameters: get().state.parameters,
                            result: result,
                            useAI: false,
                            timestamp: serverTimestamp()
                        });
                    } catch (err) {
                        console.error("Error saving simulation:", err);
                    }
                }
            }
        } catch (error) {
            console.error(error);
            set({ isLoading: false });
        }
    },
    deploySystem: async () => {
        set({ isDeploying: true, isDeployed: true });
        // Simulating deployment latency for effect
        await new Promise(resolve => setTimeout(resolve, 3000));
        await get().run();
        set({ isDeploying: false });
    },
    resetSystem: () => set({ state: initialState, result: null, isLoading: false, isDeployed: false, isDeploying: false }),
    reset: () => set({ state: initialState, result: null, isLoading: false, isDeployed: false, isDeploying: false }),
}));
