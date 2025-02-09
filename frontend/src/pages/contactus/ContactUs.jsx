import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send to API)
        console.log('Form submitted:', formData);
        alert('Thank you for contacting Fit Start! We will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>
                    Got a question or feedback? We'd love to hear from you! Please fill out the form
                    below, and our team will get back to you as soon as possible.
                </p>
            </div>

            <div className="contact-form-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your message"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-submit">
                        Send Message
                    </button>
                </form>
            </div>

            <div className="contact-info">
                <h2>Our Contact Info</h2>
                <p>Email: support@fitstart.com</p>
                <p>Phone: +1 123-456-7890</p>
                <p>Address: 123 Fit Street, Wellness City, Nepal</p>
            </div>
        </div>
    );
};

export default ContactUs;
