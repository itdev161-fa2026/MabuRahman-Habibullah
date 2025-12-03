import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/api';
import Avatar from '../components/Avatar';
import './EditProfile.css';

export default function EditProfile() {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load profile
  useEffect(() => {
    if (!currentUser) return;

    const loadProfile = async () => {
      try {
        const profile = await getUserProfile(currentUser.id);
        setBio(profile.bio || '');
        setAvatarUrl(profile.avatarUrl || '');
      } catch (err) {
        console.error('Error loading profile:', err.response?.data || err.message);
        setError('Could not load profile.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Basic client-side validation
      if (bio.length > 500) {
        setError('Bio cannot exceed 500 characters.');
        setSaving(false);
        return;
      }

      await updateUserProfile(bio, avatarUrl);
      navigate(`/users/${currentUser.id}`);
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-msg">Loading...</div>;

  return (
    <main className="edit-profile-container">
      <h1>Edit Profile</h1>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="avatar-preview">
          <Avatar src={avatarUrl} name={currentUser.name} size={80} />
        </div>
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
            disabled={saving}
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Paste image URL"
            disabled={saving}
          />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
}
