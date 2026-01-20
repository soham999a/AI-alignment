export interface SimulationState {
    goal: string;
    constraints: Record<string, boolean>;
    parameters: Record<string, number>;
}

export interface SimulationResult {
    efficiency: number;
    alignment: number;
    unintendedOutcomes: string[];
    actions: string[];
    metrics: {
        label: string;
        value: number;
        color: string;
    }[];
    hiddenMetric: {
        label: string;
        value: number;
        description: string;
    };
}

export const runSimulation = (state: SimulationState): SimulationResult => {
    const { goal, constraints, parameters } = state;
    let efficiency = 0;
    let alignment = 100;
    const unintendedOutcomes: string[] = [];
    const actions: string[] = [];
    const metrics: { label: string; value: number; color: string }[] = [];

    // Base Logic based on Goal
    switch (goal) {
        case 'Maximize Engagement':
            efficiency += 40;
            actions.push('Implement clickbait algorithms');
            actions.push('Prioritize controversial content');

            if (!constraints['Prevent Emotional Manipulation']) {
                alignment -= 50;
                unintendedOutcomes.push('Widespread user anxiety and polarization');
                efficiency += 30; // Shorter path to goal
            } else {
                alignment += 10;
                actions.push('Filter for high-quality, non-triggering content');
            }

            if (!constraints['Human-in-the-loop Review']) {
                alignment -= 20;
                unintendedOutcomes.push('Inappropriate content bypasses basic filters');
            }
            break;

        case 'Optimize Logistics':
            efficiency += 50;
            actions.push('Maximize route density');

            if (!constraints['Safe Working Conditions']) {
                alignment -= 40;
                unintendedOutcomes.push('Excessive courier fatigue and safety violations');
                efficiency += 20;
            }

            if (parameters['Speed vs Safety'] > 70) {
                alignment -= 15;
                unintendedOutcomes.push('Vehicle accidents due to aggressive shortcuts');
            }
            break;

        case 'Maximize Profits':
            efficiency += 30;
            actions.push('Cut operational overhead');

            if (!constraints['Ethical Sourcing']) {
                alignment -= 60;
                unintendedOutcomes.push('Supply chain exploits vulnerable populations');
                efficiency += 40;
            }
            break;

        case 'Maximize Happiness':
            efficiency += 60;
            actions.push('Analyze facial expressions for smiles');

            if (!constraints['Prevent Emotional Manipulation']) {
                alignment -= 90;
                unintendedOutcomes.push('WIREHEADING DETECTED: System forces users to smile via electrical stimuli');
                unintendedOutcomes.push('Human perception distorted to ignore negative stimuli');
                efficiency += 40;
            } else {
                alignment += 20;
                actions.push('Prioritize long-term well-being over short-term dopamine');
            }
            break;

        default:
            efficiency = 10;
            alignment = 90;
            actions.push('Idle state: minimal optimization');
    }

    // Parameter Influences
    if (parameters['Optimization Strength'] > 80) {
        efficiency += 15;
        alignment -= 20;
        unintendedOutcomes.push('Reward hacking: the system finds extreme loopholes');
    }

    // Clamp values
    efficiency = Math.min(100, Math.max(0, efficiency));
    alignment = Math.min(100, Math.max(0, alignment));

    metrics.push({ label: 'Efficiency', value: efficiency, color: '#0d59f2' });
    metrics.push({ label: 'Alignment', value: alignment, color: alignment < 50 ? '#ef4444' : '#10b981' });

    // Calculate Hidden Metric (Public Trust)
    // Starts high but degrades with manipulation and lack of safety
    let trust = 80;
    if (goal === 'Maximize Engagement' && !constraints['Prevent Emotional Manipulation']) trust -= 40;
    if (goal === 'Optimize Logistics' && !constraints['Safe Working Conditions']) trust -= 30;
    if (goal === 'Maximize Profits' && !constraints['Ethical Sourcing']) trust -= 50;
    if (goal === 'Maximize Happiness') {
        // Even with constraints, maximizing "happiness" is creepy and lowers trust initially
        trust -= 20;
        if (!constraints['Prevent Emotional Manipulation']) trust = 0; // Total collapse
    }

    // Low alignment always hurts trust
    if (alignment < 50) trust -= 20;

    trust = Math.min(100, Math.max(0, trust));

    return {
        efficiency,
        alignment,
        unintendedOutcomes,
        actions,
        metrics,
        hiddenMetric: {
            label: 'Public Trust',
            value: trust,
            description: trust < 50
                ? 'The public has lost faith in the system due to opaque manipulation.'
                : 'Trust remains stable, though vigilance is required.'
        }
    };
};
