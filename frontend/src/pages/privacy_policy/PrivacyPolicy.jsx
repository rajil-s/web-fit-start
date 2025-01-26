import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h1>Privacy Policy</h1>
            <p>
                At <strong>Fit Start</strong>, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
                <li>
                    <strong>Personal Information:</strong> Your name, email address, phone number, and other details you provide when creating an account or contacting us.
                </li>
                <li>
                    <strong>Usage Data:</strong> Information about how you interact with our platform, including your fitness progress, meal plans, and exercise logs.
                </li>
                <li>
                    <strong>Device Information:</strong> Data about your device, such as browser type, operating system, and IP address, to improve our services.
                </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
                <li>Provide and maintain our services.</li>
                <li>Personalize your fitness and nutrition plans.</li>
                <li>Send updates, newsletters, and important notifications.</li>
                <li>Improve our platform by analyzing user behavior.</li>
            </ul>

            <h2>3. How We Protect Your Information</h2>
            <p>
                We implement appropriate technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>4. Sharing Your Information</h2>
            <p>
                We do not sell, rent, or share your personal information with third parties except in the following cases:
            </p>
            <ul>
                <li>With your consent.</li>
                <li>To comply with legal obligations or protect our rights.</li>
                <li>To trusted service providers who assist us in operating our platform, provided they agree to maintain confidentiality.</li>
            </ul>

            <h2>5. Your Rights</h2>
            <p>As a user, you have the right to:</p>
            <ul>
                <li>Access and review the personal information we have collected about you.</li>
                <li>Request corrections to inaccurate or incomplete information.</li>
                <li>Request deletion of your personal data, subject to applicable laws.</li>
                <li>Opt out of receiving promotional communications.</li>
            </ul>

            <h2>6. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically to stay informed.
            </p>

            <h2>7. Contact Us</h2>
            <p>
                If you have any questions or concerns about this Privacy Policy or your data, please contact us:
            </p>
            <p>Email: support@fitstart.com</p>
            <p>Phone: +1 123-456-7890</p>
            <p>Address: 123 Fit Street, Wellness City, USA</p>
        </div>
    );
};

export default PrivacyPolicy;
