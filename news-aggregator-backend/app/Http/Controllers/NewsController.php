<?php

namespace App\Http\Controllers;

use App\Http\Requests\FetchNewsRequest;
use App\Models\Category;
use App\Models\News;
use App\Models\Source;
use App\Services\GuardianService;
use App\Services\NewsService;
use App\Services\NYTService;

class NewsController extends Controller
{
    protected $nytService;

    protected $newsService;

    protected $guardianService;

    public function __construct(NYTService $nytService, NewsService $newsService, GuardianService $guardianService)
    {
        $this->nytService = $nytService;
        $this->newsService = $newsService;
        $this->guardianService = $guardianService;
    }

    public function index(FetchNewsRequest $request)
    {
        try {

            $preferences = $this->savePreferences($request);

            $query = News::query();

            if (! empty($preferences['sources'])) {
                $query->whereIn('source_id', $preferences['sources']);
            }

            if (! empty($preferences['categories'])) {
                $query->whereIn('category_id', $preferences['categories']);
            }

            if (! empty($preferences['authors'])) {
                $query->whereIn('author_id', $preferences['authors']);
            }

            if (! empty($preferences['keyword'])) {
                $query->where(function ($q) use ($preferences) {
                    $q->where('title', 'like', '%'.$preferences['keyword'].'%')
                        ->orWhere('description', 'like', '%'.$preferences['keyword'].'%');
                });
            }

            $news = $query->with(['source', 'category', 'author'])->orderBy('created_at', 'desc')->paginate(12);

            return response()->json([
                'success' => true,
                'data' => $news,
                'preferences' => $preferences,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching news: '.$e->getMessage(),
            ], 500);
        }
    }

    public function categories()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function authors()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function sources()
    {
        $categories = Source::all();

        return response()->json($categories);
    }

    private function savePreferences($request)
    {
        $validated = $request->validated();
        $user = $request->user();

        $preferences = [
            'sources' => [],
            'categories' => [],
            'authors' => [],
            'keyword' => $validated['keyword'] ?? null,
        ];

        $filtersProvided = ! empty($validated['sources']) || ! empty($validated['categories']) || ! empty($validated['authors']);

        if ($filtersProvided) {
            // Save preferences if filters are provided
            $user->preferences()->updateOrCreate([], [
                'sources' => $validated['sources'] ? explode(',', $validated['sources']) : null,
                'categories' => $validated['categories'] ? explode(',', $validated['categories']) : null,
                'authors' => $validated['authors'] ? explode(',', $validated['authors']) : null,
            ]);

            $preferences['sources'] = $validated['sources'] ? explode(',', $validated['sources']) : [];
            $preferences['categories'] = $validated['categories'] ? explode(',', $validated['categories']) : [];
            $preferences['authors'] = $validated['authors'] ? explode(',', $validated['authors']) : [];
        } else {
            // Load preferences if no filters are provided
            $storedPreferences = $user->preferences;

            if ($storedPreferences) {
                $preferences['sources'] = $storedPreferences->sources ?? [];
                $preferences['categories'] = $storedPreferences->categories ?? [];
                $preferences['authors'] = $storedPreferences->authors ?? [];
            }
        }

        return $preferences;
    }
}
