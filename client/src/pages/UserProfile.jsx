import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile, getPostsByUser } from '../services/api';
import Avatar from '../components/Avatar';
import SkeletonUserProfile from '../components/SkeletonUserProfile';
import PostCard from '../components/PostCard';
import './UserProfile.css';

export default function UserProfile() {
const { userId } = useParams();
const { user: currentUser } = useContext(AuthContext);
const [user, setUser] = useState(null);
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
let cancelled = false;
async function loadProfile() {
setLoading(true);
try {
const profile = await getUserProfile(userId);
const userPosts = await getPostsByUser(userId);
if (cancelled) return;
setUser(profile);
setPosts(userPosts || []);
} catch (err) {
console.error('UserProfile load error', err);
setError('Could not load profile.');
} finally {
if (!cancelled) setLoading(false);
}
}
loadProfile();
return () => { cancelled = true; };
}, [userId]);

if (loading) return <SkeletonUserProfile />;
if (error) return <div className="error-msg">{error}</div>;
if (!user) return <div className="not-found-msg">User not found.</div>;

const canEdit = currentUser && currentUser.id === user._id;

return ( <main className="profile-container"> <section className="profile-header"> <Avatar src={user.avatarUrl} name={user.name} size={80} /> <div className="profile-info"> <h1>{user.name}</h1> <div className="profile-joined">
Joined: {new Date(user.createdAt).toLocaleDateString()} </div> </div>
{canEdit && ( <div className="edit-profile-link">
<Link to={`/users/${user._id}/edit`}>Edit Profile</Link> </div>
)} </section>

    <section className="profile-about">
    <h2>About</h2>
    <p>{user.bio || 'No bio provided.'}</p>
    </section>

    <section className="profile-posts">
    <h2>Posts by {user.name}</h2>
    {posts.length === 0 ? (
        <div>No posts yet.</div>
    ) : (
        <div className="posts-grid">
        {posts.map((p) => (
            <PostCard key={p._id} post={p} />
        ))}
        </div>
    )}
    </section>
</main>

);
}
