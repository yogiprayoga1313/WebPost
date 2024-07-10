import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addPost } from '../features/posts/postsSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [saved, setSaved] = useState(false);

  const onSubmit = (data) => {
    dispatch(addPost(data));
    setSaved(true);
    reset();
    setTimeout(() => setSaved(false), 3000); // Reset the saved state after 3 seconds
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            id="title" 
            {...register('title')} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
          <textarea 
            id="body" 
            {...register('body')} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Post
        </button>
        {saved && <p className="mt-4 text-green-500">Post saved successfully!</p>}
      </form>
    </section>
  );
};

export default AddPostForm;
