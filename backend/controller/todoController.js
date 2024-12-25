const TodoModel = require("../models/todoModel")




export const getTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find();

        res.status(200).json({
            isSuccessful: true,
            todos,
        });
    } catch (error) {
        res.status(500).json({
            isSuccessful: false,
            error: error.message,
        });
    }
}

export const addTodos = async (req, res) => {
    try {
        const body = req.body;
        const obj = {
            userId: body.userId,
            task: body.task,
            isCompleted: body.isCompleted
        }

        const modelObj = new TodoModel(obj)

        modelObj.save()
            .then(() => {
                res.status(201).json({
                    isSuccessful: true,
                    message: "Todo created successfully",

                });
            })
            .catch((err) => {
                throw err
            })

    } catch (error) {
        res.status(500).json({
            isSuccessful: false,
            error: error.message,
        });
    }
}

export const updateTodos = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, isCompleted } = req.body;

        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            {
                task,
                isCompleted
            },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                isSuccessful: false,
                error: "Todo not found",
            });
        }

        res.status(200).json({
            isSuccessful: true,
            message: "Todo updated successfully",
            updatedTodo,
        });
    } catch (error) {
        res.status(500).json({
            isSuccessful: false,
            error: error.message,
        });
    }
}

export const deleteTodos = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await TodoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                isSuccessful: false,
                error: "Todo not found",
            });
        }

        res.status(200).json({
            isSuccessful: true,
            message: "Todo deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            isSuccessful: false,
            error: error.message,
        });
    }
}
