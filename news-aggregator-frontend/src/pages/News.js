import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NewsList from '../components/NewsList';
import Pagination from '../components/Pagination';

import {
    fetchNews,
    fetchSources,
    fetchCategories,
    fetchAuthors,
} from '../api/api';

const News = () => {
    const [news, setNews] = useState([]);
    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [keyword, setKeyword] = useState('');

    // State for drawer visibility
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        const loadFiltersAndNews = async () => {
            try {
                const sourcesData = await fetchSources();
                const categoriesData = await fetchCategories();
                const authorsData = await fetchAuthors();
                setSources(sourcesData);
                setCategories(categoriesData);
                setAuthors(authorsData);

                const newsData = await fetchNews({ page });
                setNews(newsData.data);
                setTotalPages(newsData.last_page);
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };

        loadFiltersAndNews();
    }, [page]);

    const handleFilterChange = async () => {
        setLoading(true);
        try {
            const filters = {
                sources: selectedSources.join(','),
                categories: selectedCategories.join(','),
                authors: selectedAuthors.join(','),
                keyword,
                page: 1,
            };
            const filteredNews = await fetchNews(filters);
            setNews(filteredNews.data);
            setTotalPages(filteredNews.last_page);
            setPage(1); // Reset page when filters change
        } catch (error) {
            console.error('Error fetching filtered news:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8">
            <Sidebar
                isOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                sources={sources}
                categories={categories}
                authors={authors}
                selectedSources={selectedSources}
                setSelectedSources={setSelectedSources}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedAuthors={selectedAuthors}
                setSelectedAuthors={setSelectedAuthors}
                keyword={keyword}
                setKeyword={setKeyword}
                handleFilterChange={handleFilterChange}
            />
            <div className="flex-1 ml-0 md:ml-8">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Latest News
                </h2>
                <NewsList news={news} loading={loading} />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                )}
            </div>
        </div>
    );
};

export default News;
