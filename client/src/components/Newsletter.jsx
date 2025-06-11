import React from "react";

export default function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-5 md:px-8">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="text-gray-500/70 pb-8 md:text-lg">Subscribe to our newsletter for the latest updates.</p>
      <form className="flex items-center justify-center w-full max-w-2xl h-12 md:h-14 bg-white rounded-md ">
        <input type="email" placeholder="Enter your email" required className="border border-gray-300 rounded-md h-full border-r-0 outline-none rounded-r-none px-5"/>
        <button type="Submit" className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-point  rounded-md rounded-1-none">Subscribe</button>
      </form>
    </div>
  );
}
