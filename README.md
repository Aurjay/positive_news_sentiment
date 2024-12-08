# Positive News Project

This project is a full-stack application consisting of a frontend built with **Next.js** and **React** and a backend built with **Flask**. The backend integrates with the **Azure Text Analytics API** for sentiment analysis to filter out positive and neutral news articles fetched from an external news API, such as **NewsAPI**.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend](#backend)
  - [Setup](#setup)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [Setup](#setup-1)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Project Structure](#project-structure)

---

## Project Overview

The **Positive News Project** consists of a **backend** that fetches news articles from an external API, performs sentiment analysis using the Azure Text Analytics API, and filters out positive or neutral news articles. The **frontend** is a Next.js application that displays these filtered articles in a user-friendly manner.

---

## Backend

The backend is a Flask application that fetches news articles from an external API and performs sentiment analysis using Azure Text Analytics.

### Setup

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd backend
    ```

2. **Create a virtual environment and activate it:**

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add your Azure Text Analytics credentials:

    ```env
    LANGUAGE_KEY=your_language_key
    LANGUAGE_ENDPOINT=your_language_endpoint
    NEWSAPI_KEY=your_newsapi_key
    ```

### Running the Server

To run the Flask server, use the following command:

```sh
python app.py
The server will start on http://127.0.0.1:5000.

API Endpoints
GET /fetch_news: Fetches news articles and performs sentiment analysis to filter out positive and neutral news articles.
Frontend
The frontend is a Next.js application that displays the news articles fetched by the backend.

Setup
Clone the repository:

sh
Code kopieren
git clone <repository-url>
cd frontend
Install the dependencies:

sh
Code kopieren
npm install
Configure API endpoint:

In the .env.local file in the frontend directory, set the URL for the backend server:

env
Code kopieren
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:5000
Running the Development Server
To run the Next.js development server:

sh
Code kopieren
npm run dev
This will start the development server at http://localhost:3000.

Building for Production
To build the application for production:

sh
Code kopieren
npm run build
To start the production server:

sh
Code kopieren
npm start
Project Structure
Backend
bash
Code kopieren
backend/
├── app.py                  # Main Flask application file
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (for Azure and NewsAPI keys)
├── utils.py                # Helper functions for fetching news and performing sentiment analysis
Frontend
bash
Code kopieren
frontend/
├── pages/                  
│   ├── index.js            # Main page displaying the filtered news articles
├── components/             
│   ├── NewsCard.js         # Component for displaying each news article
│   ├── Navbar.js           # Navigation bar component
├── .env.local              # Local environment variables (e.g., backend URL)
├── package.json            # Node.js dependencies and scripts
Dependencies
Backend (Flask)
Flask
Requests
Python-dotenv
Azure Cognitive Services SDK
Frontend (Next.js)
React
Next.js
Axios (for making HTTP requests to the backend)
arduino
Code kopieren