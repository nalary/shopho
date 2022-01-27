import "./adminProduct.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { Publish } from '@material-ui/icons';
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import Chart from "../../components/chart/Chart";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import upload from "../../upload";
import { updateProduct } from "../../redux/apiCalls";
import Select from 'react-select';
import { categoriesOptions, colorOptions, sizeOptions, stockOptions } from "../../data";

const Product = () => {    
    const location = useLocation();
    const product = location.state.product;

    // const productId = location.pathname.split("/")[2];
    // const product = useSelector((state) => state.product.products.find(product => product._id === productId));

    const [mainImg, setMainImg] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [categories, setCategories] = useState(product.categories);
    const [size, setSize] = useState(product.size);
    const [color, setColor] = useState(product.color);
    const [stock, setStock] = useState(product.inStock);    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const MONTHS = useMemo(() => 
        [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        []
    );

    const [productStats, setProductStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + product._id);
                res.data.map(item => setProductStats(prev => [
                    ...prev, 
                    {
                        name: MONTHS[item._id - 1], 
                        "Sales": item.total
                    }
                ]));
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [MONTHS, product._id]);

    const handleChange = (e) => {
        setUpdatedProduct({...updatedProduct, [e.target.name]: e.target.value });
    };

    const handleCategories = (e) => {        
        setUpdatedProduct({ ...updatedProduct, categories: Array.isArray(e) ? e.map(x => x.value) : [] });   
        setCategories(Array.isArray(e) ? e.map(x => x.value) : []);     
    };

    const handleSize = (e) => {        
        setUpdatedProduct({ ...updatedProduct, size: Array.isArray(e) ? e.map(x => x.value) : [] });
        setSize(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    const handleColor = (e) => {
        setUpdatedProduct({ ...updatedProduct, color: Array.isArray(e) ? e.map(x => x.value) : [] });
        setColor(Array.isArray(e) ? e.map(x => x.value) : []);        
    };

    const handleStock = (e) => {
        setUpdatedProduct({ ...updatedProduct, inStock: e.value });
        setStock(e.value);        
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        let image = null;
        mainImg && (image = { file: mainImg, label: "img"});

        if (image) {            
            upload(image, updatedProduct).then(() => {
                updateProduct(updatedProduct, dispatch);
                navigate("/adminProducts");

            });
        } else {
            updateProduct(updatedProduct, dispatch);
            navigate("/adminProducts");
        }        
    };
    
    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="product">
                    <div className="productTitleContainer">
                        <h1 className="productTitle">Product</h1>
                    </div>
                    <div className="productTop">
                    <div className="productTopLeft">
                        <Chart data={productStats} lineDataKey="Sales" title="Sales Performance" />
                    </div>               
                        <div className="productTopRight">
                            <div className="productInfoTop">
                                <img 
                                    src={product.img || "https://www.lwf.org/images/emptyimg.png"}
                                    alt="" 
                                    className="productInfoImg" 
                                />
                                <span className="productInfoName">{product.title}</span>
                            </div>
                            <div className="productInfoBottom">
                                <div className="productInfoItem">
                                    <span className="productInfoKey">ID:</span>
                                    <span className="productInfoValue">{product._id}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Categories:</span>
                                    <div className="productCategories">
                                        {product.categories.map((category, index) => (
                                            <span key={index} className="productCategory">{category}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Price:</span>
                                    <span className="productInfoValue">{product.price} USD</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Stock:</span>
                                    <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productBottom">                        
                        <form className="productForm">
                            <div className="productItem">
                                <label>Product Image</label>
                                <div className="productImages">                    
                                    <img 
                                        src={mainImg ? URL.createObjectURL(mainImg) : product.img || "https://www.lwf.org/images/emptyimg.png"}
                                        alt="" 
                                        className="productMainImg" 
                                    />
                                    <label htmlFor="mainImgFile">
                                        <Publish className="productIcon"/>
                                    </label>
                                    <input 
                                        type="file" 
                                        id="mainImgFile"
                                        style={{ display: "none" }}
                                        onChange={e => setMainImg(e.target.files[0])}
                                    />
                                </div>
                            </div>                                
                            <div className="productItem">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    defaultValue={product.title} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="productItem desc">
                                <label>Description</label>
                                <textarea 
                                    type="text" 
                                    name="desc" 
                                    defaultValue={product.desc} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="productItem">
                                <label>Categories</label>
                                <Select
                                    id="categories"   
                                    name="categories"                         
                                    options={categoriesOptions}
                                    value={categoriesOptions.filter(obj => categories.includes(obj.value))}
                                    isMulti
                                    onChange={handleCategories}
                                />
                            </div>             
                            <div className="productItem">
                                <label>Size</label>
                                <Select 
                                    options={sizeOptions}
                                    value={sizeOptions.filter(obj => size.includes(obj.value))}
                                    isMulti
                                    onChange={handleSize}
                                />
                            </div>
                            <div className="productItem">
                                <label>Color</label>
                                <Select 
                                    options={colorOptions}
                                    value={colorOptions.filter(obj => color.includes(obj.value))}
                                    isMulti
                                    onChange={handleColor}
                                />
                            </div>
                            <div className="productItem">
                                <label>Price (USD)</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    min={1} 
                                    defaultValue={product.price} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="productItem">
                                <label>in Stock</label>
                                <Select 
                                    options={stockOptions}
                                    // value={stockOptions.find(obj => obj.value === stock)}
                                    value={stockOptions.filter(obj => obj.value === stock)}
                                    onChange={handleStock}
                                />
                            </div>
                            <button className="productButton" onClick={handleUpdate}>Update</button>
                        </form>
                        {/* <button className="productButton" onClick={handleUpdate}>Update</button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
