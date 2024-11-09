const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));

// Define a basic POST route
app.post('/posts', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
        });

        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(500).json({ message: 'Error saving post' });
    }
});

app.get('/posts', async (req, res) => {
  try {
      const posts = await Post.find();
      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching posts' });
  }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));