import "./adminUser.css";
import { PermIdentity, PhoneAndroid, MailOutline, LocationSearching, Publish } from '@material-ui/icons';
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import upload from "../../upload";
import { updateUser } from "../../redux/apiCalls";

const User = () => {
    const location = useLocation();
    const user = location.state.user;

    const [profilePicture, setProfilePicture] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(user); 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUpdatedUser({...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let image = null;
        profilePicture && (image = { file: profilePicture, label: "profilePicture" });

        if (image) {
            upload(image, updatedUser).then(() => {
                updateUser(updatedUser, dispatch);
                navigate("/adminUsers");
            });
        } else {
            updateUser(updatedUser, dispatch);
            navigate("/adminUsers");          
        }
    };

    return (
        <>
            <Topbar />        
            <div className="container">
                <Sidebar />
                <div className="user">
                    <div className="userTitleContainer">
                        <h1 className="userTitle">Edit User</h1>                
                    </div>
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img 
                                    src={profilePicture ? URL.createObjectURL(profilePicture) : user.profilePicture || "https://firebasestorage.googleapis.com/v0/b/social-6450b.appspot.com/o/noAvatar.png?alt=media&token=e001a524-7807-417e-8c43-86965d0b6979"}
                                    alt="" 
                                    className="userShowImg" 
                                />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">{user.fullName}</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Account Details</span>
                                <div className="userShowInfo">
                                    <PermIdentity className="userShowIcon"/>
                                    <span className="userShowInfoTitle">{user.username}</span>
                                </div>
                                <span className="userShowTitle">Contact Details</span>
                                <div className="userShowInfo">
                                    <PhoneAndroid className="userShowIcon"/>
                                    <span className="userShowInfoTitle">Phone Number</span>
                                </div>
                                <div className="userShowInfo">
                                    <MailOutline className="userShowIcon"/>
                                    <span className="userShowInfoTitle">{user.email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <LocationSearching className="userShowIcon"/>
                                    <span className="userShowInfoTitle">Address</span>
                                </div>
                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Edit</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Username</label>
                                        <input 
                                            type="text" 
                                            defaultValue={user.username}
                                            name="username"
                                            className="userUpdateInput"
                                            onChange={handleChange} 
                                        />
                                    </div>                                    
                                    <div className="userUpdateItem">
                                        <label>Email</label>
                                        <input 
                                            type="text" 
                                            defaultValue={user.email} 
                                            name="email"
                                            className="userUpdateInput"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Password</label>
                                        <input 
                                            type="password" 
                                            name="password"
                                            defaultValue={user.password} 
                                            className="userUpdateInput"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Full Name</label>
                                        <input 
                                            type="text" 
                                            name="fullName"
                                            defaultValue={user.fullName}
                                            className="userUpdateInput" 
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Phone</label>
                                        <input 
                                            type="text"
                                            className="userUpdateInput" 
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Address</label>
                                        <input 
                                            type="text" 
                                            className="userUpdateInput" 
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Administrator</label>
                                        <select 
                                            name="isAdmin" 
                                            id="isAdmin" 
                                            defaultValue={user.isAdmin}
                                            className="userUpdateInput" 
                                            onChange={handleChange}
                                        >
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>                                    
                                </div>
                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img 
                                            src={profilePicture ? URL.createObjectURL(profilePicture) : user.profilePicture || "https://www.lwf.org/images/emptyimg.png"} 
                                            alt="" 
                                            className="userUpdateImg"
                                        />
                                        <label htmlFor="imgFile">
                                            <Publish className="userUpdateIcon"/>
                                        </label>
                                        <input 
                                            type="file" id="imgFile" 
                                            style={{ display: "none" }}
                                            onChange={e => setProfilePicture(e.target.files[0])}
                                        />
                                    </div>
                                    <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
