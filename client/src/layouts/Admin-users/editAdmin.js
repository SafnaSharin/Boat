import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { useParams, useNavigate } from "react-router-dom";

function Edit () {
  const {id} =useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState(""); // Corrected line
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null); // Corrected line

  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  useEffect(()=>{
    const fetchdetails = async() =>{
        try{
            const response = await axios.get(`http://localhost:4000/projectRouter/editdetails/${id}`);
            console.log('hetefffffffffffffffffffff')
            const details =response.data;
            setUsername(details.username);
            setEmail(details.email);
            setContact(details.contact);
            setPassword(details.password)
            setLocation(details.location);
            setRole(details.role);
            setImage(details.image);

    }
    catch(error) {
        console.log(error);
    }
  };
  fetchdetails();
  },[id]);
  const update = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password || !contact || !role || !location || !image) {
      console.log("Please fill in all required fields.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      formData.append("username", username);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("password", password);
      formData.append("location", location);
      formData.append("role", role);
      formData.append("image", image);
  
      const response = await axios.put(
        `http://localhost:4000/projectRouter/update/${id}`,
        formData, // Use the FormData here
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set appropriate headers for FormData
          },
        }
      );
  
      console.log("Update response:", response.data);
      navigate('/adminUsers');
    } catch (error) {
      console.log("Update error:", error);
    }
  };
  
  const handleImageChange = (e) => {
    const selectedImages = e.target.files[0];
    setImage(selectedImages);

  };

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
                onChange={(e) => setUsername(e.target.value)}
              />
              <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </SoftBox>

            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="number"
                placeholder="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </SoftBox>
            
            <SoftBox mb={2}>
              <SoftInput
                type="role"
                placeholder="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="location"
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput type="file" accept="image/*" onChange={handleImageChange} />
            </SoftBox>

            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={""} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }} // Corrected typo
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={update}>
                update
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                 >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Edit;
