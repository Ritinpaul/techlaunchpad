'use client';
import { useState } from 'react';
import EnrollModal from './EnrollModal';

export default function EnrollButton({ course, children, className, style }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        className={className} 
        style={style} 
        onClick={(e) => { e.preventDefault(); setOpen(true); }}
      >
        {children || 'Enroll Now'}
      </button>
      <EnrollModal 
        course={course} 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </>
  );
}
