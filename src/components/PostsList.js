import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Jumlah post per halaman
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // Filter dan urutkan post berdasarkan judul pencarian
  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.id - a.id);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Ambil post untuk halaman saat ini
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama setelah pencarian
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let content;

  if (postStatus === 'loading') {
    content = <p className="text-gray-500">Loading...</p>;
  } else if (postStatus === 'succeeded') {
    content = (
      <>
        {currentPosts.map((post) => (
          <article key={post.id} className="p-6 bg-white rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </article>
        ))}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === i + 1 ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </>
    );
  } else if (postStatus === 'failed') {
    content = <p className="text-red-500">{error}</p>;
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Posts</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {content}
    </section>
  );
};

export default PostsList;
