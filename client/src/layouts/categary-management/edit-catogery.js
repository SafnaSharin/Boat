import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/categary-management/basiclayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";
function SignUp() {
//   const [agreement, setAgreement] = useState(true);
  const [catogery, setcatogery] = useState("");
  const [image, setImage] = useState(null);
  const {id} =useParams()
  const navigate = useNavigate("");
//   const handleSetAgreement = () => seatAgreement(!agreement);

useEffect(()=>{
  const fetchdetails = async() =>{
      console.log(id);
      try{
          const response = await axios.get(`http://localhost:4000/productRouter/editcatogery/${id}`);
          console.log('hetefffffffffffffffffffff')
          const details =response.data;
          console.log("hello", response.data);
          setcatogery(details.catogery);
          setImage(details.image);

  }
  catch(error) {
      console.log(error);
  }
};
fetchdetails();
},[id]);

  const handleImageChange = (e) => {
    const selectedImages = e.target.files[0];
    console.log("huiiiiiiiiiiiiiiiiiiii", selectedImages)
    setImage(selectedImages);
    
  };


  const handleupdate = async (e) => {
    e.preventDefault();
  
    const url = `http://localhost:4000/productRouter/updating/${id}`; // Replace with your API endpoint
    

    const formData = new FormData(); 
    formData.append("catogery",catogery)
    formData.append('image', image);
    axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        window.location.href = "categary-management";
      })

      .catch((err) => {
        console.log(err);
      }); 
  
  };


//   const handleupdate = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append("catogery", catogery);
//   formData.append('image', image);

//   const url = `http://localhost:4000/productRouter/updating/${id}`; // Replace with your API endpoint
//   const headers = new Headers({
//     "Content-Type": "multipart/form-data",
//   });
  
//   const requestBody = formData;
//   console.log(requestBody);
  
//   const requestOptions = {
//     method: 'PUT', // HTTP method (GET, POST, PUT, DELETE, etc.)
//     headers: headers, // Set headers
//     body: JSON.stringify(requestBody), // Convert the JSON object to a string
//   };
  
//   fetch(url, requestOptions)
  
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json(); // Parse the response body as JSON
//     })
//     .then(data => {
//       // Handle the response data
//       console.log(data);
//       navigate('/categary-management'); 
//     })
//     .catch(error => {
//       // Handle errors
//       console.error('There was a problem with the fetch operation:', error);
//     });

// };


  return (
    <BasicLayout
      
    //   description="Use these awesome forms to login or create a new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Edit Catogery
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox> */}
        {/* <Separator /> */}
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">

            

            <SoftBox mb={2}>
              <SoftInput
                type="catogery"
                placeholder="catogery"
                value={catogery}
                onChange={(e) => setcatogery(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput type="file" accept="image/*" onChange={handleImageChange} />
            </SoftBox>

            <SoftBox mt={4} mb={1}>
              <SoftButton  variant="gradient" color="dark" fullWidth onClick={handleupdate}>
                Update
              </SoftButton>
            </SoftBox>
           
                
              {/* </SoftTypography> */}
            </SoftBox>
          </SoftBox>
        {/* </SoftBox> */}
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
