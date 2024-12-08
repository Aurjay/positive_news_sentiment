import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";

const ImportNews = () => {
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState([]);
    const [fadeIn, setFadeIn] = useState(false); // Animation for cards

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:5000/fetch_news');
            setNews(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger animation for cards when data is fetched
    useEffect(() => {
        if (news.length > 0) {
            setFadeIn(true);
        }
    }, [news]);

    // Button loading style
    const buttonStyle = {
        backgroundColor: loading ? '#007bff' : '#007bff', // Green when loading
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    };

    const spinnerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const dotStyle = {
        width: '10px',
        height: '10px',
        margin: '0 3px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        animation: 'dotFlashing 1s infinite ease-in-out',
    };

    const dotAnimation = {
        animation: 'dotFlashing 1s infinite ease-in-out',
    };

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '200px',
        width: '75%',
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out',
    };

    const cardContentStyle = {
        textAlign: 'left',
        padding: '16px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#f8f8f8',
    };

    return (
        <div>
            <div className="u-flex u-main-center u-margin-32">
                <button style={buttonStyle} onClick={fetchNews}>
                    {loading ? (
                        <div style={spinnerStyle}>
                            <div style={{ ...dotStyle, animationDelay: '0s' }}></div>
                            <div style={{ ...dotStyle, animationDelay: '0.2s' }}></div>
                            <div style={{ ...dotStyle, animationDelay: '0.4s' }}></div>
                        </div>
                    ) : (
                        "Fetch Positive News"
                    )}
                </button>
            </div>

            <div
                className="u-direction-column"
                style={{ maxHeight: '80vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            >
                {news.map((article, index) =>
                    article.title && article.title.trim() !== '' ? (
                        <div key={index} style={cardStyle}>
                            <div style={cardContentStyle}>
                                <img
                                    className="avatar u-self-center"
                                    style={{ maxWidth: '500px', maxHeight: '500px', objectFit: 'cover' }}
                                    src={article.urlToImage || 'https://unsplash.it/100'}
                                    alt="Article"
                                />
                                <div>
                                    <p className="u-font-bold u-text-md u-text-left" style={{ marginBottom: '8px' }}>
                                        {article.title}
                                    </p>
                                    <p className="u-text-sm u-text-left" style={{ marginBottom: '12px' }}>
                                        {article.description}
                                    </p>
                                    <a
                                        className="u-text-blue u-text-left"
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: '#007bff' }}
                                    >
                                        Read more
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default ImportNews;
