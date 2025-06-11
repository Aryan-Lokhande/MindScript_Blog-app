import React from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "motion/react"
import BlogCard from "./BlogCard";

export default function bloglist() {
  const [menu, setMenu] = React.useState("All");
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 ralative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button onClick={() => setMenu(item)} className={`cursor-pointer hover:scale-105 transition-all text-gray-500 ${menu === item ? "text-white px-4 pt-0.5": ""} `}>
              {item}
              {menu === item && (<motion.div layoutId="underline" transition={{type: 'spring', damping : 30, stiffness: 500}} className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full "></motion.div>)}              
            </button>
          </div>
        ))}
      </div>
      {/* blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8">
        {blog_data.filter((blog) => {
          if (menu === "All") return true;
          return blog.category === menu;
        }).map((blog) => <BlogCard key={blog._id} blog={blog}/>)}
      </div>
    </div>
  );
}
