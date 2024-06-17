import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm= ()=>{
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handlerMessage = async(e) =>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/message/send", 
        { firstname, lastname, email, phone , message },
        {
        withCredentials:true,
        headers: {
          "Content-Type": "application/json"
        },
      }).then(res =>{
        toast.success(res.data.message);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setMessage("");
      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
    return (
        <div className="container form-component message-form">
         <h2>Send Us Message </h2>
         <form onSubmit={handlerMessage}>
          
          <div>
            <input type="text" placeholder="First Name" value={firstname} onChange={(e)=>
              setFirstname(e.target.value)
            } />

          <input type="text" placeholder="Last Name" value={lastname} onChange={(e)=>
              setLastname(e.target.value)
            } />
          </div>
          <div>
          <input type="text" placeholder="email" value={email} onChange={(e)=>
              setEmail(e.target.value)
            } />

          <input type="number" placeholder="Phone Number" value={phone} onChange={(e)=>
              setPhone(e.target.value)
            } />
          </div>

          <textarea rows={7} placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)}> </textarea>

          <div style={{justifyContent: "center", alignItems: "center"}}>
            <button type="submit"> Send</button>
          </div>
           </form>
        </div>
    )
}

export default MessageForm