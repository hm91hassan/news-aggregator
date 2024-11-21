import React from 'react';

const Sidebar = ({
    isOpen,
    toggleDrawer,
    sources,
    categories,
    authors,
    selectedSources,
    setSelectedSources,
    selectedCategories,
    setSelectedCategories,
    selectedAuthors,
    setSelectedAuthors,
    keyword,
    setKeyword,
    handleFilterChange,
}) => {
    const handleCheckboxChange = (selectedList, setSelectedList, id, isChecked) => {
        if (isChecked) {
            setSelectedList([...selectedList, id]);
        } else {
            setSelectedList(selectedList.filter((item) => item !== id));
        }
    };

    return (
        <>
            {/* Drawer Toggle Button for Mobile */}
            <button
                onClick={toggleDrawer}
                className="md:hidden fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                aria-label="Toggle Filters"
            >
                {/* SVG Filter Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12.414V17a1 1 0 01-.553.894l-4 2A1 1 0 019 19v-6.586L3.293 6.707A1 1 0 013 6V4z"
                    />
                </svg>
            </button>

            {/* Sidebar / Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
                    isOpen ? 'translate-x-0 max-h overflow-y-auto' : '-translate-x-full'
                } transition-transform duration-300 md:relative md:translate-x-0`}
            >
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-4">Filters</h3>

                    {/* Keyword Search */}
                    <div className="mb-4">
                        <h4 className="font-medium">Search News</h4>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search by keyword..."
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Sources Filter */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-gray-700">Sources</h4>
                        <div className="max-h-20 overflow-y-auto">
                            {sources.map((source) => (
                                <div key={source.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedSources.includes(source.id.toString())}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                selectedSources,
                                                setSelectedSources,
                                                source.id.toString(),
                                                e.target.checked
                                            )
                                        }
                                        className="mr-2"
                                    />
                                    <label>{source.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories Filter */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-gray-700">Categories</h4>
                        <div className="max-h-60 overflow-y-auto">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.id.toString())}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                selectedCategories,
                                                setSelectedCategories,
                                                category.id.toString(),
                                                e.target.checked
                                            )
                                        }
                                        className="mr-2"
                                    />
                                    <label>{category.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Authors Filter */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-gray-700">Authors</h4>
                        <div className="max-h-60 overflow-y-auto">
                            {authors.map((author) => (
                                <div key={author.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedAuthors.includes(author.id.toString())}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                selectedAuthors,
                                                setSelectedAuthors,
                                                author.id.toString(),
                                                e.target.checked
                                            )
                                        }
                                        className="mr-2"
                                    />
                                    <label>{author.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Apply Filters Button */}
                    <button
                        onClick={() => {
                            handleFilterChange();
                            toggleDrawer(); // Close drawer after applying filters
                        }}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    onClick={toggleDrawer}
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                ></div>
            )}
        </>
    );
};

export default Sidebar;
