import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftAvatar from 'components/SoftAvatar';
import SoftButton from 'components/SoftButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import Table from 'examples/Tables/Table';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Products() {
  const [banner, setbanner] = useState([]);
  //const [showProductDialog, setShowProductDialog] = useState(false);
  //const [selectedProduct, setSelectedProduct] = useState(null);
  const [image, setImage]= useState("");
 // const [imagePreview, setImagePreview] = useState([])
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchproducts();
  }, []);

  const fetchproducts = async () => {
        const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get("http://localhost:4000/bannerRouter/bannerdisplay")
      .then((response) => {
        setbanner(response.data);

      })
      .catch((error) => {
        if (error.response.status == "401") {
          window.location.href = "authentication/sign-in";
        }
      });
    }

  
  const handleCreate = () => {
    window.location.href = '/add-banner';
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:4000/bannerRouter/deletebanner/${id}`);
        console.log('deleted');
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get("http://localhost:4000/bannerRouter/bannerlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setbanner(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
 


  const columns = [
    { name: 'Name', align: 'left' },
    { name: 'images', align: 'left' },
    { name: 'Title', align: 'left' },
    { name: 'SubTitle', align: 'left' },
    { name: 'URL', align: 'left' },
    { name: 'action', align: 'center' },
  ];

  const rows = banner.map((banner) => ({
    Name: banner.name,
    images: (
      <SoftBox>
        <SoftAvatar
          src={`http://localhost:4000/uploads/${banner.image}`}
          alt={banner.name}
          size="xxl"
          variant="rounded"
        />
      </SoftBox>
    ),

    Title: banner.title,
    SubTitle:banner.subtitle,
    URL: banner.url,
    action: (
      <SoftBox display="flex" justifyContent="center">
        {/* <SoftButton
          color="secondary"
          size="small"
          style={{ marginRight: '8px' }}
          onClick={() => handleShow(product)}
        >
          show
        </SoftButton>
         */}
        <SoftButton
          color="info"
          size="small"
          component={Link}
          to={`/edit-banner/${banner._id}`}
          style={{ marginRight: '8px' }}
        >
          Edit
        </SoftButton>

        <SoftButton
          color="secondary"
          size="small"
          onClick={() => handleDelete(banner._id)}
        >
          Delete
        </SoftButton>
      </SoftBox>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p={3}
      >
        <SoftButton variant="gradient" color="info" onClick={handleCreate}>
          Add banner
        </SoftButton>
      </SoftBox>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{ backgroundColor: '#74c3ed' }}
            >
              <SoftTypography variant="h6">Banners</SoftTypography>
            </SoftBox>
          </Card>
          <br></br>
          <SoftBox
            sx={{
              '& .MuiTableRow-root:not(:last-child)': {
                '& td': {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={columns} rows={rows} />
          </SoftBox>
        </SoftBox>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default Products;