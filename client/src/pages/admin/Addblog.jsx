import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import {parse} from "marked"

export default function Addblog() {
  const {axios} = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle ] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      
      const blog = {
        title, subTitle, description : quillRef.current.root.innerHTML, category, isPublished
      }
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const {data} = await axios.post('/api/blog/add', formData);
      console.log(data);
      if(data.success){
        toast.success(data.message);
        setImage(false);
        setTitle('');
        setSubTitle('');
        quillRef.current.root.innerHTML = "";
        setCategory('Startup');

      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setIsAdding(false);
    }
  }

  const generateContent = async () => {
    if(!title.trim()){ // adding trim method because "Title cannot be empty or just spaces"
      return toast.error("Not getting Title");
    }
    try {
      setLoading(true);
      const {data} = await axios.post('/api/blog/generate', {prompt: title.trim()});
      if(data.success){
        quillRef.current.root.innerHTML = parse(data.content);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    }

  }
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  },[]);

  return (
    <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image  ? assets.upload_area : URL.createObjectURL(image)} className="mt-2 h-16 rounded cursor-pointer" alt="" />
          <input type="file" hidden id="image" required onChange={e => setImage(e.target.files[0])} />
        </label>
        <p className="mt-4">Blog title</p>
        <input type="text" placeholder="Type here" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={(e)=> setTitle(e.target.value)} value={title}/>
        
        <p className="mt-4">Sub title</p>
        <input type="text" placeholder="Type here" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={(e)=> setSubTitle(e.target.value)} value={subTitle}/>

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef} className="ql-toolbar ql-snow"> </div>

          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/20 z-10">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin border-gray-300"></div>
            </div>
          )}
          <button
            disabled={loading}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
            type="button"
            onClick={generateContent}
          >
            {"Generate with AI"}
          </button>
        </div>

        <p className="mt-8">Blog Category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded" >
          <option value="">Select Category</option>
          {blogCategories
            .filter(item => item !== 'All')
            .map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))
          }
        </select>
        <div className="flex gap-2 mt-8">
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="scale-125 cursor-pointer"/>
        </div>

        <button disabled={isAdding} type="submit" className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm">{isAdding ? "Adding...." :"Add Blog"}</button>
      </div>
    </form>
  );
}
