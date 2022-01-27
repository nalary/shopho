import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { emptyCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";

const Success = () => {
    const location = useLocation();  
    const data = location.state.stripeData;
    const cart = location.state.cart;

    const currentUser = useSelector((state) => state.auth.currentUser);
    const [orderId, setOrderId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    amount: cart.total < 50 ? cart.total + 5.90 : cart.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
            } catch (err) {
                console.log(err);
            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding : "20px"
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successful. Your order is being prepared...`}
            <Link to="/" className="link">
                <button 
                    style={{ padding: 10, marginTop: 20, cursor: "pointer" }}
                    onClick={() => dispatch(emptyCart())}
                >
                    Go to Home
                </button>
            </Link>
        </div>
    );
};

export default Success;
