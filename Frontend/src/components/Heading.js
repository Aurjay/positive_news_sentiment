import React, { useState, useEffect } from "react";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";

const Heading = () => {
    const [fadeIn, setFadeIn] = useState(false); // For fade-in animation
    const [slideIn, setSlideIn] = useState(false); // For slide-in animation

    // Trigger animations when component mounts
    useEffect(() => {
        // Set to true after component mounts to trigger animations
        setFadeIn(true);
        setSlideIn(true);
    }, []);

    // Inline styles for the animations
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 1s ease-out, transform 1s ease-out",
    };

    const cardStyle = {
        padding: "24px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backgroundColor: "#f8f8f8",
        width: "80%",
    };

    const statusStyle = {
        display: "flex",
        alignItems: "center",
        opacity: slideIn ? 1 : 0,
        transform: slideIn ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
    };

    const headingStyle = {
        textAlign: "left",
        fontSize: "1.25rem",
        lineHeight: "1.5",
        marginTop: "16px",
        marginBottom: "12px",
    };

    const firstHeadingStyle = {
        ...headingStyle,
        fontSize: "1.5rem", // Larger size for the first heading
        fontWeight: "bold", // Ensure the first heading is bold
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={statusStyle}>
                    <span className="status-icon u-margin-right-8"></span>
                    <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>News</span>
                </div>
                <h4 style={firstHeadingStyle}>
                    Negative news invokes our natural defensive mechanisms and keeps us hooked.
                </h4>
                <h4 style={headingStyle}>
                    But news articles don’t always have to be negative. Stay updated without stressing yourself.
                </h4>
            </div>
        </div>
    );
};

export default Heading;
