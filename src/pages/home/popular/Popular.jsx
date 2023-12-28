import React, { useState } from 'react'
import Contentwrapper from '../../../component/contentWrapper/Contentwrapper'
import SwitchTabs from '../../../component/switchTams/SwitchTabs'
import Carousel from '../../../component/carousel/Carousel'
import useFatch from "../../../hooks/useFatch";


const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFatch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <Contentwrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange}
                />
            </Contentwrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}
            />
        </div>
    )
}

export default Popular