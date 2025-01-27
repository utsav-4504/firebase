import React, { useEffect, useState } from 'react'
import axios from 'axios'
const JsonserverApi = () => {
    const [id,setId] = useState("")
    const [data,setData] = useState({
        name:"",
        age:"",
        gender:""
    })
    const [alldata,setAllData] = useState([])
    const saveData = (e)=>{
        e.preventDefault()
        if(id!=''){
    
          axios.put("http://localhost:3000/users/"+id,data)
          .then((res)=>console.log(res))
        } else {
          
          axios.post("http://localhost:3000/users",data)
          .then((res)=>console.log(res))
        }
         

            disp()
            setData({
              name:"",
              age:"",
              gender:""
            })
            setId("")
    }
    const disp = ()=>{
      axios.get("http://localhost:3000/users")
            .then((res)=>setAllData(res.data))
    }
    const editData = (id)=>{
      axios.patch("http://localhost:3000/users/"+id)
      .then((res)=>setData(res.data))
      setId(id)
    }
    const delData = (id)=>{
      axios.delete("http://localhost:3000/users/"+id)
      .then((res)=>console.log(res))
      disp()
    }
    useEffect(()=>{
      disp()
    },[])
    const handleChange = (e)=>{
       
        const {name,value} = e.target
        setData({
            ...data,
            [name]:value
        })
    }
  return (
    <div>
      <form action="#" method='post' onSubmit={saveData}>
        <label htmlFor="">Name:</label>
        <input type="text" name="name" id="name" onChange={handleChange} value={data.name}/><br /><br />
        <label htmlFor="">Age:</label>
        <input type="number" name="age" id="age" onChange={handleChange} value={data.age}/><br /><br />
        <label htmlFor="">Gender:</label>
        <input type="radio" name="gender" id="gender" value="male" onChange={handleChange} checked={data.gender == "male"}/>Male
        <input type="radio" name="gender" id="gender" value="female" onChange={handleChange} checked={data.gender == "female"}/>Female
        <br /><br />
        <input type="submit" name="save" id="save" value="SaveData" /><br /><br />
        
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            alldata.map((i)=>{
              return (
                <tr>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.age}</td>
                  <td>{i.gender}</td>
                  <td>
                  <button onClick={()=>editData(i.id)}>Edit</button>
                  <button onClick={()=>delData(i.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default JsonserverApi