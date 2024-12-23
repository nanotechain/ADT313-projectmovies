import React, { useEffect, useContext, useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faFilm, faUserCircle, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../utils/context/AuthContext';
import './Client.css'
function Client() {
    const { auth } = useContext(AuthContext);
    const { clearAuthData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const sidebar = document.querySelector('.sidebar');
        const button = document.querySelector('.button');
        const button2 = document.querySelector('.close-sidebar');
        const button3 = document.querySelector('.Movies-user');
        const coverSidebar = document.querySelector('.cover-sidebar');

        header.classList.add('header-visible');
        footer.classList.add('footer-visible');

        const toggleSidebar = () => {
            if (sidebar.style.transform === "translateX(0%)") {
                sidebar.style.transform = "translateX(100%)";
                coverSidebar.style.visibility = "hidden"
            } else {
                sidebar.style.transform = "translateX(0%)";
                coverSidebar.style.visibility = "visible"
            }
        };

        button?.addEventListener('click', toggleSidebar);
        button2?.addEventListener('click', toggleSidebar);
        button3?.addEventListener('click', toggleSidebar);
        coverSidebar?.addEventListener('click', toggleSidebar);
        return () => {
            button?.removeEventListener('click', toggleSidebar);
            button2?.removeEventListener('click', toggleSidebar);
            button3?.removeEventListener('click', toggleSidebar);
            coverSidebar?.removeEventListener('click', toggleSidebar);
        };
    }, []);

    const handleLogout = useCallback(() => {
        clearAuthData();
        navigate('/');
    }, [navigate, clearAuthData]);

    return (
        <>
        <div class="bg-Login">
            <main className="box">
                <header>
                    <h1 className="title-text" onClick={() => navigate('/home')}>DontFlix</h1>
                    <button className="button" id="toggleButton">
                        <div className="button-container">
                            <div className="divnav"></div>
                            <div className="divnav"></div>
                            <div className="divnav"></div>
                        </div>
                    </button >
                </header>

                <article className="main-content">
                    <Outlet />
                </article>

                <footer>
                    <div className="text-rights">
                        <p className='size-font'>
                            &copy; 2024 Dontflix - All rights reserved.
                            Data provided by <a className='link-color' href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">(TMDb)</a>
                        </p>
                        <p className='size-font'>
                            Proudly developed by Dontflix Corps, the innovative minds of BSIT-3A
                        </p>
                    </div>
                    <div className="icons">
                    </div>
                </footer>
                <div className='cover-sidebar' id="toggleButton"></div>
                <div className='sidebar'>
                    <button className='close-sidebar' id="toggleButton">
                        <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                    <div className='container-user-info'>
                        <div className='User-Info'>
                            <FontAwesomeIcon icon={faUserCircle} className='photo-user-img' />
                            <span className="user-info-data">
                                <h1 className="name-user">{auth.user.firstName}</h1>
                            </span>
                        </div>
                    </div>
                    <hr className='space-from-name-nav'></hr>
                    <ul className='nav-user'>
                        <div className="Movies-user" onClick={() => navigate('/home')} id="toggleButton">
                            <div style={{ fontSize: '24px', color: 'white' }}>
                                <center>
                                    <FontAwesomeIcon icon={faFilm} style={{ fontSize: '24px', color: 'white' }} />
                                    <strong className='spacing-text'>Movies</strong>
                                </center>
                            </div>
                        </div>
                        <div className="logout-user">
                            <div onClick={handleLogout} style={{ fontSize: '24px', color: 'white' }}>
                                <center>
                                    <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '24px', color: 'white' }} />
                                    <strong className='spacing-text'>Logout</strong>
                                </center>
                            </div>
                        </div>
                    </ul>
                </div>
            </main>
            </div>
        </>
    )
}

export default Client