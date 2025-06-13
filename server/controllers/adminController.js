import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js';

export const adminLogin = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD){
            return res.json({success : false, massage: "Invalid Credentials"});
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET );
        res.json({success: true, token});
    }catch(err){
        res.json({success : false, massage: err.message});
    }
}

export const getAllBlogsAdmin = async (req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({createAt : -1});
        res.json({success : true, massage: blogs});        
    } catch (error) {
        res.json({success : false, massage: err.message});        
    }
}

export const getAllComments = async (req,res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createAt : -1});
        res.json({success : true, massage: comments});
    } catch (error) {
        res.json({success : false, massage: err.message});
    }
}

export const getDashboard = async (req,res)=>{
    try {
        const blogs = await Blog.countDocuments();
        const recentBlogs = await Blog.find({}).sort({createAt : -1}).limit(5);
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});
        const DashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success : true, massage: DashboardData});        
    } catch (error) {
        res.json({success : false, massage: err.message});        
    }
}

export const deleteCommentById = async (req, res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success : true, massage: "Comment Deleted Successfully"});        
    } catch (error) {
        res.json({success : false, massage: err.message});        
    }
}

export const approveCommentByID = async (req, res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id, {isApproved : true});
        res.json({success : true, massage: "Comment Approved Successfully"});        
    } catch (error) {
        res.json({success : false, massage: err.message});        
    }
}
