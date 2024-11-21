import React from 'react';

const NewsList = ({ news }) => {
    console.log('NewsList ===== ',news.data)

    if (!Array.isArray(news?.data) || news?.data.length === 0) {
        return <p>No news available</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news?.data.map((article, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                 
                    <p className="text-sm text-red-600 mb-2 font-semibold">{article.category?.name || 'Unknown'}</p>

                    {article.image_url && (
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                        />
                    )}
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">By: {article.author?.name || 'Unknown'}</p>
                        <p className="text-sm text-gray-500 mt-2">
                        {new Date(article.published_at).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mt-3 line-clamp-3">
                            {article.description}
                        </p>
                    </div>
                  
                   
                 
                    <div className="p-5 flex ">
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                        >
                            Read more
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsList;
