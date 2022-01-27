import { BarChart, ChatBubbleOutline, DynamicFeed, HomeOutlined, MailOutline, PermIdentity, Report, Timeline, TrendingUp, WorkOutline, AttachMoney, Storefront } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
    const activePath = useLocation().pathname;

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/admin" className="link">
                            <li className={`sidebarListItem ${activePath === "/admin" ? " active": " "}`}>
                                <HomeOutlined className="sidebarIcon"/>
                                Home
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon"/>
                            Sales
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/adminUsers" className="link">
                            <li className={`sidebarListItem ${activePath.toLowerCase().includes("user") ? " active": " "}`}>
                                <PermIdentity className="sidebarIcon"/>
                                Users
                            </li>
                        </Link>
                        <Link to="/adminProducts" className="link">
                            <li className={`sidebarListItem ${activePath.toLowerCase().includes("product") ? " active": " "}`}>
                                <Storefront className="sidebarIcon"/>
                                Products
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <AttachMoney className="sidebarIcon"/>
                            Transactions
                        </li>
                        <li className="sidebarListItem">
                            <BarChart className="sidebarIcon"/>
                            Reports
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <MailOutline className="sidebarIcon"/>
                            Mail
                        </li>
                        <li className="sidebarListItem">
                            <DynamicFeed className="sidebarIcon"/>
                            Feedback
                        </li>
                        <li className="sidebarListItem">
                            <ChatBubbleOutline className="sidebarIcon"/>
                            Messages
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon"/>
                            Manage
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon"/>
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
