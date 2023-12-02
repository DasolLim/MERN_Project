import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <header>
                <h1>Welcome to Your Website</h1>
                <p>Explore, Discover, Enjoy</p>
            </header>
            <main>
                <section>
                    <h2>Featured Content</h2>
                    {/* Add your featured content components or information here */}
                </section>
                <section>
                    <h2>Latest Updates</h2>
                    {/* Add your latest updates components or information here */}
                </section>
            </main>
            <footer>
                <p>&copy; 2023 Your Website. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
