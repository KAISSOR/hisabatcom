<!-- import  { useState , React } from "react";
import * as Components from '../../Components';
import {useNavigate} from 'react-router-dom';
import axios from "axios"
user
function Register() {

   const [error , setError] = useState("")
   const navigate = useNavigate
   const [signIn, toggle] = useState(true);
   const [data , setData] = useState({
       CoName: "",
       CoCode: "",
       CoPassword: "",
       CoImage: "",
   });
   const [dataa , setDataa] = useState({
       CoCode: "",
       CoPassword: ""
   }); 
   const handleChange = ({ currentTarget: input}) => {
       setData({...data , [input.name]:input.value})
   };
   const handleChangee = ({ currentTarget: input}) => {
       setDataa({...dataa , [input.name]:input.value})
   };
   const handleSubmit = async (e) => {
       e.preventDefault();
       try{
           const url = "http://localhost:5000/companies/signup";
           const {data: res} = await axios.post(url , data)
           navigate("/login")
           console.log(res.message)

       }catch(error){
           if(error.response && error.response.status >= 400 && error.response.status <= 500 ){
               setError(error.response.data.message)
           }
       }
   };
   const handleSubmitt = async (e) => {
       e.preventDefault();
       try {
         if (!dataa) {
           throw new Error("Please fill out the form completely");
         }
         const url = "http://localhost:5000/companies/signup";
         const response = await axios.post(url, dataa);  // Use response instead of destructuring for clarity
         localStorage.setItem("token", response.data);
         window.location = "/";
       } catch (error) {
         // Handle different error scenarios
         if (error.response && error.response.status >= 400 && error.response.status <= 500) {
           setError(error.response.data.message); // Assuming error response has a message
         } else {
           setError("An unexpected error occurred. Please try again later.");  // Generic message for other errors
         }
       }
   };
toggle
     return(
         <Components.Container>



             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form onSubmit={handleSubmit} enctype="multipart/form-data" >
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Company Name' name = 'CoName' onChange={handleChange} value={data.CoName} required  />
                     <Components.Input type='text' placeholder='Company code' name = 'CoCode' onChange={handleChange} value={data.CoCode} required  />
                     <Components.Input type='password' placeholder='Password' name = 'CoPassword' onChange={handleChange} value={data.CoPassword} required />
                     <Components.Input type='file' name = 'CoImage' onChange={handleChange} value={data.CoImage}  />
                     {error && error.length > 0 && <div>{error}</div>}
                     <Components.Button  type='submit' >Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>


             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form onSubmit={handleSubmitt}>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email' placeholder='Email' name = 'email' onChange={handleChangee} value={dataa.email} required/>
                      <Components.Input type='password' placeholder='Password' name = 'CoPassword' onChange={handleChangee} value={dataa.CoPassword} required />
                      {error && error.length > 0 && <div>{error}</div>}
                      <Components.Button type='submit' >Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>


             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>



         </Components.Container>
     )
}

export default Register; -->