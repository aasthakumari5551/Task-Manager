import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newTask = await Task.create({
            userId: req.user.id,
            title,
            description
        });

        return res.status(201).json(newTask);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        return res.json(tasks);
    } catch {
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

        return res.json(task);
    } catch {
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        await Task.findByIdAndDelete(id);

        return res.json({ message: "Task deleted" });
    } catch {
        return res.status(500).json({ message: "Server error" });
    }
};
