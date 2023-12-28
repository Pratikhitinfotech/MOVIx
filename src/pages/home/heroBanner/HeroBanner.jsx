import React, { useEffect, useState } from 'react'
import "./style.scss";
import { useSelector } from 'react-redux'
import useFatch from "../../../hooks/useFatch";
import { useNavigate } from 'react-router-dom';
import Img from "../../../component/lazyLoadImage/Img";
import Contentwrapper from "../../../component/contentWrapper/Contentwrapper";

const HeroBanner = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState("")
    const [background, setBackground] = useState("")
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFatch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
    }, [data])

    const searchQueryHandle = (event) => {
        if (event.key == "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}
            <div className="opacity-layer"></div>
            <Contentwrapper>
                <div className="heroBannerContant">
                    <span className="title">Welcome</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input type='text' placeholder='Search for a movie or tv show...' onKeyUp={searchQueryHandle} onChange={(e) => setQuery(e.target.value)} />
                        <button>Search</button>
                    </div>
                </div>
            </Contentwrapper>
        </div>
    )
}

export default HeroBanner