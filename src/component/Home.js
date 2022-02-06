import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import env from 'react-dotenv'
import axios from 'axios';
function Home(){

    let [business,setBusiness] = useState([]);

    let navigate = useNavigate();

    useEffect(()=>{
        getData();
    },[])

    let getData = async()=>{
        let res = await axios.get(env.API_URL)
        setBusiness(res.data.data)
    }


    let handleDelete = async(id)=>{
        let confirmation = window.confirm('Do you wish to delete?')
        if(confirmation)
        {
            let res = await axios.delete(`${env.API_URL}${id}`)
            if(res.data.statusCode===200)
            {
                // alert(res.data.message);
                getData();
            }
        }
        
    }

    return <>
       <table className="table table-dark">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Business Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope='col'>Address</th>
            <th scope='col'>City</th>
            <th scope='col'>State</th>
            <th scope='col'>Pincode</th>
            <th scope='col'>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                business.map((e,i)=>{
                    return <tr key={e._id}>
                        <td>{i+1}</td>
                        <td>{e.businessName}</td>
                        <td>{e.email}</td>
                        <td>{e.mobile}</td>
                        <td>{e.address}</td>
                        <td>{e.city}</td>
                        <td>{e.state}</td>
                        <td>{e.pincode}</td>
                        <td>
                            <button className="btn btn-primary" onClick={()=>navigate(`/edit-business/${e._id}`)}>Edit</button>
                            &nbsp;
                            &nbsp;
                            <button className="btn btn-danger" onClick={()=>handleDelete(e._id)}>Delete</button>
                            </td>
                    </tr>
                })
            }
        </tbody>
</table>
    </>
}
export default Home;