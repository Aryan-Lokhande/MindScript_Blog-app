import React from "react";
import { assets, footer_data } from "../assets/assets";

export default function Footer() {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-3 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-4 text-sm md:text-base">
            Built using the MERN stack, MindScript is a modern blogging web app designed to give writers a clean, intuitive space to create and share content. Integrated with AI features for content suggestions, it simplifies writing and boosts creativity.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5"> {footer_data.map((section,index)=>(
            <div key={index}>
                <h3 className="font-semibold text-base text-base text-gray-900 md:mb-3 mb-2">{section.title}</h3>
                <ul className="text-sm space-y-1">{section.links.map((link,i)=>(
                    <li key={i}><a href="#" className="hover:underline transition">{link}</a></li>
                ))}</ul>
            </div>))}</div>
      </div>
      <p className="pt-2  text-center text-sm md:text-base text-gray-500/80">
        Made with love - Aryan Lokhande
      </p>
    </div>
  );
}
