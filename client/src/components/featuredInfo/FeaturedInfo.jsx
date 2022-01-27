import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import "./featuredInfo.css";

const FeaturedInfo = () => {
    const [income, setIncome] = useState([]);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get("orders/income");
                setIncome(res.data);
                setPercentage((res.data[2].total * 100) / res.data[1].total - 100);
            } catch (err) {
                console.log(err);
            }
        };
        getIncome();
    }, []);
    
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">${income[2]?.total.toLocaleString()}</span>
                    <span className="featuredMoneyRate">
                        {Math.floor(percentage).toLocaleString()}%
                        {percentage < 0 ? (
                            <ArrowDownward className="featuredIcon negative"/>
                        ) : (
                            <ArrowUpward className="featuredIcon"/>
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$4,342</span>
                    <span className="featuredMoneyRate">
                        -1.2<ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$3,332</span>
                    <span className="featuredMoneyRate">
                        9.2<ArrowUpward className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
};

export default FeaturedInfo;
