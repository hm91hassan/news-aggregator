<?php

return [
    'default' => env('NEWS_SOURCES', 'newsapi'),

    'newsapi' => [
        'name' => 'NewsAPI',
        'api_key' => env('NEWS_API_KEY', '6fa39a60d51d4295aaf2fdd702c6ceaf'),
        'url' => env('NEWS_API_URL', 'https://newsapi.org/v2/'),
    ],
    'guardian' => [
        'name' => 'The Guardian',
        'api_key' => env('GUARDIAN_API_KEY', '4e4ea96e-fd4e-48a5-bc57-a263cd72835c'),
        'url' => env('GUARDIAN_API_URL', 'https://content.guardianapis.com/'),
    ],
    'nyt' => [
        'name' => 'New York Times',
        'api_key' => env('NYT_API_KEY', 'us6j2PRLVXnjKmbsvRqyrmAIoriDsSPq'),
        'url' => env('NYT_API_URL', 'https://api.nytimes.com/svc/'),
    ],

];
