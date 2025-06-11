import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Moment from "moment";
import Footer from "../components/Footer";

export default function Blog() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    setComments(comments_data);
    // setComments(comments_data.filter((comment) => comment._id === id));
  };

  const fetchBlogData = async () => {
    const data = blog_data.find((item) => {
      if (item._id === id) {
        setData(item);
      }
    });
  };
  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);
  return data ? (
    <div className="relative">
      <img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-1 opacity-50"/>
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on &nbsp; {Moment(data.createdAt).format("ll")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 mt-2">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border border-primary/40 font-medium text-primary/90 bg-primary/5">
          John Wick
        </p>
      </div>
      <div className="max-w-5xl md:mx-auto mt-6 mx-5 my-10">
        <img src={data.image} alt="thumbnail" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        {/* comment section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="relative bg-primary/3 border border-primary/5 max-w-xl p-4 rounded text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{comment.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{comment.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(comment.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-10 py-2" >
            <div className="font-semibold mb-4">Add your comment</div>
            <form className="flex flex-col items-start gap-4 max-w-lg">
              <input onChange={(e)=> setName(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded outline-none" required placeholder="Name" value={name}/>

              <textarea onClick={(e)=> setContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none h-48" placeholder="Comment" required value={content}></textarea>
              
              <button type="submit" className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer">Submit</button>
            </form>
          </div>
          
        </div>
      </div>
          {/* Social media icons for sharing */}
          <div className="my-10 px-5 max-w-3xl mx-auto">
            <p className="font-semibold my-2">Share this article on social media</p>
            <div className="flex">
              <img src={assets.facebook_icon} alt="" width={50}/>
              <img src={assets.twitter_icon} alt="" width={50}/>
              <img src={assets.googleplus_icon} alt="" width={50}/>
            </div>
          </div>
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );
}
