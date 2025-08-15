import AdminShell from '@/components/admin/AdminShell';
import EnhancedGalleryManager from '@/components/admin/enhanced-gallery-manager';

export default function AIGalleryPage() {
  return (
    <AdminShell 
      title="AI Gallery Manager" 
      subtitle="Upload, analyze, and manage villa images with AI"
    >
      <EnhancedGalleryManager />
    </AdminShell>
  );
}