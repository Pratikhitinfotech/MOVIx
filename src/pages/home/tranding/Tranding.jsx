import React, { useState } from 'react'
import Contentwrapper from "../../../component/contentWrapper/Contentwrapper";
import SwitchTabs from '../../../component/switchTams/SwitchTabs';
import useFatch from '../../../hooks/useFatch';
import Carousel from '../../../component/carousel/Carousel';

const Tranding = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFatch(`/trending/movie/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    }
    return (
        <div className="carouselSection">
            <Contentwrapper>
                <div className="carouselTitle">Trending</div>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </Contentwrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    )
}

export default Tranding