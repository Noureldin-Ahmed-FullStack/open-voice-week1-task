import { Alert, Box, Grid, ListItemSecondaryAction, Slide, Snackbar } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { CiStar } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { FaMoneyCheckDollar } from "react-icons/fa6";
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios"
import './Store.css'
import React, { useEffect, useState } from "react"
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
interface NestedObject {
    name: string;
    slug: string;
    image: string;
    // Add other properties as needed
}
interface ProdObj {
    id: string;
    title: string;
    slug: string;
    imageCover: string;

    description: string;
    quantity: number;
    price: number;

    ratingsAverage: number;
    ratingsQuantity: number;

    brand: NestedObject
    category: NestedObject
    // Add other properties as needed
}
export default function Store() {
    const [Products, setProducts] = useState<ProdObj[]>([]);
    const [SearchQuerry, setSearchQuerry] = useState<string>('');
    const [Cart, setCart] = useState<ProdObj[]>([]);
    const [Total, setTotal] = useState(0);
    const AddToCart = (product: ProdObj) => {
        setCart([...Cart, product]);
        localStorage.setItem('CartData', JSON.stringify([...Cart, product]))

    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuerry(event.target.value);
    };

    const filteredItems = SearchQuerry
        ? Products.filter(
            (item) =>
                item.title.toLowerCase().includes(SearchQuerry.toLowerCase())
        )
        : Products;

    useEffect(() => {
        var total: number = 0
        for (let i = 0; i < Cart.length; i++) {
            total += Cart[i].price
        }
        setTotal(total)
    }, [Cart]);
    useEffect(() => {
        const localProducts = localStorage.getItem('Products')
        const LocalCart = localStorage.getItem('CartData')
        if (LocalCart) {
            setCart(JSON.parse(LocalCart))
        }
        if (localProducts) {
            console.log("Local storage");
            setProducts(JSON.parse(localProducts))
        } else {
            console.log("Fetching Data");

            axios.get('https://ecommerce.routemisr.com/api/v1/products')
                .then(response => {
                    console.log('Products:', response.data.data);
                    localStorage.setItem('Products', JSON.stringify(response.data.data))
                    setProducts(response.data.data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }, [])

    const [SnackBar, setSnackBar] = useState(false);
    const [ErrorSnack, setErrorSnack] = useState(false);

    const checkOut = () => {
        if (Cart.length != 0) {
            setCart([])
            setSnackBar(true);

            localStorage.setItem('CartData', JSON.stringify([]))
        } else {
            setErrorSnack(true);

        }

    };

    const removeFromCart = (productId: string) => {
        const updatedCart = Cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('CartData', JSON.stringify(updatedCart))
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        height: '100%',
        color: theme.palette.text.secondary,
        position: 'relative',
    }));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ width: '100%' ,color:'white'}}>

            <h1 className=" mb-4">Shopping cart</h1>
            <input type="text" placeholder="Search" className="w-100 mb-5" onChange={handleSearchChange} />
            <Snackbar
                open={SnackBar}
                color="success"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={4000}
                onClose={() => setSnackBar(false)}
                message="Items Bought successfully!"
            >
                <Alert onClose={() => setSnackBar(false)} severity="success">
                    Items Bought successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                open={ErrorSnack}
                color="success"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={4000}
                onClose={() => setErrorSnack(false)}
                message="Cart is empty!"
            >
                <Alert onClose={() => setErrorSnack(false)} severity="error">
                    Cart is empty!
                </Alert>
            </Snackbar>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, display: "flex", flex: 1, alignItems: 'center' }} variant="h6" component="div">
                            <CiShoppingCart size={20} className="me-2" />Your Cart
                        </Typography>
                        <Button variant="contained" sx={{ color: 'white' }} color="success" onClick={checkOut}>
                            <FaMoneyCheckDollar size={20} className="me-1" />Total: {Total} $
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {Cart?.map((product, index) => (
                        <React.Fragment key={index}>
                            <ListItemButton>

                                <ListItemText primary={product.title} secondary={product.category.name} />
                                <ListItemSecondaryAction className="d-flex align-items-center">
                                    {product.price} $
                                    <Button onClick={() => removeFromCart(product.id)} className="mx-3" color="inherit">
                                        <DeleteIcon />
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}


                </List>
            </Dialog>
            <div className="MyDial z-3" onClick={handleClickOpen}>
                <div className="InnerDIal">
                    <CiShoppingCart className="text-light  " size={30} />
                </div>
                <div className="FakeDial"></div>
            </div>

            <Grid container rowSpacing={3} columnSpacing={3}>
                {filteredItems?.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id} className="">
                        {/* <div className=" p-3">{product.title}</div> */}
                        <Item className="p-3 BorderSettings">
                            <img loading="lazy" className="ProdDisplay" src={product.imageCover} alt={product.title} />
                            <p className="mb-5">{product.title}</p>
                            <div className="ProductInfo px-3">
                                <div className="d-flex justify-content-between">
                                    <p className="mb-1">{product.price} $</p>
                                    <p className="mb-1 d-flex align-items-center">{product.ratingsAverage}<CiStar className="me-2" /> {product.ratingsQuantity} Ratings</p>
                                </div>
                                <div>
                                    <button onClick={() => AddToCart(product)} className=" d-flex align-items-center btn btn-success mb-1 w-100"><CiShoppingCart className="me-3" />Add to cart</button>
                                </div>
                            </div>
                        </Item>
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}
