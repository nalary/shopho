import { createProductFailure, createProductStart, createProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductsFailure, getProductsStart, getProductsSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "../redux/productRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./authRedux";
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";

// login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};


// get all users
export const getUsers = async (isNew, dispatch) => {
    dispatch(getUsersStart());
    try {        
        const res = isNew ? await userRequest.get("/users?new=true") : await userRequest.get("/users");
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};


// delete user
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await userRequest.delete("/users/" + id);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};


// update user
export const updateUser = async (user, dispatch) => {
    dispatch(updateUserStart());
    try {
        await userRequest.put(`/users/${user._id}`, user);
        dispatch(updateUserSuccess({ user }));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};


// create a user
export const createUser = async (user, dispatch) => {
    dispatch(createUserStart());
    try {
        const res = await userRequest.post("/users", user);
        dispatch(createUserSuccess(res.data));
    } catch (err) {
        dispatch(createUserFailure());
    }
};


// get all products
export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
};


// delete product
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        await userRequest.delete("/products/" + id);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};


// update product
export const updateProduct = async (product, dispatch) => {
    dispatch(updateProductStart());
    try {
        await userRequest.put(`/products/${product._id}`, product);
        dispatch(updateProductSuccess({ product }));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};


// create a product
export const createProduct = async (product, dispatch) => {
    dispatch(createProductStart());
    try {
        const res = await userRequest.post("/products", product);
        dispatch(createProductSuccess(res.data));
    } catch (err) {
        dispatch(createProductFailure());
    }
};