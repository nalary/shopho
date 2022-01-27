import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5), 
            rgba(255, 255, 255, 0.5)
        ), 
        url("https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"),
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: #fff;

    ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 10px;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-width: 40%;
    margin: 10px;
`;

const Label = styled.label``;

const Input = styled.input`
    margin-top: 10px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 13px;
    margin: 20px 0;
`;

const Underline = styled.div`
    margin: 5px 0;
    margin-bottom: 20px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Register = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await publicRequest.post(`/auth/register`, user);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    console.log(user);
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Link to={"/login"} className="link">
                        <Underline>HAVE AN ACCOUNT ALREADY ?</Underline>
                    </Link>
                <Form>
                    <InputContainer>
                        <Label>Username</Label>
                        <Input type="text" name="username" placeholder="* required" onChange={handleChange}/>
                    </InputContainer>
                    <InputContainer>
                        <Label>Full Name</Label>
                        <Input type="text" name="fullName" onChange={handleChange}/>
                    </InputContainer>
                    <InputContainer>
                        <Label>Email</Label>
                        <Input type="email" name="email" placeholder="* required" onChange={handleChange}/>
                    </InputContainer>
                    <InputContainer>
                        <Label>Password</Label>
                        <Input type="password" name="password" placeholder="* required" onChange={handleChange}/>
                    </InputContainer>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>                    
                    <Button onClick={handleSubmit}>CREATE</Button>                    
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
