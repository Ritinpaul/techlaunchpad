'use client';
import Link from 'next/link';
import { useState } from 'react';
import { formatRupees, makeWhatsAppLink } from '@/lib/utils';
import GroupEnrollModal from './GroupEnrollModal';

export default function CourseCard({ course, showComboHint = true }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article
        className={`program-card${course.isFlagship ? ' flagship' : ''}`}
        aria-label={`${course.name} program`}
      >
        <div className="program-card-top">
          <span className="tag-category">{course.category}</span>
          {course.isFlagship && <span className="tag-most-chosen">Most Chosen</span>}
        </div>

        <h3 className="program-name">{course.tagline || course.name}</h3>
        <p className="program-outcome">{course.outcomes}</p>

        <div className="program-meta">
          <span className="meta-item">{course.duration}</span>
          <span className="meta-dot">·</span>
          <span className="meta-item">{course.format}</span>
          <span className="meta-dot">·</span>
          <span className="meta-item">{course.domains}</span>
        </div>

        {/* Combo savings hint */}
        {showComboHint && course.comboId && course.comboSavings && (
          <div style={{
            background: 'var(--yellow)',
            border: '1.5px solid var(--black)',
            borderRadius: 12,
            padding: '8px 12px',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--black)',
            marginBottom: 16,
          }}>
            💡 Part of All-In-One Combo — save {formatRupees(course.comboSavings)} if bundled
          </div>
        )}

        <div className="program-price-row" style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
          <span className="price-label" style={{ fontSize: 13, color: 'var(--slate)' }}>Cohort Price</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="price-value" style={{ fontSize: 28, fontWeight: 800 }}>{formatRupees(course.price)}</span>
            {course.originalPrice && (
              <span className="price-original" style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: 16 }}>
                {formatRupees(course.originalPrice)}
              </span>
            )}
          </div>
          {course.originalPrice && (
            <div style={{ display: 'inline-flex', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '4px 8px', borderRadius: 6, fontSize: 13, fontWeight: 700, width: 'fit-content', marginTop: 4 }}>
              Save {formatRupees(course.originalPrice - course.price)}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            href={`/courses/${course.slug}`}
            className="btn btn-primary"
            style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
          >
            View Program
          </Link>
          {course.groupOffer && (
            <button
              className="btn btn-secondary-light"
              style={{ padding: '0 16px', fontSize: 13 }}
              onClick={() => setModalOpen(true)}
              title="Group discount available"
            >
              👥
            </button>
          )}
        </div>

        {/* Urgency note */}
        <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 10, textAlign: 'center' }}>
          🔥 Limited seats · Next cohort soon
        </p>
      </article>

      {course.groupOffer && (
        <GroupEnrollModal
          course={course}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
