<?php

namespace App\Console\Commands;

use App\Models\Author;
use App\Models\Category;
use App\Models\News;
use App\Models\Source;
use App\Services\NewsService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FetchNews extends Command
{
    protected $signature = 'fetch:newsapi';

    protected $description = 'Fetch the latest news articles from external sources';

    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        parent::__construct();
        $this->newsService = $newsService;
    }

    public function handle()
    {
        $articles = $this->newsService->fetchNews();

        if (empty($articles)) {
            $this->info('No articles found.');

            return;
        }

        $source = Source::firstOrCreate([
            'name' => config('news.newsapi.name'),
            'api_url' => config('news.newsapi.url'),
        ]);

        foreach ($articles as $article) {
            $author = $article['author'] ?? 'Unknown Author';
            $category = $article['category'] ?? 'General';

            $categoryModel = Category::firstOrCreate([
                'name' => $category,
                'source_id' => $source->id,
            ]);

            $authorModel = Author::firstOrCreate([
                'name' => $author,
                'source_id' => $source->id,
            ]);

            $publishedAt = Carbon::parse($article['publishedAt'])->format('Y-m-d H:i:s');

            News::updateOrCreate([
                'source_id' => $source->id,
                'url' => $article['url'],
            ], [
                'title' => $article['title'],
                'description' => $article['content'] ?? $article['description'] ?? '',
                'author_id' => $authorModel->id,
                'category_id' => $categoryModel->id,
                'url' => $article['url'],
                'image_url' => $article['urlToImage'] ?? null,
                'published_at' => $publishedAt,
            ]);
            // $this->info($article['title']);

        }

        $this->info('News articles fetched successfully!');
    }
}
