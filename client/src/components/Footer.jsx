import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;

    ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ display: "none" })};
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({ backgroundColor: "#fff8f8" })};
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;


const Footer = () => {
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
        pictorialSource && getPictorialList();
    }, [pictorialSource]);

    return (
        <Container>
            <Left>
                <Logo>Shop.Hop</Logo>                
                <Desc>
                    We’re all about one thing: making the best basics in town so you can feel and be your absolute best. That whole feeling good thing? We’re serious about it. Because when you feel good, you can do anything. Make a statement, make a difference, make nice, make a move, make some noise! Our basics are: Designed for comfort, Energized by creativity, Made for your self-expression
                </Desc>
                <SocialContainer>
                    <SocialIcon color="#3b5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color="#e4405f">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="#55acee">
                        <Twitter/>
                    </SocialIcon>
                    <SocialIcon color="#e60023">
                        <Pinterest/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>
                        <Link to="/" className="link">Home</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/cart" className="link">Cart</Link>
                    </ListItem>
                    {pictorialList.pictorials?.map(pictorial => (
                        <ListItem key={pictorial.id}>
                            <Link to={`/pictorial/${pictorial.category}`} className="link">
                                {pictorial.category.toUpperCase()}
                            </Link>
                        </ListItem>
                    ))}
                    <ListItem>
                        <Link to="/products/men" className="link">Men's Fashion</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/products/women" className="link">Women's Fashion</Link>
                    </ListItem> 
                    <ListItem>
                        <Link to="/products/accessories" className="link">Accessories</Link>
                    </ListItem>   
                    <ListItem>
                        <Link to="/products/bikinis" className="link">Bikinis</Link>
                    </ListItem>                
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wish List</ListItem>                    
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }}/> 99/6-9 Chaturathit Rd, Bang Kapi, Huai Khwang, Bangkok 10310
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }}/> +66 2 111 5555
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }}/> contact@shop.ho
                </ContactItem>
                <Payment src="https://firebasestorage.googleapis.com/v0/b/shop-cf072.appspot.com/o/payment.png?alt=media&token=87f37c49-e7d5-4c66-aa69-56b09415d351" />
            </Right>
        </Container>
    );
};

export default Footer;
