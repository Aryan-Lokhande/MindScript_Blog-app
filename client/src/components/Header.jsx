import React from "react";
import { assets } from "../assets/assets";

export default function Header() {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="flex justify-center mt-18 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p className="text-sm">New: AI feature integrated</p>
        </div>
      </div>
      <h1 className="text-4xl sm:text-6xl font-semibold text-center ">
        Your own <span className="text-primary">blogging</span>
        <br />
        platform.
      </h1>
      
      <p className="my-5 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-center text-gray-500">
        This is your space to think out loud, to share what matters, and to
        write without filters. Whether it's one word or a thousand, your story
        starts right here.
      </p>

      <form className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 rounded overflow-hidden bg-white">
        <input type="text" placeholder="Search blogs" required className="w-full pl-4 outline-none"/>
        <button type="submit" className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer">Search</button>
      </form>
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1"
      />
    </div>
  );
}
