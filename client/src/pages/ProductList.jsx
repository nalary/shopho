import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { colorOptions, sizeOptions } from "../data";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;

    ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })};
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;

    ${mobile({ marginRight: "0" })};
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;

    ${mobile({ margin: "10px 0" })};
`;

const Option = styled.option``;



const ProductList = () => {
    const location = useLocation();
    const category = location.pathname.split("/")[2];

    const deal = "Super Deal !! Free Shipping on Orders Over $50";
    
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Container>
            <Navbar />
            <Announcement text={deal} color="teal"/>
            <Title>{category.toUpperCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products: </FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        {colorOptions.map((color, index) => (
                            <Option key={index} value={color.value}>{color.label}</Option>
                        ))}
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        {sizeOptions.map((size, index) => (
                            <Option key={index} value={size.value}>{size.label}</Option>
                        ))}
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products: </FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort}/>
            <Announcement text={deal} color="coral"/>
            <Footer />
        </Container>
    );
};

export default ProductList;
