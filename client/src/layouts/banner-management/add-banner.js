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

function AddBanner() {
//   const [agreement, setAgreement] = useState(true);
  const [name, setname] = useState("");
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [url, seturl] = useState("");
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
//   const navigate = useNavigate("");
//   const handleSetAgreement = () => setAgreement(!agreement);

  const handleImageChange = (e) => {
    const selectedImages = e.target.files[0];
    setImage(selectedImages);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    setFormErrors({});

    if (!name) {
      setFormErrors({ name: "Name is required" });
      return;
    }

    if (!title) {
      setFormErrors({ title: "Title is required" });
      return;
    }

    if (!subtitle) {
      setFormErrors({ subtitle: "Subtitle is required" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("url", url);
    formData.append('image', image);

    console.log(formData.image);
    console.log(formData);
    axios
      .post("http://localhost:4000/bannerRouter/addbanner", formData, {
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
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
                {formErrors.name && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.name}
                </SoftTypography>
              )}
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
                 {formErrors.title && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.title}
                </SoftTypography>
              )}
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="subtitle"
                placeholder="subtitle"
                value={subtitle}
                onChange={(e) => setsubtitle(e.target.value)}
              />
                {formErrors.subtitle && (
                <SoftTypography variant="caption" color="error">
                  {formErrors.subtitle}
                </SoftTypography>
              )}
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
              <SoftInput type="file" name="image" accept="image/*" onChange={handleImageChange} />
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

export default AddBanner;
