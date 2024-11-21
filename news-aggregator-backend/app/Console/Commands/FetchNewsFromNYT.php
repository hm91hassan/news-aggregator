<?php

namespace App\Console\Commands;

use App\Models\Author;
use App\Models\Category;
use App\Models\News;
use App\Models\Source;
use App\Services\NYTService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FetchNewsFromNYT extends Command
{
    protected $signature = 'fetch:nytimes-news';

    protected $description = 'Fetch news articles from the New York Times API and store them in the local database';

    protected $nytService;

    public function __construct(NYTService $nytService)
    {
        parent::__construct();
        $this->nytService = $nytService;
    }

    public function handle()
    {
        $articles = $this->nytService->fetchTopStories();

        if (empty($articles)) {
            $this->error('No articles fetched from New York Times.');

            return;
        }
        $source = Source::firstOrCreate([
            'name' => config('news.nyt.name'),
            'api_url' => config('news.nyt.url'),
        ]);

        foreach ($articles as $article) {
            $category = $article['section'] ?? 'General';
            $categoryModel = Category::firstOrCreate([
                'name' => $category,
                'source_id' => $source->id,
            ]);

            $author = $article['byline'] ?? 'Unknown Author';
            $authorModel = Author::firstOrCreate([
                'name' => $author,
                'source_id' => $source->id,
            ]);

            $publishedAt = Carbon::parse($article['published_date'])->format('Y-m-d H:i:s');

            News::updateOrCreate([
                'source_id' => $source->id,
                'url' => $article['url'],
            ], [
                'title' => $article['title'],
                'description' => $article['description'] ?? $article['content'] ?? '',
                'author_id' => $authorModel->id,
                'category_id' => $categoryModel->id,
                'image_url' => $article['multimedia'][0]['url'] ?? null,
                'published_at' => $publishedAt,

            ]);

        }
        $this->info('News articles fetched successfully!');

    }
}
