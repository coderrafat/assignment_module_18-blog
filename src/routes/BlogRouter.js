const { CreateBlog, AllBlog, DeleteBlog, ReadBlog, UpdateBlog } = require('../controllers/BlogController');

const router = require('express').Router();


router.post('/create-blog', CreateBlog);
router.delete('/delete-blog/:blogId', DeleteBlog)
router.get('/blog/:blogId', ReadBlog)
router.post('/update-blog/:blogId', UpdateBlog)
router.get('/blogs', AllBlog);



module.exports = router;