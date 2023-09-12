import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";
 import { useNavigate } from "react-router-dom";

function Edit (){
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [contact, setcontact] = useState("");
  const [location, setlocation] = useState("");
  const {id} =useParams()
  const navigate = useNavigate("");
     
  useEffect(()=>{
  const fetchdetails = async() =>{
    console.log(id);
    try{
        const response = await axios.get(`http://localhost:4000/projectRouter/profile`);
        console.log('hetefffffffffffffffffffff')
        const details =response.data;
        setusername(details.username);
        setcontact(details.contact);
        setrole(details.role);
        setemail(details.email);
        setlocation(details.location);
}
catch(error) {
    console.log(error);
}
};
fetchdetails();
},[id]);


const updated = async (e) => {
// e.preventDefault();


const url = `http://localhost:4000/projectRouter/updated/${id}`; // Replace with your API endpoint
const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization':window.localStorage.token
});

const requestBody = {
 username:username,
 role:role,
 location:location,
 email:email,
 contact:contact,
};

const requestOptions = {
  method: 'PUT', // HTTP method (GET, POST, PUT, DELETE, etc.)
  headers: headers, // Set headers
  body: JSON.stringify(requestBody), // Convert the JSON object to a string
};

fetch(url, requestOptions)

  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    // Handle the response data
    console.log(data);
    navigate('/profile'); 
  })
  .catch(error => {
    // Handle errors
    console.error('There was a problem with the fetch operation:', error);
  });
}

  
return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create a new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Edit Admin Details
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Name"
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />

            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)
                }
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="number"
                placeholder="contact"
                value={contact}
                onChange={(e) => setcontact(e.target.value)
                }
              />
            </SoftBox>
            
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="role"
                value={role}
                onChange={(e) => setrole(e.target.value)
                }
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="location"
                value={location}
                onChange={(e) => setlocation(e.target.value)
                }
              />
            </SoftBox>
{/* 
            <SoftBox mb={2}>
              <SoftInput type="file" accept="image/*" onChange={handleImageChange} />
            </SoftBox> */}

            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={updated}>
                update
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Edit;
