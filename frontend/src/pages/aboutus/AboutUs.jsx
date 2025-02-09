import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-header">
                <h1>About Us</h1>
                <p>Discover more about our mission, vision, and values.</p>
            </div>

            <div className="about-us-content">
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At Fit Start, our mission is to empower individuals to lead healthier, happier lives through personalized fitness plans and nutrition guidance.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Our Vision</h2>
                    <p>
                        We aim to revolutionize the way people approach fitness by making it accessible, engaging, and sustainable for everyone.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Our Values</h2>
                    <ul>
                        <li>Commitment to health and wellness</li>
                        <li>Personalized fitness journeys</li>
                        <li>Community and support</li>
                        <li>Inclusivity and accessibility</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
