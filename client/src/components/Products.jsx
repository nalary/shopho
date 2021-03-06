import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({category, filters, sort, popular}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(category ? `/products?category=${category}` : "/products");
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, [category]);

    useEffect(() => {
        category && 
            setFilteredProducts(
                products.filter(product => 
                    Object.entries(filters).every(([key, value]) => 
                        product[key].includes(value)
                    )
                )
            );
    }, [category, products, filters]);

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt));
        } else if (sort === "asc") {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price));
        } else {
            setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price));
        }
    }, [sort]);

    return (
        <Container>
            {category ? (
                filteredProducts.map(product => (
                    <Product key={product._id} product={product} />
                ))
            ) : (
                popular.slice(0, 8).map(product => (
                    <Product key={product._id} product={product} />
                ))
            )}
        </Container>
    );
};

export default Products;
