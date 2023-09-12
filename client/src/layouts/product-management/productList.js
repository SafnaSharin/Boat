import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftAvatar from 'components/SoftAvatar';
import SoftButton from 'components/SoftButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import styles from "./product.module.css"
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
  const [product, setProduct] = useState([]);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [image, setImage]= useState("");
  const [imagePreview, setImagePreview] = useState([])
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchproducts();
  }, []);

  const fetchproducts = async () => {
        const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get("http://localhost:4000/productRouter/productlist")
      .then((response) => {
        setProduct(response.data);

      })
      .catch((error) => {
        if (error.response.status == "401") {
          window.location.href = "authentication/sign-in";
        }
      });
    }

  
  const handleCreate = () => {
    window.location.href = '/add-Product';
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:4000/productRouter/deleteproduct/${id}`);
        console.log('deleted');
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get("http://localhost:4000/productRouter/productlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleShow = (product) => {
    setSelectedProduct(product);
    const image = product.image;
    if (image) {
      setImage([image]);

      const previewImages = [];
      for (let i = 0; i < image.length; i++) {
        const imageURL = `http://localhost:4000/uploads/${image[i]}`;
        previewImages.push(imageURL);
      }
      setImagePreview(previewImages);
      // setImage([image]);
      // setImagePreview([`http://localhost:8000/uploads/${image}`]);
    } else {
      setImage([]);
      setImagePreview([]);
      }
    setShowProductDialog(true);
  };

  const handleCloseDialog = () => {
    setShowProductDialog(false);
  };
  const columns = [
    { name: 'productName', align: 'left' },
    { name: 'images', align: 'left' },
    { name: 'price', align: 'left' },
    { name: 'Offerprice', align: 'left' },
    { name: 'description', align: 'left' },
    { name: 'action', align: 'center' },
  ];

  const rows = product.map((product) => ({
    productName: product.productname,
    images: (
      <SoftBox>
        <SoftAvatar
          src={`http://localhost:4000/uploads/${product.image[0]}`}
          alt={product.productName}
          size="xxl"
          variant="rounded"
        />
      </SoftBox>
    ),

    price: product.price,
    Offerprice:product.offerprice,
    description: product.description,
    action: (
      <SoftBox display="flex" justifyContent="center">
        <SoftButton
          color="secondary"
          size="small"
          style={{ marginRight: '8px' }}
          onClick={() => handleShow(product)}
        >
          show
        </SoftButton>
        
        <SoftButton
          color="info"
          size="small"
          component={Link}
          to={`/edit-Product/${product._id}`}
          style={{ marginRight: '8px' }}
        >
          Edit
        </SoftButton>

        <SoftButton
          color="secondary"
          size="small"
          onClick={() => handleDelete(product._id)}
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
          Add Product
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
              <SoftTypography variant="h6">Products</SoftTypography>
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


      <Dialog
        open={showProductDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>PRODUCT DETAILS</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <DialogContentText>
                <strong className={styles.show}>Product Name:</strong> {selectedProduct.productname}
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>Price:</strong> {selectedProduct.price}
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>offerprice:</strong> {selectedProduct.offerprice}
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>Category:</strong> {selectedProduct.catogery}
              </DialogContentText>
              <DialogContentText>
                <strong className={styles.show}>Image:</strong><br/>
                {imagePreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt="Image Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ))}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <SoftButton onClick={handleCloseDialog} color="secondary">
            Close
          </SoftButton>
        </DialogActions>
      </Dialog>
      
    </DashboardLayout>
  );
}

export default Products;