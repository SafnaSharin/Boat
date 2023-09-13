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
const [name, setname] = useState("");
const [title, settitle] = useState("");
const [subtitle, setsubtitle] = useState("");
const [url, seturl] = useState("");
const [image, setImage] = useState(null);
  const {id} =useParams()
  const navigate = useNavigate("");
//   const handleSetAgreement = () => seatAgreement(!agreement);

useEffect(()=>{
  const fetchdetails = async() =>{
      console.log(id);
      try{
          const response = await axios.get(`http://localhost:4000/bannerRouter/editbanner/${id}`);
          console.log('hetefffffffffffffffffffff')
          const details =response.data;
          console.log("hello", response.data);
          setname(details.name);
          settitle(details.title);
          setsubtitle(details.subtitle);
          seturl(details.url);
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
  
    const url = `http://localhost:4000/bannerRouter/update/${id}`; // Replace with your API endpoint
    

    const formData = new FormData(); 
    formData.append("name", name);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("url", url);
    formData.append('image', image);
    axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/banner-management";
      })

      .catch((err) => {
        console.log(err);
      }); 
  
  };




  return (
    <BasicLayout
      
    //   description="Use these awesome forms to login or create a new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Edit Banner
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
                type="name"
                placeholder="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="subtitle"
                placeholder="subtitle"
                value={subtitle}
                onChange={(e) => setsubtitle(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="url"
                placeholder="url"
                value={url}
                onChange={(e) => seturl(e.target.value)}
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
