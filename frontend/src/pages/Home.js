import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    fetch('http://localhost:3000/api/post/', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      });
  }, []);

  return (
    <>
      <main className='homepage'>
        <h1>Page d'accueil</h1>
        <div className='posts-container'>
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
