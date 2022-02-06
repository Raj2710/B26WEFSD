import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import env from 'react-dotenv'
import axios from 'axios';
function Edit(props){
    let params =  useParams()
    let[businessName,setBusinessName]=useState("")
    let [email,setEmail]=useState("")
    let [mobile,setMobile]=useState("")
    let [address,setAddress]=useState("")
    let [city,setCity]=useState("")
    let [state,setState]=useState("")
    let [pincode,setPin]=useState("")

    let navigate = useNavigate();

    let handleSubmit = async()=>{

        let res = await axios.put(`${env.API_URL}${params.id}`,{
            businessName,
            email,
            mobile,
            address,
            city,
            state,
            pincode
        })
        if(res.data.statusCode===200)
        {
            navigate('/');
        }
    }

    let getData = async()=>{
        let res = await axios.get(`${env.API_URL}${params.id}`)
        setBusinessName(res.data.data.businessName)
        setEmail(res.data.data.email)
        setMobile(res.data.data.mobile)
        setAddress(res.data.data.address)
        setCity(res.data.data.city)
        setState(res.data.data.state)
        setPin(res.data.data.pincode)
    }

    useEffect(()=>{
        getData()
    },[])

    return <>
        <form>
            <div className="form-group">
                <label >Business Name</label>
                <input type="text" value ={businessName} className="form-control" placeholder="Enter Business Name" onChange={(e)=>setBusinessName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >Email</label>
                <input type="email" value={email} className="form-control"  placeholder="Enter Business Email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >Mobile</label>
                <input type="text" value={mobile} className="form-control"  placeholder="Enter Business Mobile" onChange={(e)=>setMobile(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >Address</label>
                <input type="text" value={address} className="form-control"  placeholder="Enter Business Address" onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >City</label>
                <input type="email" value={city} className="form-control"  placeholder="Enter City" onChange={(e)=>setCity(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >State</label>
                <input type="email" value={state} className="form-control"  placeholder="Enter State" onChange={(e)=>setState(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >Pin Code</label>
                <input type="email" value={pincode} className="form-control"  placeholder="Enter Pincode" onChange={(e)=>setPin(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>
        </form>
    </>
}
export default Edit;