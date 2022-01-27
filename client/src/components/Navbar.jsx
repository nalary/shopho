import React from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined, ArrowDropDown } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../redux/authRedux";
import { emptyCart } from '../redux/cartRedux';

const Container = styled.div`
    height: 60px;

    ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mobile({ padding: "10px 0" })};
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;

    ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;

    ${mobile({ marginLeft: "10px" })};
`;

const Input = styled.input`
    border: none;

    ${mobile({ width: "50px" })};
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;

    ${mobile({ fontSize: "20px" })};
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;

    ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;

    ${mobile({ display: "none" })};
`;

const Icon = styled(ArrowDropDown)`
    margin: 0 5px;
    cursor: pointer;    
`;

const Options = styled.div`
    display: none;
    background-color: black;
    color: white;
    font-size: 12px;
    font-weight: 600;
    border-radius: 5px;
    z-index: 2;
`;

const Profile = styled.div`
    margin-left: 20px;    

    &:hover {
        ${Options} {
            display: flex;
            flex-direction: column;
            position: absolute;
        }
    }
`;

const Option = styled.span`
    padding: 10px;
    cursor: pointer;
`;


const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector(state => state.auth.currentUser);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(emptyCart());
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search'/>
                        <Search style={{ color: "gray", fontSize: 16 }}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" className='link'>
                        <Logo>Shop.Ho</Logo>
                    </Link>
                </Center>
                <Right>
                    {user ? (
                        <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                    ) : (
                        <>
                            <Link to="/register" className='link'>
                                <MenuItem>REGISTER</MenuItem>
                            </Link>
                            <Link to="/login" className='link'>
                                <MenuItem>SIGN IN</MenuItem>
                            </Link> 
                        </>
                    )}                
                    <Link to="/cart" className='link'>
                        <MenuItem>
                            <Badge badgeContent={quantity} color='primary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                    
                    <Profile>
                        <ProfileImage src={user?.profilePicture || "https://firebasestorage.googleapis.com/v0/b/social-6450b.appspot.com/o/noAvatar.png?alt=media&token=e001a524-7807-417e-8c43-86965d0b6979"} alt="" />         
                        {user &&
                            <>
                                <Icon />
                                <Options>
                                    {user?.isAdmin ? (
                                        <Link to="/admin" className="link" style={{ marginTop: "10px"}}>
                                            <Option>Admin</Option>
                                        </Link>
                                    ) : (
                                        <Option>Settings</Option>
                                    )}                            
                                    <Option onClick={() => handleLogout()}>Logout</Option>
                                </Options>
                            </>                        
                        }                             
                    </Profile>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
