import plans from '../model/planModel.js';

// Get all subscription plans
export const getAllPlans = async(req, res) => {
    try {
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific subscription plan by ID
export const getPlanById = async(req, res) => {
    try {
        const plan = plans.find(p => p.id === req.params.id);
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
