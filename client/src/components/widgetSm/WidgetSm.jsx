import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../redux/apiCalls";
import "./widgetSm.css";

const WidgetSm = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);

    useEffect(() => {
        getUsers(true, dispatch);
    }, [dispatch]);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.map(user => (
                    <li key={user._id} className="widgetSmListItem">
                        <img 
                            src={user.profilePicture || "https://firebasestorage.googleapis.com/v0/b/social-6450b.appspot.com/o/noAvatar.png?alt=media&token=e001a524-7807-417e-8c43-86965d0b6979"} 
                            alt="" 
                            className="widgetSmImg" 
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <Link 
                            to={"/adminUser/" + user._id}
                            state={{ user: user }}
                            className="link"

                        >
                            <button className="widgetSmButton">
                                <Visibility className="widgetSmIcon"/>
                                Display
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WidgetSm;
