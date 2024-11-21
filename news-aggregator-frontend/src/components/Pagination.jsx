import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="px-4 py-2 mx-1">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
