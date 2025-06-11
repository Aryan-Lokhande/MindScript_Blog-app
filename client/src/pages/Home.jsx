import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Bloglist from '../components/bloglist'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

export default function home() {
  return (
    <div>
        <Navbar />
        <Header />
        <Bloglist />
        <Newsletter />
        <Footer />
      
    </div>
  )
}
