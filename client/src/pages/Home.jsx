import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import PictorialCover from '../components/PictorialCover';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { publicRequest } from '../requestMethods';

const Home = () => {
    const [popular, setPopular] = useState([]);

    const pictorialSource = useSelector((state) => state.auth.currentUser?.pictorial);
    const deal = "Super Deal !! Free Shipping on Orders Over $50";

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get("/products/popular");
                setPopular(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProducts();
    }, []);

    return (
        <div>
            <Announcement text={deal} color="teal"/>
            <Navbar />
            <Slider />
            <Categories />
            <Products popular={popular} />
            {pictorialSource && <PictorialCover />}
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;
