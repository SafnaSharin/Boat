/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import axios from "axios";

// Overview page components
import Header from "layouts/categary-management/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import { Link, useNavigate } from "react-router-dom";

function Overview() {
  const [catogerydetails, setcatogerydetails] = useState(null);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const token=localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"]=token;
 
     axios.get("http://localhost:4000/productRouter/catogerydisplay", {
    headers: {
      Authorization: ` ${token}`,
    },
  })
  .then((response)=>{
    setcatogerydetails(response.data);
    console.log(catogerydetails)
  })
  .catch((error) => {
    console.log(error)
    });
  },[]);

  const handleEdit = (id)=>{
    //console.log("id", id)
    navigate(`/edit-catogery/${id}`);
  }

  const handleRemove = async (id) => {
    const confirmed = window.confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:4000/productRouter/delete/${id}`);
        console.log('deleted');
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get("http://localhost:4000/productRouter/catogerydisplay", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setcatogerydetails(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

 
  return (

    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} xl={4}>
            
          </Grid>
          
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
            </SoftBox>
            <SoftBox mb={1}>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
            {catogerydetails && catogerydetails.map((catogery) => (
              <Grid item xs={12} md={6} xl={3} key={catogery._}>
                <DefaultProjectCard
          
                  image={`http://localhost:4000/uploads/${catogery.image}`}
                  //label="project #2"
                  title={catogery.catogery}
                 // description="As Uber works through a huge amount of internal management turmoil."
                 action={{ }}
                 onEdit={()=>handleEdit(catogery._id)}
                 onRemove={()=>handleRemove(catogery._id)}
                />
               </Grid>
              ))}
              
              <Grid item xs={12} md={6} xl={3}>
                <Link to="/add-categary">
                <PlaceholderCard title={{ variant: "h5", text: "Add Category" }}  outlined />
                </Link>
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
