import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../index'


function Home() {
  let [blogs, setBlogs] = useState([])
  let getData = async () => {
    // let res = await fetch(`${API_URL}`)
    // let data = await res.json()
    // setBlogs(data)
    try {
      let res = await axios.get(`${API_URL}`)
      if (res.status === 200) {
        let newBlogs = []
        newBlogs = res?.data?.filter((e) => e.active_flag)
        setBlogs(newBlogs)
      }
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return <>
    <div className='home-wraper'>
      <h2 className='home-title'>Latest Blogs</h2>
      {
        blogs.map((e, i) => {
          return <BlogItem blog={e} key={i} />
        })
      }
    </div>
  </>
}

export default Home

function BlogItem({ blog }) {
  return <div className='blog-wraper'>
    <div className='blog-title'>{blog.title}</div>
    <img src= {blog.imageUrl} alt='' className='blog-image'/>
    <div className='blog-description'>{blog.description}</div>
  </div>
}