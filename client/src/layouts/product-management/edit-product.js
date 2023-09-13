import { useState, useEffect } from "react";
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
import { InputLabel, MenuItem, Select } from "@mui/material";

function Editproduct() {
//   const [agreement, setAgreement] = useState(true);
  const [productname, setproductname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [offerprice, setofferprice] = useState("");
  const [category ,setcategory]= useState("")
  const [categoryList ,setcategoryList]= useState("")
  const [image, setImage] = useState([]);
  const [imagePreviews1,  setImagePreviews1] = useState([]);
  const [imagePreviews,  setImagePreviews] = useState([]);
  const { id } = useParams();
   const navigate = useNavigate("");
//   const handleSetAgreement = () => setAgreement(!agreement);

useEffect(()=>{
    const token=localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"]=token;
 
     axios.get("http://localhost:4000/productRouter/catogerydisplay", {
    headers: {
      Authorization: ` ${token}`,
    },
  })
  .then((response)=>{
    setcategoryList(response.data);
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
    });
  },[]);

  useEffect(()=>{
    
  fetchdetails();
  },[id]);
  const fetchdetails = async() =>{
    console.log(id);
    try{
        const response = await axios.get(`http://localhost:4000/productRouter/editproduct/${id}`);
        console.log('hetefffffffffffffffffffff')
       
        const details =response.data;
        console.log("hello", response.data);
        setproductname(details.productname);
        setdescription(details.description);
        setcategory(details.catogery)
        setprice(details.price);
        setofferprice(details.offerprice)
        const image= details.image;
            if (image) {
              setImage([image]);
      
              const previewImages = [];
              for (let i = 0; i < image.length; i++) {
                const imageURL = `http://localhost:4000/uploads/${image[i]}`;
                previewImages.push(imageURL);
              }
              setImagePreviews(previewImages);
            } else {
              setImage([]);
              setImagePreviews([]);
       }

}
catch(error) {
    console.log(error);
}
};
  const handleImageDelete = async (index) => {
  console.log(index);
  try {
    // Send the image index to the server for deletion
    await axios.delete(`http://localhost:4000/productRouter/deleteimage/${id}/${index}`);
    
    // Optionally, you can update your component state or refetch the product data here
  } catch (err) {
    console.log(err);
  }
};

    // e.preventDefault(); 

    // const updatedImages = [...image];
    // updatedImages.splice(index, 1); // Remove the image at the specified index
    // setImage(updatedImages);

    // const updatedPreviewImages = [...imagePreviews];
    // updatedPreviewImages.splice(index, 1); // Remove the preview image at the specified index
    // setImagePreviews(updatedPreviewImages);
 


const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files); // Use Array.from
    const newImages = [...image, ...selectedFiles];
    console.log(selectedFiles);
    setImage(newImages);
  
    console.log("helooooo",setImage)
    const previewImages = [];
    for (let i = 0; i < image.length; i++) {
      const image = selectedFiles[i];
      const imageURL = URL.createObjectURL(image);
      previewImages.push(imageURL);
    }
    setImagePreviews1(previewImages);
};
 
  const handleupdate = async (e) => {
    e.preventDefault();
  
    const url = `http://localhost:4000/productRouter/update/${id}`; // Replace with your API endpoint
    

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("offerprice", offerprice);
    formData.append("catogery",category)
    for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
        console.log(image[i]);
      }
      console.log(formData.image);
    
    axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/product-management";
      })

      .catch((err) => {
        console.log(err);
      }); 
  }
  return (
    <BasicLayout
      
    //   description="Use these awesome forms to login or create a new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Edit Product
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
                placeholder="product name"
                value={productname}
                onChange={(e) => setproductname(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
                
              <SoftInput
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </SoftBox>

           <SoftBox mb={2}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                variant="standard"
                fullWidth
              >
                <MenuItem >
                  Select a category
                </MenuItem>
                {categoryList && categoryList.map((category) => (
                  <MenuItem key={category._id} value={category.catogery}>
                    {category.catogery}
                  </MenuItem>
                ))}
              </Select>
            </SoftBox>
            

            <SoftBox mb={2}>
              <SoftInput
                type="number"
                placeholder="price"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="number"
                placeholder="offerprice"
                value={offerprice}
                onChange={(e) => setofferprice(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftTypography variant="h6" fontWeight="medium">
                Image :
              </SoftTypography>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImage}
                placeholder="Images"
                multiple
              />
              {imagePreviews.map((previewUrl, index) => (
                <div key={index}>
                  <img
                    src={previewUrl}
                    alt={`Image Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                  />
                   <button onClick={() => handleImageDelete(index)}>Delete</button>
                </div>
              ))}
              {imagePreviews1.map((previewUrl, index) => (
                <div key={index}>
                  <img
                    src={previewUrl}
                    alt={`Image Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                  />
                   
                </div>
              ))}
            </SoftBox>

            <SoftBox mt={4} mb={1}>
              <SoftButton  variant="gradient" color="dark" fullWidth onClick={handleupdate}>
                update
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

export default Editproduct;
