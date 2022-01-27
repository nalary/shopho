import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./admin.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

const Home = () => {
    const MONTHS = useMemo(() => 
        [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        []
    );

    const [userStats, setUserStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats");
                const statsList = res.data.sort((a, b) => a._id - b._id);
                statsList.map(item => setUserStats(prev => [
                    ...prev, 
                    {
                        name: MONTHS[item._id - 1], 
                        "New User": item.total
                    }
                ]));
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [MONTHS]);

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="home">
                    <FeaturedInfo />
                    <Chart title="User Analytics" data={userStats} lineDataKey="New User" grid/>
                    <div className="homeWidgets">
                        <WidgetSm />
                        <WidgetLg />
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default Home;
