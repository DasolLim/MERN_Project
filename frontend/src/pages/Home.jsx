import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <header>
                <h1>WELCOME TO SE3316 LAB 4</h1>
                <p>Explore, Discover, Enjoy</p>
            </header>
            <main>
                <section>
                    <h2>Description</h2>
                    <p>
                        The website is an advanced platform designed for the comprehensive management of heroes,
                        featuring a robust authentication system with Firebase and JWT for secure user interactions.
                        It offers a range of user-centric functionalities, including search capabilities, list creation,
                        and review submissions. Additionally, administrators have access to tools for efficient user
                        management and overall site maintenance. The website places a strong emphasis on security, privacy,
                        and adherence to DMCA guidelines, ensuring a professional and compliant online experience.
                    </p>
                </section>
                <section>
                    <h2>Featured Content</h2>
                    <ul>
                        <li>
                            Authentication
                        </li>
                        <li>
                            User Functionality
                        </li>
                        <li>
                            Administrator Features
                        </li>
                        <li>
                            Web Service API
                        </li>
                        <li>
                            Copyright Enforcement
                        </li>
                        <li>
                            DMCA Takedown Procedure
                        </li>
                    </ul>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 Your Website. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
