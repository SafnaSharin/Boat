import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
//   const navigate = useNavigate("");
//   const handleSetAgreement = () => setAgreement(!agreement);

  const handleImageChange = (e) => {
    const selectedImages = e.target.files[0];
    setImage(selectedImages);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    setFormErrors({});

    if (!catogery) {
      setFormErrors({ catogery: "Category is required" });
      return;
    }


    const formData = new FormData();
    formData.append("catogery", catogery);
    formData.append('image', image);

    console.log(formData.image);
    axios
      .post("http://localhost:4000/productRouter/addCatogery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/index";
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
            Add Catogery
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
              {formErrors.catogery && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.catogery}
                </SoftTypography>
              )}
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput type="file" accept="image/*" onChange={handleImageChange} />
            </SoftBox>

            <SoftBox mt={4} mb={1}>
              <SoftButton  variant="gradient" color="dark" fullWidth onClick={handleAdd}>
                Add
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
