import React from 'react'
import {useNavigate} from 'react-router-dom'
function Header(){
    let navigate = useNavigate();
    return <>
        <h2 style={{"backgroundColor":"#4287f5","textAlign":"center"}}>
            Business Center
        </h2>
        <button style={{"backgroundColor":"#4287f5","color":"white", "border":"none", "borderRadius":"5px", "height":"30px"}}
        onClick={()=>navigate('/create')}
        >Create Business</button>
    </>
}
export default Header;