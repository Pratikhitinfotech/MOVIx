import React, { useRef } from 'react'
import "./style.scss"

import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Contentwrapper from '../contentWrapper/Contentwrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallbacks from "../../assets/no-poster.png";
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import dayjs from "dayjs";


const Carousel = ({ data, loading }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home)

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <Contentwrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems">
                        {
                            data?.map((item) => {
                                const PosterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallbacks;
                                return (
                                    <div key={item.id} className="carouselItem">
                                        <div className="posterBlock">
                                            <Img src={PosterUrl} />
                                            <CircleRating rating={item.vote_average.toFixed(1)} />
                                            <Genres data={item.genre_ids.slice(0, 2)} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">
                                                {item.title || item.name}
                                            </span>
                                            <span className="date">
                                                {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </Contentwrapper>
        </div>
    )
}

export default Carousel