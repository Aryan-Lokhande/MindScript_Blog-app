import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js';
import main from '../configs/gemini.js'

export const addBlog = async (req, res)=>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // check if all fields are present
        if(!title || !imageFile || !description || !category ){
            return res.json({success : false, message: "Missing required fields"});
        }
        const fileBuffer = fs.readFileSync(imageFile.path);

        // uploading image in imagekit
        const responce = await imagekit.upload({
            file : fileBuffer,
            fileName : imageFile.originalname,
            folder: "/blogs"
        });

        // optimizing img through imagekit
        let optimizeImgUrl = imagekit.url({
            path: responce.filePath,
            transformation :[
                { quality : 'auto' }, //Auto Compression
                { format : 'webp' }, // convert to modern format 
                {width : 1280}      // width resize
            ]
        })

        const image = optimizeImgUrl;
        
        await Blog.create({title, subTitle, description, category, image, isPublished});
        res.json({success : true, message: "Blog added successfully"});
    } catch (error) {
        res.json({success : false, message: error.message});
    }
}

export const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({success : true, blogs});
    } catch (error) {
        res.json({success: false, message: error.message});        
    }
}

export const getBlogById = async (req,res)=>{
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            res.json({success: false, message: "Invalid ID"});
        }
        res.json({success : true, blog});        
    }catch(error){
        res.json({success: false, message: error.message});
    }
}

export const deleteBlogById = async (req,res)=>{
    try{
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        //delete all comments associated with blog
        await Comment.deleteMany({blog : id});
        res.json({success : true, message: "Blog Deleted succcessfully"});
        
    }catch(error){
        res.json({success: false, message: error.message});
    }
}

export const togglePublish = async (req,res)=>{
    try{
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: `Blog status updated ${blog.isPublished}`});
    }catch(error){
        res.json({success: false, message: error.message});
    }
}

export const addComment = async (req, res)=>{
    try {
        const {blog, name, content } = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: "Comment add for review"});        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getBlogComments = async (req, res)=>{
    try {
        const {blogId } = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const generateContent = async (req,res) =>{
    try {
        const {prompt} = req.body;
        const content = await main(prompt + " Generate a blog connent for this topic in simple text format (the generated text is directly post on blog without any changes, so don't keep block to fill by me)");
        res.json({success: true, content});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}