// Serverless function to proxy SerpAPI requests and avoid CORS issues
import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers to allow requests from your frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Extract query parameters
  const { authorId = '3KZSSEIAAAAJ' } = req.query;
  
  // Use the API key from the environment or the provided key
  const apiKey = process.env.SERPAPI_KEY || 'a9e3ad6cd808100a64cf470aa61515b3af90c30b8ea18e6ba0efe5f479d68b97';
  
  try {
    // Make the request to SerpAPI
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_scholar_author',
        author_id: authorId,
        api_key: apiKey,
        num: 100,
        sort: 'pubdate'
      }
    });
    
    // Return the data from SerpAPI
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error proxying to SerpAPI:', error);
    
    // Return an appropriate error response
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch from SerpAPI',
      message: error.message,
      details: error.response?.data
    });
  }
}
