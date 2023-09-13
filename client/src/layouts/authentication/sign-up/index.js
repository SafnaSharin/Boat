import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState(""); // Corrected line
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState({}); 
  const navigate = useNavigate("");
  const handleSetAgreement = () => setAgreement(!agreement);

  const handleImageChange = (e) => {
    const selectedImages = e.target.files[0];
    setImage(selectedImages);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({});

    // Validate required fields
    if (!username) {
      setFormErrors({ username: "Username is required" });
      return;
    }

    if (!email) {
      setFormErrors({ email: "Email is required" });
      return;
    }

    if (!password) {
      setFormErrors({ password: "Password is required" });
      return;
    }

    if (!location) {
      setFormErrors({ location: "location is required" });
      return;
    }

    if (!role) {
      setFormErrors({ role: "role is required" });
      return;
    }

    if (!contact) {
      setFormErrors({ contact: "contact is required" });
      return;
    }



    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("role", role);
    formData.append("contact", contact);
    formData.append('image', image);

    console.log(formData);
    axios
      .post("http://localhost:4000/projectRouter/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/authentication/sign-in";
      })

      .catch((err) => {
        console.log(err);
      });
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
            Register with
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
               {formErrors.username && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.username}
                </SoftTypography>
              )}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               {formErrors.password && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.password}
                </SoftTypography>
              )}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               {formErrors.email && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.email}
                </SoftTypography>
              )}
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="number"
                placeholder="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
               {formErrors.contact && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.contact}
                </SoftTypography>
              )}
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="role"
                placeholder="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
               {formErrors.role && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.role}
                </SoftTypography>
              )}
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="location"
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
               {formErrors.location && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.location}
                </SoftTypography>
              )}
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput type="file" accept="image/*" onChange={handleImageChange} />
            </SoftBox>

            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
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
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleFormSubmit}>
                sign up
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

export default SignUp;
