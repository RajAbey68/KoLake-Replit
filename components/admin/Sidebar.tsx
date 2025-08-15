"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Image as ImageIcon, 
  Search, 
  MessageSquare, 
  FileText, 
  Settings,
  Wand2,
  Target,
  Calendar,
  Brain,
  Workflow,
  Users,
  Shield
} from 'lucide-react';

const items = [
  { href: '/admin/overview', label: 'Overview', icon: BarChart3 },
  { href: '/admin/security', label: 'Security Monitor', icon: Shield, isSecure: true },
  { href: '/admin/users', label: 'User Management', icon: Users, isSecure: true },
  { href: '/admin/roles', label: 'Roles & Permissions', icon: Shield, isSecure: true },
  { href: '/admin/shadow-pages', label: 'CONTENT', icon: FileText, isShadowPages: true },
  { href: '/admin/ai-gallery', label: 'AI Gallery', icon: ImageIcon, hasAI: true },
  { href: '/admin/ai-testing', label: 'GPT-5 Testing', icon: Brain, hasAI: true },
  { href: '/admin/seo-meta', label: 'SEO Meta', icon: Search, hasAI: true },
  { href: '/admin/crm', label: 'CRM Dashboard', icon: MessageSquare },
  { href: '/admin/pms-integration', label: 'PMS Integration', icon: Workflow, hasAI: true },
  { href: '/admin/ko-lake-life', label: 'Ko Lake Life', icon: Calendar },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/campaigns', label: 'Campaigns', icon: Target },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="klv-sidebar">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Ko Lake Villa</h2>
        <p className="text-sm text-gray-600">Admin Console</p>
      </div>
      <ul>
        {items.map(item => {
          const active = path === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`klv-navlink ${active ? 'is-active' : ''}`}
              >
                <span className="klv-ic">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-1">
                  {item.label}
                  {item.hasAI && (
                    <Wand2 className="h-3 w-3 text-purple-500" />
                  )}
                  {item.isSecure && (
                    <Shield className="h-3 w-3 text-red-500" />
                  )}
                  {(item as any).isShadowPages && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">SHADOW</span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}