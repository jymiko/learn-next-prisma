"use client"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"


const User = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const handleCreateUser = async(e:SyntheticEvent) => {
    e.preventDefault()
    try{
      const body = {email, name}
      await fetch(`/api/user`, {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json'}),
        credentials: 'same-origin',
        body: JSON.stringify(body)
      }).then((result) => {
        console.log(result)
      })
    }catch(e){
      console.error(e)
    }
  }

  const handleFindUser = async(e:SyntheticEvent) => {
    e.preventDefault()
    try{
      await fetch(`/api/user/${emailAddress}`, {
        method: "GET",
        headers: new Headers({ 'Content-Type': 'application/json'}),
      }).then((result) => {
        console.log(result)
      })
    }catch(e){
      console.error(e)
    }
  }
  return (
    <div className="h-screen">
      <form onSubmit={handleCreateUser}>
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" value={email}/>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" value={name}/>
        <button type="submit" disabled={!email || !name}>create</button>
      </form>
      <hr />
      <div>
        <form onSubmit={handleFindUser}>
          <input type="text" onChange={(e) => setEmailAddress(e.target.value)} value={emailAddress} />
          <button type="submit">search</button>
        </form>
      </div>
    </div>
  )
}

export default User