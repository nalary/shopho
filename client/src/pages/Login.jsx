import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5), 
            rgba(255, 255, 255, 0.5)
        ), 
        url("https://images.pexels.com/photos/9769860/pexels-photo-9769860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"),
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: #fff;

    ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    margin-bottom: 10px;
    cursor: pointer;

    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;

const Error = styled.span `
    color: red;
`;

const Underline = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input 
                        type="text" 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
                    {error && <Error>Something went wrong !</Error>}
                    <Underline>DO NOT YOU REMEMBER THE PASSWORD ?</Underline>
                    <Link to={"/register"} className="link">
                        <Underline>CREATE A NEW ACCOUNT</Underline>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
