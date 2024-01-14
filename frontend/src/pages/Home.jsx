import React from 'react';
// import myImage from 'MERN-Project/frontend/src/pages/homePagePicture.png'; // Import the image

const Home = () => {
    return (
        <div className="home">
            <header>
                <h1>MERN Stack Project</h1>
                <p>MongoDB, Express. js, React, and Node. js</p>
            </header>
            <main>
                <section>
                    <div>
                        {/* <img src={myImage} alt="Description of the image" /> */}
                    </div>
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
