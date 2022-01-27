import "./adminUserList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);

    useEffect(() => {
        getUsers(false, dispatch);
    }, [dispatch]);

    const handleDelete = (userId) => {
        deleteUser(userId, dispatch);
    };

    const columns = [
        { 
            field: '_id', 
            headerName: 'ID', 
            width: 250 
        },
        { 
            field: 'user', 
            headerName: 'User', 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img src={params.row.profilePicture || "https://firebasestorage.googleapis.com/v0/b/social-6450b.appspot.com/o/noAvatar.png?alt=media&token=e001a524-7807-417e-8c43-86965d0b6979"} alt="" className="userListImg"/>
                        {params.row.username}
                    </div>
                );
            }
        },
        {
            field: 'fullName',
            headerName: 'Full Name',
            width: 200,
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            width: 200 
        },   
        { 
            field: 'isAdmin', 
            headerName: 'Administrator', 
            width: 180 
        },
        { 
            field: 'action', 
            headerName: 'Action', 
            width: 150, 
            renderCell: (params) => {
                return (
                    <>
                        <Link 
                            to={"/adminUser/" + params.row._id} 
                            state={{ user: params.row }}
                        >
                            <button className="userListEdit">Edit</button>
                        </Link>                        
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)}/>
                    </>
                );                
            }
        },
    ];

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="userList">
                    <div className="userTitleContainer">
                        <h1 className="userTitle">User List</h1>
                        <Link to="/adminNewUser" className="link">
                            <button className="createButton">Create</button>
                        </Link>
                    </div>
                    <DataGrid
                        rows={users}
                        getRowId={row => row._id}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </>
    );
};

export default UserList;
