import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PostsList from './components/PostsList';
import AddPostForm from './components/AddPostForm';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <AddPostForm />
        <PostsList />
      </div>
    </Provider>
  );
};

export default App;
