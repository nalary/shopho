import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const CoverContainer = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    
    ${mobile({ padding: "0px", flexDirection: "column" })};
`;

const Container = styled.div`
    flex: 1;
    margin: 3px;
    position: relative;
    min-width: 420px;
    height: 70vh;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    ${mobile({ height: "30vh" })};
`;

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    font-weight: 600;
    cursor: pointer;
`;

const PictorialCover = () => {
    const pictorialSource = useSelector((state) => state.auth.currentUser?.pictorial);
    const [pictorialList, setPictorialList] = useState([]); 

    useEffect(() => {
        const getPictorialList = async () => {
            try {
                await publicRequest.get(pictorialSource).then(result => {
                    setPictorialList(result.data);
                });; 
            } catch (err) {
                console.log(err);
            }
        };
        getPictorialList();
    }, [pictorialSource]);
    
    return (
        <CoverContainer>
            {pictorialList.pictorials?.map(item => (
                <Container key={item.id}>
                    <Link to={`/pictorial/${item.category}`} className="link">
                        <Image src={item.source}/>
                        <Info>
                            <Title>{item.title}</Title>
                            <Button>MOVE NOW</Button>
                        </Info>
                    </Link>
                </Container>
            ))}
        </CoverContainer>
    );
};

export default PictorialCover;
