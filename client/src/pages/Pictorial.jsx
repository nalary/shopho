import React, { useEffect, useState } from 'react';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRequest } from '../requestMethods';
import PinterestLayout from '../components/PinterestLayout';

const Pictorial = () => {
    const location = useLocation();
    const category = location.pathname.split("/")[2];

    const pictorialSource = useSelector((state) => state.auth.currentUser?.pictorial);
    const [pictorialList, setPictorialList] = useState([]);

    useEffect(() => {
        const getPictorialList = async () => {
            try {
                const res = await publicRequest.get(pictorialSource);
                setPictorialList(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPictorialList();
    }, [pictorialSource]);   

    console.log(category);
    return (
        <div>
            <Navbar />
            <Announcement text={category.toUpperCase() + " Pictorial"} color="teal"/>
            <PinterestLayout pictorialItems={pictorialList[category]}/>
            <Announcement text={category.toUpperCase() + " Pictorial"} color="coral"/>
            <Footer />
        </div>
    );
};

export default Pictorial;
