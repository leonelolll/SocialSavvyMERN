import plans from '../model/planModel.js';

// Get all subscription plans
export const getAllPlans = async(req, res) => {
    res.status(200).json(plans);
};

// Get a specific subscription plan by ID
export const getPlanById = async(req, res) => {
    const plan = plans.find(p => p.id === req.params.id);
    if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json(plan);
};
