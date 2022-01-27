import "./adminNewProduct.css";
import { Publish } from '@material-ui/icons';
import { useState } from "react";
import upload from "../../upload";
import { createProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Select from 'react-select'
import { categoriesOptions, colorOptions, sizeOptions } from "../../data";

const NewProduct = () => {
    const [mainImg, setMainImg] = useState(null);
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value });
    };

    const handleCategories = (e) => {        
        setProduct({ ...product, categories: Array.isArray(e) ? e.map(x => x.value) : [] });   
        setCategories(Array.isArray(e) ? e.map(x => x.value) : []);     
    };

    const handleSize = (e) => {        
        setProduct({ ...product, size: Array.isArray(e) ? e.map(x => x.value) : [] });
        setSize(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    const handleColor = (e) => {
        setProduct({ ...product, color: Array.isArray(e) ? e.map(x => x.value) : [] });
        setColor(Array.isArray(e) ? e.map(x => x.value) : []);        
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let image = null;
        mainImg && (image = { file: mainImg, label: "img"});

        if (image) {            
            upload(image, product).then(() => {
                createProduct(product, dispatch);
                navigate("/adminProducts");

            });
        } else {
            createProduct(product, dispatch);
            navigate("/adminProducts");
        }        
    };

    // console.log("categories: ", categories);
    // console.log("product: ", product);

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="newProduct">
                    <h1 className="addProductTitle">New Product</h1>
                    <form className="addProductForm">
                        <div className="addProductItem">
                            <label>Product Image</label>
                            <div className="addProductImages">                    
                                <img 
                                    src={mainImg ? URL.createObjectURL(mainImg) : "https://www.lwf.org/images/emptyimg.png"}
                                    alt="" 
                                    className="addProductMainImg" 
                                />
                                <label htmlFor="mainImgFile">
                                    <Publish className="addProductIcon"/>
                                </label>
                                <input 
                                    type="file" 
                                    id="mainImgFile"
                                    style={{ display: "none" }}
                                    onChange={e => setMainImg(e.target.files[0])}
                                />
                            </div>
                        </div>                                
                        <div className="addProductItem">
                            <label>Title</label>
                            <input type="text" name="title" placeholder="* required" onChange={handleChange}/>
                        </div>
                        <div className="addProductItem desc">
                            <label>Description</label>
                            <textarea type="text" name="desc" placeholder="* required" onChange={handleChange}/>
                        </div>
                        <div className="addProductItem">
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
                        <div className="addProductItem">
                            <label>Size</label>
                            <Select 
                                options={sizeOptions}
                                value={sizeOptions.filter(obj => size.includes(obj.value))}
                                isMulti
                                onChange={handleSize}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Color</label>
                            <Select 
                                options={colorOptions}
                                value={colorOptions.filter(obj => color.includes(obj.value))}
                                isMulti
                                onChange={handleColor}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Price (USD)</label>
                            <input type="number" name="price" min={1} placeholder="* required" onChange={handleChange}/>
                        </div>
                    </form>
                    <button className="addProductButton" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </>
    );
};

export default NewProduct;
