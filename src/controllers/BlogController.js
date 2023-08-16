const BlogModel = require("../models/BlogModel");


//Create New Blog
exports.CreateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.json({ error: 'Title is required!' })
        }
        if (!content) {
            return res.json({ error: 'Content is required!' })
        }

        const newBlog = await BlogModel.create({ title, content });

        res.status(201).json({ status: 'Success', massage: 'New Blog has been Created!', Data: newBlog })


    } catch (error) {
        console.log(error)
    }
}

//Update Blog By Id
exports.UpdateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const { blogId } = req.params;

        await BlogModel.findByIdAndUpdate(blogId, { title, content });

        res.status(200).json({ status: 'Success', massage: 'Blog has been Updated!' })

    } catch (error) {
        console.log(error)
    }
};

//Delete Blog By Id
exports.DeleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await BlogModel.findByIdAndDelete(blogId);

        if (!blog) {
            return res.json({ error: "Blog not found" })
        }

        res.json({ status: 'Success', massage: 'Blog has been Deleted!' })

    } catch (error) {
        console.log(error)
    }
};

//Read Blog By Id
exports.ReadBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await BlogModel.findById(blogId);

        res.status(200).json([blog])

    } catch (error) {
        console.log(error)
    }
};

//All Blog
exports.AllBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find();

        res.status(200).json(blogs)

    } catch (error) {
        console.log(error)
    }
};
