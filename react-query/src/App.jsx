import React from 'react';
import './App.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Posts from './components/Posts';

const POSTS = [
  {
    id: '1',
    title: 'Post 1',
  },
  {
    id: '2',
    title: 'Post 2',
  },
];

const App = () => {
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(2000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) =>
      wait(2000).then(() => POSTS.push({ id: crypto.randomUUID(), title })),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <h1>Error</h1>;
  return (
    <div className='App'>
      <h1>React Query</h1>
      {postQuery.data.map((post) => (
        <h2 key={post.id}>{post.title}</h2>
      ))}
      <button
        disabled={postQuery.isLoading}
        onClick={() => newPostMutation.mutate('Post 3')}>
        Add new
      </button>
    </div>
  );
};

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
