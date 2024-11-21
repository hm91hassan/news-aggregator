<?php

namespace App\Console\Commands;

use App\Models\Author;
use App\Models\Category;
use App\Models\News;
use App\Models\Source;
use App\Services\GuardianService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FetchNewsFromGuardian extends Command
{
    protected $signature = 'fetch:guardian-news';

    protected $description = 'Fetch news articles from The Guardian API and store them in the local database';

    protected $guardianService;

    public function __construct(GuardianService $guardianService)
    {
        parent::__construct();
        $this->guardianService = $guardianService;
    }

    public function handle()
    {
        $articles = $this->guardianService->fetchTopStories();
        if (empty($articles)) {
            $this->error('No articles fetched from The Guardian.');

            return;
        }

        $source = Source::firstOrCreate([
            'name' => config('news.guardian.name'),
            'api_url' => config('news.guardian.url'),
        ]);

        foreach ($articles as $article) {

            $category = $article['sectionName'] ?? 'General';
            $categoryModel = Category::firstOrCreate([
                'name' => $category,
                'source_id' => $source->id,
            ]);

            $author = $article['fields']['byline'] ?? 'Unknown Author';
            $authorModel = Author::firstOrCreate([
                'name' => $author,
                'source_id' => $source->id,
            ]);

            $publishedAt = Carbon::parse($article['webPublicationDate'])->format('Y-m-d H:i:s');
            $description = mb_substr($article['fields']['bodyText'] ?? $article['fields']['trailText'], 0, 1000);
            News::updateOrCreate([
                'source_id' => $source->id,
                'url' => $article['webUrl'],
            ], [
                'title' => $article['webTitle'],
                'description' => $description,
                'author_id' => $authorModel->id,
                'category_id' => $categoryModel->id,
                'image_url' => $article['fields']['thumbnail'] ?? null,
                'published_at' => $publishedAt,

            ]);

            // $this->info($article['webTitle']);
        }

        $this->info('News articles fetched and stored successfully!');
    }
}
