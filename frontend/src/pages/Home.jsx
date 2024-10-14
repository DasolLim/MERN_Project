import React from 'react';
import myImage from './homePagePicture.png';

const Home = () => {
    return (
        <div className="home">
            <header>
                <h1>MERN Stack Project</h1>
                <div className="image-container">
                    <img src={myImage} alt="Description of the image" />
                </div>
                <p>MongoDB, Express. js, React, and Node. js</p>
            </header>
            <main>
                <section>
                    <h2 id="home-header">Project Description</h2>
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
                    <h2 id="home-header">Featured Content</h2>
                    <div class="featured-container">
                        <h3>Authentication:</h3>
                        <p>
                            In our web app, creating an account is as easy as pie. You just need to toss in your email, a password, and a nickname. Plus, we've got your back with email validation, making sure everything's in the right format.
                        </p>

                        <h3>User Functionality:</h3>
                        <p>
                            For starters, our homepage is like the gateway to awesome. It showcases the app's name, throws in a quick rundown, and sets you up for a smooth login.
                        </p>
                        <p>
                            Unleash your inner hero searcher! You can hunt down your favorite heroes based on their name, race, power, or publisher. And, no worries if you have a typo; our search terms are pretty chill.
                        </p>
                        <p>
                            Ever wanted to keep a list of your top heroes? Authenticated users can create up to 20 named hero lists. Oh, and if you're feeling generous, you can share public lists and let others add reviews.
                        </p>

                        <h3>Administrator Features:</h3>
                        <p>
                            We've got a superhero admin, making sure everything's in check. They can grant special privileges, manage reviews (hiding or revealing them), and even handle user accounts.
                        </p>

                        <h3>Web Service API:</h3>
                        <p>
                            Behind the scenes, we've tweaked our API to make sure it plays nice with all the cool stuff you're doing. It's the secret sauce connecting your front-end to the powerful back-end.
                        </p>

                        <h3>Copyright Enforcement and DMCA Takedown Procedure:</h3>
                        <p>
                            Now, let's talk about keeping it all legit. We've laid down clear policies for security, privacy, and handling copyright issues. There's even a nifty DMCA takedown procedure and tools to manage the nitty-gritty details.
                        </p>
                    </div>
                </section>
            </main>
            <footer class="footer-container">
                <p><i>&copy; 2023 Your Website. All rights reserved.</i></p>
            </footer>
        </div>
    );
};

export default Home;
