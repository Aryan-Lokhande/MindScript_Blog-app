import jwt from 'jsonwebtoken'

export const addBlog = async (req, res)=>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // check if all fields are present
        if(!title || !imageFile || !description || !category ){
            return res.json({success : false, message: "Missing required fields"});
        }
    } catch (error) {
        res.json({success : false, massage: err.message});
    }
}
