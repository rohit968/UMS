const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');

const Users = require('./models/Users');

app.use(cors({
  origin: true,
  credentials: true,
}));
dotenv.config();
app.use(express.json())

//Databse connection
mongoose.connect(process.env.DATABASE_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post("/adduser", async (req, res) => {
  const { userid, name, email, phone } = req.body;
  try {
    const existingUser = await Users.findOne({ userid });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const createdUser = await Users.create({ userid, name, email, phone });
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(500).json({ error: "User cannot be created" });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await Users.find(); // always returns an array so need length to check it
    if (users.length > 0) {
      return res.status(200).json(users);
    }
    res.status(404).json({ error: "There are no users to display" });
  } catch (err) {
    res.status(500).json({ error: "Server Error. Try Again!!!" });
  }
});

// Update a task by ID
app.put('/user/update/:id', async (req, res) => {
  const id = req.params.id;
  const { userid, name, email, phone } = req.body;

  try {
    // Check if the task exists
    const existingUser = await Users.findOneAndUpdate(id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the User fields
    existingUser.userid = userid;
    existingUser.name = name;
    existingUser.email = email;
    existingUser.phone = phone;

    // Save the updated user
    await existingUser.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ userid: id });
    if (user) {
      return res.status(200).json(user)
    }
  } catch (err) {
    res.status(404).json({ error: "User not found" })
  }
})

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOneAndDelete({ userid: id });
    if (user) {
      return res.status(200).json({ message: "User deleted successfully" })
    }

    res.status(404).json({ error: "User not found" })
  } catch (err) {
    res.status(500).json({ error: "Server Error" })
  }
})

app.get('/test', (req, res) => {
  res.json("Hearing...")
})

app.listen(4001);

