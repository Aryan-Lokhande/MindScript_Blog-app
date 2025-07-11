import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Moment from "moment";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function Blog() {
  const { id } = useParams();

  const {axios} = useAppContext();

  const [data, setData] = useState(null);
  const [comment, setComment] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
       try{
         const {data} = await axios.get(`/api/blog/${id}`)
         data.success ? setData(data.blog) : toast.error(data.message);
       } catch(error){
            toast.error(error.message);
       }
  }

   const fetchComments = async () => {
       try{
         const {data} = await axios.post(`/api/blog/comments`, {blogId : id})
         if(data.success){
          setComment(data.comments)
         } else{
          toast.error(data.message);
         }
       } catch(error){
            toast.error(error.message);
       }
   }

   const addComment = async (e) => {
        e.preventDefault();
        try{
        const {data} = await axios.post(`/api/blog/add-comment`, {blog : id, name,
          content
        });
       if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
       }
      else{
        toast.error(data.message)
      }

        } catch(error){
             toast.error(error.message)
        }
   }

  useEffect(() => {
        fetchBlogData()
        fetchComments()
  },[])

  return data ? (
    <div className="relative">
      <img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-1 opacity-50"/>
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on &nbsp; {Moment(data.createdAt).format("ll")}
        </p>
         <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
         <h2 className='my-5 max-w-lg truncate mx-auto' dangerouslySetInnerHTML={{__html: data.subTitle}}></h2>
         <p className="inline-block py-1 px-4 rounded-full mb-6 border border-primary/40 font-medium text-primary/90 bg-primary/5">Aryan Lokhande</p>
       </div>

       <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
         <img src={data.image} alt="image" className='rounded-3xl mb-5'/>
       
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>
       
       <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comment.length}) </p>  
          <div className='flex flex-col gap-4'>
             {comment.map((item, index) => (
              <div key={index} className='bg-primary/8 relative border max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="user" className='w-6' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                 <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                  {Moment(item.createdAt).fromNow()}
                 </div>
              </div>
             ))}
          </div>
           
       </div> 

          <div className="max-w-3xl mx-auto mt-10 py-2" >
            <div className="font-semibold mb-4">Add your comment</div>
            <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' className='w-full p-2 border border-gray-300 rounded outline-none' required/>

              <textarea onChange={(e)=> setContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none h-48" placeholder="Comment" required value={content}></textarea>
              
              <button type="submit" className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer">Submit</button>
            </form>
          </div>

          <div className='my-24 max-w-3xl mx-auto'>
           <p className='font-semibold my-4'>Share this article on social media</p>
            <div className="flex gap-3">
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white shadow-md text-primary hover:scale-105 transition-transform cursor-pointer">
                <i className="fab fa-facebook-f text-xl"></i>
              </div>
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white shadow-md text-primary hover:scale-105 transition-transform cursor-pointer">
                <i className="fab fa-twitter text-xl"></i>
              </div>
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white shadow-md text-primary hover:scale-105 transition-transform cursor-pointer">
                <i className="fab fa-google-plus-g text-xl"></i>
              </div>
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white shadow-md text-primary hover:scale-105 transition-transform cursor-pointer">
                <i className="fa-brands fa-whatsapp text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  ) : <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
       
}

