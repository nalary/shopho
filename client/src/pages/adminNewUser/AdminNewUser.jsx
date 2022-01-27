import "./adminNewUser.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Publish } from '@material-ui/icons';
import upload from "../../upload";
import { createUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const AdminNewUser = () => {
    const [user, setUser] = useState(null);
    const [mainImg, setMainImg] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({...user, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let image = null;
        mainImg && (image = { file: mainImg, label: "profilePicture"});

        if (image) {            
            upload(image, user).then(() => {
                createUser(user, dispatch);
                navigate("/adminUsers");

            });
        } else {
            createUser(user, dispatch);
            navigate("/adminUsers");
        }  
    };

    return (
        <>
            <Topbar />        
            <div className="container">
                <Sidebar />
                <div className="newUser">
                    <h1 className="newUserTile">New User</h1>
                    <form className="newUserForm">
                        <div className="newUserItem">
                            <label>Product Image</label>
                            <div className="newUserImage">                    
                                <img 
                                    src={mainImg ? URL.createObjectURL(mainImg) : "https://www.lwf.org/images/emptyimg.png"}
                                    alt="" 
                                    className="newUserMainImg" 
                                />
                                <label htmlFor="mainImgFile">
                                    <Publish className="newUserIcon"/>
                                </label>
                                <input 
                                    type="file" 
                                    id="mainImgFile"
                                    style={{ display: "none" }}
                                    onChange={e => setMainImg(e.target.files[0])}
                                />
                            </div>
                        </div>
                        <div className="newUserItem">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="* required" onChange={handleChange}/>
                        </div>
                        <div className="newUserItem">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="* required" onChange={handleChange}/>
                        </div>
                        <div className="newUserItem">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="* required" onChange={handleChange}/>
                        </div>
                        <div className="newUserItem">
                            <label>Full Name</label>
                            <input type="text" name="fullName" onChange={handleChange}/>
                        </div>
                        <div className="newUserItem">
                            <label>Administrator</label>
                            <select name="isAdmin" id="isAdmin" className="newUserSelect" onChange={handleChange}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                    </form>
                    <button className="newUserButton" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </>
    );
};

export default AdminNewUser;
