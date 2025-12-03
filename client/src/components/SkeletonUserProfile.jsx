import React from 'react';

export default function SkeletonUserProfile() {
    return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--skeleton-bg)' }} />
        <div style={{ flex: 1 }}>
            <div style={{ height: 18, width: '40%', background: 'var(--skeleton-bg)', borderRadius: 6, marginBottom: 8 }} />
            <div style={{ height: 12, width: '30%', background: 'var(--skeleton-bg)', borderRadius: 6 }} />
        </div>
        </div>

        <div style={{ height: 12, width: '100%', background: 'var(--skeleton-bg)', borderRadius: 6, marginBottom: 8 }} />
        <div style={{ height: 12, width: '95%', background: 'var(--skeleton-bg)', borderRadius: 6, marginBottom: 8 }} />
        <div style={{ height: 12, width: '90%', background: 'var(--skeleton-bg)', borderRadius: 6, marginBottom: 8 }} />

        <div style={{ marginTop: 20 }}>
        <div style={{ height: 180, width: '100%', background: 'var(--skeleton-bg)', borderRadius: 6 }} />
        </div>
    </div>
    );
}
