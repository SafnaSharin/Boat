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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Dialog from "assets/theme/components/dialog";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import { Link } from "react-router-dom";
import axios from "axios";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import { Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, Button } from "@mui/material";





function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [adminDetails, setAdminDetails] = useState({});
  const token=localStorage.getItem("token");
  const [oldpassword,setOldpassword]=useState();
  const [newpassword,setNewpassword]= useState();
  const [open, setOpen] = useState(false);

  const [userdetails, setUserdetails] = useState('');
  useEffect(()=>{
    const token=localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"]=token;
 
  axios.get("http://localhost:4000/projectRouter/profile", {
    headers: {
      Authorization: `${token}`,
    },
  })
  .then((response)=>{
    setUserdetails(response.data);
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)

    });
  },[]);


 const handleLogout=async()=>{
  axios.post('http://localhost:4000/projectRouter/logout')
  .then(function(response){
    console.log(response)
    localStorage.removeItem('token');
    window.location.href='/authentication/sign-in'
  })
  .catch(function(error){
    console.log(error);
  })
 }

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

const handleClickOpen =()=>{
  setOpen(true);
}
const handleclose = ()=>{
  setOpen(false)
}
const handleAdds =async()=>{
  if (userdetails && userdetails._id) {
  const datas = {
    oldpassword:oldpassword,
    newpassword:newpassword,
  };
  try{
    const response = await axios.post(`http://localhost:4000/projectRouter/changePassword/${userdetails._id}`,datas)
    setOpen(false);
    console.log(userdetails.name);
    window.location.href=`/profile`;
  }
  catch (err){
    console.log(err);

  }
 }
 else {
  console.error("User details or ID is undefined.");
}
};
  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        {userdetails &&(
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={`http://localhost:4000/uploads/${userdetails.image}`}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {userdetails.username}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {userdetails.role}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="Edit" icon={<Cube />}  component={Link}
                  to={`/edit-profile/${userdetails._id}`}/>
                <Tab label="Password" onClick={handleClickOpen} icon={<Document />} />
                <Tab label="Logout" onClick={handleLogout} icon={<Settings />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        )}
      </Card>
      <div>
        <Dialog open={open} onClose={handleclose}>
          <DialogTitle> change your password</DialogTitle>
          <DialogContent>
            <SoftTypography variant="button" color="text " fontWeight="medium">
              Old password:
            </SoftTypography>
            <SoftBox mb={2}>
              <OutlinedInput onChange={(e) => setOldpassword(e.target.value)}>
               </OutlinedInput>
            </SoftBox>
            {/* <p style={{marginTop:'-16px', color:'red', fontSize:'11px'}}></p> */}
         
            <SoftTypography variant="button" color="text " fontWeight="medium">
              New Password:
            </SoftTypography>
            <SoftBox mb={2}>
              <OutlinedInput onChange={(e) => setNewpassword(e.target.value)}>
               </OutlinedInput>
            </SoftBox>
          </DialogContent>
          <DialogActions>
            <Button variant="danger" onClick={handleclose}>cancel</Button>
            <Button variant="success" onClick={handleAdds}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    </SoftBox>
  );
}

export default Header;
