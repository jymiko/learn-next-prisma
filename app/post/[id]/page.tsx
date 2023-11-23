"use client"
import { SyntheticEvent, useState } from 'react'

export default function PostById(){
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handlePostData = async(e:SyntheticEvent) => {
    e.preventDefault()
    try{
      const body = {title, content}
      console.log(title,content)
      await fetch(`/api/post`, {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json'}),
        body: JSON.stringify(body)
      }).then((result) => {
        console.log(result)
      })
    }catch(e){
      console.error(e)
    }
  }
  return(
    <div className='min-h-screen bg-white'>
      <form onSubmit={handlePostData}>
      <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="title" value={title}/>
      <input type="text" onChange={(e) => setContent(e.target.value)} placeholder="content" value={content}/>
      <button type="submit" disabled={!title || !content}>create</button>
      </form>
    </div>
  )
}