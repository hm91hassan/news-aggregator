<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GuardianService
{
    protected $apiKey;

    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('news.guardian.api_key');
        $this->baseUrl = config('news.guardian.url');
    }

    public function fetchTopStories()
    {
        $apiKey = $this->apiKey;
        $response = Http::get("{$this->baseUrl}search", [
            'api-key' => $apiKey,
            'order-by' => 'newest',
            'show-fields' => 'all',
        ]);

        if ($response->successful()) {
            return $response->json()['response']['results'];
        }

        return [];
    }
}
