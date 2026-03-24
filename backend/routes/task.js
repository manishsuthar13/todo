const express = require("express")
const Task = require("../models/Task")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/", auth, async (req, res) => {
    try {
        const { title, description = "", dueDate } = req.body

        if (!title || !title.trim()) {
            return res.status(400).json({ error: "Title is required" })
        }

        const task = await Task.create({
            userId: req.user,
            title: title.trim(),
            description,
            dueDate: dueDate || undefined
        })

        return res.status(201).json(task)
    } catch (e) {
        return res.status(500).json({ error: "Failed to create task" })
    }
})

router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user }).sort({ createdAt: -1 })
        return res.json(tasks)
    } catch (e) {
        return res.status(500).json({ error: "Failed to fetch tasks" })
    }
})

router.put("/:id", auth, async (req, res) => {
    try {
        const { title, description, completed, dueDate } = req.body
        const updates = {}

        if (title !== undefined) updates.title = title
        if (description !== undefined) updates.description = description
        if (completed !== undefined) updates.completed = completed
        if (dueDate !== undefined) updates.dueDate = dueDate || undefined

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user },
            updates,
            { new: true }
        )

        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }

        return res.json(task)
    } catch (e) {
        return res.status(500).json({ error: "Failed to update task" })
    }
})

router.patch("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user
        })

        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }

        task.completed = !task.completed
        await task.save()

        return res.json(task)
    } catch (e) {
        return res.status(500).json({ error: "Failed to update status" })
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user
        })

        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }

        return res.json({ message: "Task deleted" })
    } catch (e) {
        return res.status(500).json({ error: "Failed to delete task" })
    }
})

module.exports = router
