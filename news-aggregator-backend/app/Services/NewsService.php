<?php

namespace App\Services;

use GuzzleHttp\Client;

class NewsService
{
    protected $client;

    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client;
        // $this->apiKey = env('NEWS_API_KEY');  // Store API key in .env file
        $this->apiKey = '6fa39a60d51d4295aaf2fdd702c6ceaf';
    }

    public function fetchNews()
    {
        $response = $this->client->get('https://newsapi.org/v2/top-headlines', [
            'query' => [
                'apiKey' => $this->apiKey,
                'country' => 'us',  // You can change to any country code
                'pageSize' => 10,  // Number of articles to fetch
            ],
        ]);

        $data = json_decode($response->getBody()->getContents(), true);

        return $data['articles'] ?? [];
    }
}
