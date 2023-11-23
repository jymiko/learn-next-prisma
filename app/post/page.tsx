import { FC, SyntheticEvent, useEffect, useState } from "react";

const getPostData = async() => {
  try{
   const result = await fetch(`http://localhost:3000/api/post/`,{
      method: "GET",
      headers: new Headers({ 'Content-Type': 'application/json'}),
    })
    // console.log(result.json())
    return result.json()
  }catch(e){
    console.error(e)
  }
}



export default async function Post(){
  const dataPost = await getPostData()
  
  return(
    <div className="min-h-screen bg-white">
      <h1>Feed Post</h1>
      <main>
        <div className="flex flex-row gap-4 items-center">
          {dataPost.data.map((item:any, index:number) => (
            <div key={index} className="shadow-lg drop-shadow-lg cursor-pointer p-4 mx-2 rounded-lg">
              <div>{item.title}</div>
              <div>{item.content ? item.content : '-'}</div>
              <span>{item.author['name']}</span> <span>{item.author['email']}</span>
            </div>
          ))}
        </div>
        
      </main>
    </div>
  )
}