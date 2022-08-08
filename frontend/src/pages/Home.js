import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PostForm from '../components/forms/PostForm';
import PostCard from '../components/cards/PostCard';

export default function Home() {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`${process.env.REACT_APP_API_URL}/api/user/me`, {
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
      .then(res => {
        setUserInfo({
          id: res._id,
          firstname: res.firstname,
          lastname: res.lastname,
          role: res.role,
        });
      })
      .catch(err => console.log(err));
  }, [navigate, setUserInfo]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`${process.env.REACT_APP_API_URL}/api/post/`, {
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
  }, [navigate]);

  const handleRefresh = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`${process.env.REACT_APP_API_URL}/api/post/`, {
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
      <Layout>
        <main className='homepage'>
          <h1>Page d'accueil</h1>
          <PostForm handleRefresh={handleRefresh} />
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
      </Layout>
    </>
  );
}
