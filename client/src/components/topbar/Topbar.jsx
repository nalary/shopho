import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authRedux";
import { emptyCart } from "../../redux/cartRedux";


const Topbar = () => {
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(emptyCart());
    };

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">HO : Admin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <div className="adminProfile">
                            <Settings />
                            <div className="adminOptions">
                                <Link to="/" className="link" style={{ padding: "10px"}}>
                                    <span>SHOP</span>
                                </Link>
                                <span onClick={() => handleLogout()}>Logout</span>
                            </div> 
                        </div>
                    </div>
                    <img 
                        src={user?.profilePicture || "https://firebasestorage.googleapis.com/v0/b/social-6450b.appspot.com/o/noAvatar.png?alt=media&token=e001a524-7807-417e-8c43-86965d0b6979"} 
                        alt="" 
                        className="topAvatar"
                    />
                </div>
            </div>
        </div>
    )
}

export default Topbar;
