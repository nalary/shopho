import "./adminProductList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (productId) => {
        deleteProduct(productId, dispatch);
    };

    const columns = [
        { 
            field: '_id', 
            headerName: 'ID', 
            width: 200 
        },
        { 
            field: 'product', 
            headerName: 'Product', 
            width: 300, 
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img src={params.row.imgSm || params.row.img || "https://www.lwf.org/images/emptyimg.png"} alt="" className="productListImg"/>
                        {params.row.title}
                    </div>
                );
            }
        },
        { 
            field: 'categories', 
            headerName: 'Categories', 
            width: 220 
        },
        { 
            field: 'price', 
            headerName: 'Price', 
            width: 120 
        },
        { 
            field: 'size', 
            headerName: 'Size', 
            width: 150 
        },
        { 
            field: 'inStock', 
            headerName: 'Stock', 
            width: 120 
        },
        { 
            field: 'action', 
            headerName: 'Action', 
            width: 140,
            renderCell: (params) => {
                return (
                    <>  
                        <Link 
                            to={"/adminProduct/" + params.row._id}
                            state={{ product: params.row }}
                        >
                            <button className="productListEdit">Edit</button>
                        </Link>                        
                         <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)}/>
                    </>
                );                
            }
        },
    ];

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="productList">
                    <div className="productTitleContainer">
                        <h1 className="productTitle">Product List</h1>
                        <Link to="/adminNewProduct" className="link">
                            <button className="createButton">Create</button>
                        </Link>
                    </div>            
                    <DataGrid
                        rows={products}
                        getRowId={row => row._id}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                    />            
                </div>
            </div>
        </>
    );
};

export default ProductList;
