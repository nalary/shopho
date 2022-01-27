import styled from "styled-components";
import Pictorial from "./Pictorial";
import { mobile } from "../responsive";

const Container = styled.div`
    column-count: 3;
    column-gap: 10px;
    padding: 20px;

    ${mobile({ columnCount: 1 })};

`;

const PinterestLayout = ({pictorialItems}) => {
    return (
        <Container>
            {pictorialItems?.map(pictorial => (
                <Pictorial key={pictorial.id} pictorial={pictorial} />
            ))}
        </Container>
    );
};

export default PinterestLayout;
