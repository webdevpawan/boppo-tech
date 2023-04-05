const express = require('express');
const mongoose = require("mongoose");

app = express();

const Task = require("./model/taskSchema")
const User = require("./model/userSchema");
const cors = require('cors')
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authMiddleware = require("./middleware/authMiddleware");
const SECRET_KEY = "mysecretkey";

mongoose.connect('mongodb://127.0.0.1:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log('Error connecting to database: ', error));


// Register API
app.post("/api/admin/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if user already exists

        const adminExistsCheck = await Admin.find({ email })
        if (adminExistsCheck.length > 0) {
            return res.status(400).json({ message: "Admin already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const admin = new Admin({
            email,
            password: hashedPassword
        })
        await admin.save();

        // create token of _id
        const token = generateToken(admin._id)
        res.status(201).json({ message: "Admin Created", token: token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

// Log in api

app.post("/api/admin/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(400).json({ message: "Admin does not exist" });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        const token = generateToken(admin._id);
        return res.status(200).json({ message: "Admin logged in ", token: token })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



// Add Task
app.post("/add-task", async (req, res) => {
    try {
        const newTask = new Task({
            task: req.body.task,
            status: req.body.status
        })

        await newTask.save()
        res.send({ status: 1, message: "Task Added successfully", data: newTask })

    } catch (error) {
        res.send({
            status: 0,
            message: `Can not create Task ${error}`
        })
    }
})

// Get Task
app.get("/get-task", authMiddleware, async (req, res) => {
    try {
        const usersData = await Task.find();
        res.send({
            status: 1, message: "Task found successfully", task: usersData
        })
    } catch (error) {
        console.log(error);
    }
})

// Update Task

app.put("/update-task/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
            $set: {
                task: req.body.task,
                status: req.body.status
            }
        }, { new: true });

        res.send({
            status: 1,
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "An error occurred while updating the user" });
    }
});



app.listen("5000", () => {
    console.log("server running on port 5000 ");
})
