import React, { useMemo, useState } from 'react'
import Contentwrapper from '../../../component/contentWrapper/Contentwrapper'
import SwitchTabs from '../../../component/switchTams/SwitchTabs'
import Carousel from '../../../component/carousel/Carousel'
import useFatch from '../../../hooks/useFatch'


const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFatch(`/${endpoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    useMemo(() => {
        console.log('TopRates usemeno');
    }, [])

    return (
        <div className="carouselSection">
            <Contentwrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </Contentwrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default TopRated