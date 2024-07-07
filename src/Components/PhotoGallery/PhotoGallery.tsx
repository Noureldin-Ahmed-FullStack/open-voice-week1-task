import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from "axios";

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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '100%',
    color: theme.palette.text.secondary,
    position: 'relative',
}));
export default function PhotoGallery() {
    const [Products, setProducts] = useState<ProdObj[]>([]);
    const [SearchQuerry, setSearchQuerry] = useState<string>('');

    useEffect(() => {
        const localProducts = localStorage.getItem('Products')
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
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuerry(event.target.value);
      };
    
      const filteredItems = SearchQuerry
        ? Products.filter(
            (item) =>
              item.title.toLowerCase().includes(SearchQuerry.toLowerCase()) 
          )
        : Products;

  return (
    <div className="text-light">
        <h1 className=" mb-4">Photo Gallery</h1>
        <input type="text" placeholder="Search" className="w-100 mb-5" onChange={handleSearchChange} />
        <Grid container rowSpacing={3} columnSpacing={3}>
                {filteredItems?.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id} className="">
                        {/* <div className=" p-3">{product.title}</div> */}
                        <Item className="BorderSettings">
                            <a target="_blank" href={product.imageCover}><img loading="lazy" className="ProdDisplay" src={product.imageCover} alt={product.title} /></a>
                            
                            <p className="mb-0">{product.title}</p>
                        </Item>
                    </Grid>
                ))}
            </Grid>
    </div>
  )
}
