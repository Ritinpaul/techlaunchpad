import MultiStepForm from '@/components/ui/MultiStepForm';

export const metadata = {
  title: 'Enroll Now — MBA Partner',
  description: 'Tell us about your target domain and get a customized roadmap.',
};

export default function EnrollPage() {
  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--section-gap) 0' }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <MultiStepForm />
      </div>
    </div>
  );
}
