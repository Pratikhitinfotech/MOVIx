import React, { useEffect, useState } from 'react';
import "./style.scss";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useLocation, useNavigate } from 'react-router-dom';

import Contentwrapper from "../../component/contentWrapper/Contentwrapper";
import Logo from "../../assets/movify-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])


    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }

    const openMobileMenu = () => {
        setMobileMenu(true)
        setShowSearch(false)
    }

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar)
        return () => { window.removeEventListener("scroll", controlNavbar) }
    }, [lastScrollY])

    const searchQueryHendle = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false)
            }, 1000)
        }
    }

    const navigationHendler = (type) => {
        if (type === "movie") {
            navigate("explore/movie");
        } else {
            navigate("explore/tv");
        }
        setMobileMenu(false)
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <Contentwrapper>
                <div className="logo">
                    <img src={Logo} alt='logo' onClick={() => navigate("/")} />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHendler("movie")}>Movies</li>
                    <li className="menuItem" onClick={() => navigationHendler("tv")}>TV Shows</li>
                    <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
                </div>
            </Contentwrapper>
            {
                showSearch &&
                <div className="searchBar">
                    <Contentwrapper>
                        <div className="searchInput">
                            <input type="text" placeholder="Search for movies and TV shows..." onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHendle} />
                            <VscChromeClose onClick={() => setShowSearch(false)} />
                        </div>
                    </Contentwrapper>
                </div>
            }
        </header>
    )
}

export default Header