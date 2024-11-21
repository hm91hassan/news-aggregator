<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NYTService
{
    protected $apiKey;

    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('news.nyt.api_key');
        $this->baseUrl = config('news.nyt.url');
    }

    public function fetchTopStories($section = 'home')
    {
        $url = "{$this->baseUrl}topstories/v2/{$section}.json";

        $response = Http::get($url, ['api-key' => $this->apiKey]);

        if ($response->successful()) {
            return $response->json()['results'];
        }

        return [];
    }

    public function searchArticles($query)
    {
        $url = "{$this->baseUrl}search/v2/articlesearch.json";
        $response = Http::get($url, [
            'q' => $query,
            'api-key' => $this->apiKey,
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return [];
    }
}
