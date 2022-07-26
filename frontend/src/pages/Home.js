import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    fetch('http://localhost:3000/api/post/', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          navigate('/auth');
        } else {
          return res.json();
        }
      })
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <main className='homepage'>
        <h1>Page d'accueil</h1>
        <PostForm />
        <div className='posts-container'>
          {posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              userId={userId}
              handleRefresh={handleRefresh}
            />
          ))}
        </div>
      </main>
    </>
  );
}
