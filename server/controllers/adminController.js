import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js';

export const adminLogin = async (req,res)=>{
    const {email, password} = req.body;
    let role = null;
    let expectedPassword = null;

    try {
        if (email === process.env.ADMIN_EMAIL) {
            role = "admin";
            expectedPassword = process.env.ADMIN_PASSWORD;
        } else if (email === process.env.DEMO_EMAIL) {
            role = "demoUser";
            expectedPassword = process.env.DEMO_PASSWORD;
        } else {
            return res.json({ success : false, message: "User not found" });
        }

        if (password !== expectedPassword) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email, role }, process.env.JWT_SECRET );

        return res.json({success: true, token, role,});
    }catch(err){
        res.json({success : false, message: err.message});
    }
}

export const getAllBlogsAdmin = async (req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({createAt : -1});
        res.json({success : true, blogs});
    } catch (error) {
        res.json({success : false, message: err.message});        
    }
}

export const getAllComments = async (req,res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createAt : -1});
        res.json({success : true, comments});
    } catch (error) {
        res.json({success : false, message: err.message});
    }
}

export const getDashboard = async (req,res)=>{
    try {
        const blogs = await Blog.countDocuments();
        const recentBlogs = await Blog.find({}).sort({createAt : -1}).limit(5);
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});
        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success : true,  dashboardData});
    } catch (error) {
        res.json({success : false, message: err.message});
    }
}

export const deleteCommentById = async (req, res)=>{
    try {
        if (req.user.role !== "admin") {
            return res.json({success: false, message: "Only admin has the auth to DELETE a comment"});
        }
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success : true, message: "Comment Deleted Successfully"});
    } catch (error) {
        res.json({success : false, message: err.message});
    }
}

export const approveCommentByID = async (req, res)=>{
    try {
        if (req.user.role !== "admin") {
            return res.json({success: false, message: "Only admin has the auth to APPROVE Comment"});
        }
        const {id} = req.body;
        console.log(id);
        await Comment.findByIdAndUpdate(id, {isApproved : true});
        res.json({success : true, message: "Comment Approved Successfully"});        
    } catch (error) {
        res.json({success : false, message: err.message});        
    }
}
