from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace with your own API key
API_KEY = ''
NEWS_API_URL = 'https://newsapi.org/v2/everything'

# This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
language_key = ''
language_endpoint = 'https://nonsense.cognitiveservices.azure.com/'

# Authenticate the client using your key and endpoint 
def authenticate_client():
    ta_credential = AzureKeyCredential(language_key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=language_endpoint, 
            credential=ta_credential)
    return text_analytics_client

client = authenticate_client()

@app.route('/fetch_news')
def fetch_news():
    # Fetch news data using the API
    params = {
        'q': 'germany',
        'from': '2024-11-08',
        'sortBy': 'publishedAt',
        'apiKey': API_KEY
    }

    response = requests.get(NEWS_API_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        articles = data.get('articles', [])[:10]  # Get top 10 articles
        news_data = [{"title": article.get('title', 'No title'), 
                      "description": article.get('description', 'No description'),
                      "author": article.get('author', 'Unknown'),
                      "source": article.get('source', {}).get('name', 'Unknown'),
                      "url": article.get('url', ''),
                      "urlToImage": article.get('urlToImage', '')} for article in articles]
        
        # Prepare documents for sentiment analysis
        documents = [f"{news['title']}. {news['description']}" for news in news_data]
        
        # Perform sentiment analysis
        sentiment_results = client.analyze_sentiment(documents, show_opinion_mining=True)
        
        # Process sentiment analysis results
        filtered_news = []
        for idx, result in enumerate(sentiment_results):
            if not result.is_error and (result.sentiment == 'positive' or result.sentiment == 'neutral'):
                sentiment_info = {
                    "title": news_data[idx]['title'],
                    "description": news_data[idx]['description'],
                    "author": news_data[idx]['author'],
                    "source": news_data[idx]['source'],
                    "url": news_data[idx]['url'],
                    "urlToImage": news_data[idx]['urlToImage'],
                    "sentiment": result.sentiment,
                    "confidence_scores": {
                        "positive": result.confidence_scores.positive,
                        "neutral": result.confidence_scores.neutral,
                        "negative": result.confidence_scores.negative
                    }
                }
                filtered_news.append(sentiment_info)
        
        return jsonify(filtered_news)
    else:
        return f"Error fetching news: {response.status_code}"

if __name__ == '__main__':
    app.run(debug=True)
