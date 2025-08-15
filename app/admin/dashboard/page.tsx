'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  ImageIcon, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Eye,
  Lock,
  Activity
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const stats = {
    totalUsers: 5,
    activeUsers: 3,
    securityEvents: 12,
    galleryImages: 48,
    weeklyBookings: 7,
    securityScore: 98
  };

  const recentActivity = [
    { id: 1, type: 'login', user: 'contact.Kolac@gmail.com', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'upload', user: 'RajAbey68@gmail.com', time: '4 hours ago', status: 'success' },
    { id: 3, type: 'security', user: 'System', time: '6 hours ago', status: 'blocked' },
    { id: 4, type: 'gallery', user: 'Amir.laurie@gmail.com', time: '1 day ago', status: 'success' }
  ];

  const securityAlerts = [
    { id: 1, type: 'warning', message: 'Multiple failed login attempts detected', time: '1 hour ago' },
    { id: 2, type: 'info', message: 'Security scan completed successfully', time: '6 hours ago' },
    { id: 3, type: 'success', message: 'All security headers properly configured', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ko Lake Villa Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive management and monitoring for luxury villa operations
            </p>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-600">
            System Operational
          </Badge>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                of {stats.totalUsers} total users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.securityScore}%</div>
              <p className="text-xs text-muted-foreground">
                Excellent security posture
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.galleryImages}</div>
              <p className="text-xs text-muted-foreground">
                AI-analyzed and optimized
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Bookings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weeklyBookings}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security Monitor</TabsTrigger>
            <TabsTrigger value="users">User Activity</TabsTrigger>
            <TabsTrigger value="gallery">AI Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest system events and user actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {activity.type === 'login' && <Eye className="h-4 w-4 text-blue-500" />}
                        {activity.type === 'upload' && <ImageIcon className="h-4 w-4 text-green-500" />}
                        {activity.type === 'security' && <Shield className="h-4 w-4 text-red-500" />}
                        {activity.type === 'gallery' && <BarChart3 className="h-4 w-4 text-purple-500" />}
                        <div>
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <Badge variant={activity.status === 'success' ? 'default' : 'destructive'}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Security Alerts
                  </CardTitle>
                  <CardDescription>
                    System security notifications and events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3">
                      {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />}
                      {alert.type === 'info' && <Clock className="h-4 w-4 text-blue-500 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security Monitoring Dashboard
                </CardTitle>
                <CardDescription>
                  Real-time security status and threat detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium">Rate Limiting</p>
                      <p className="text-sm text-muted-foreground">Active & Configured</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium">CSRF Protection</p>
                      <p className="text-sm text-muted-foreground">Enabled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium">XSS Prevention</p>
                      <p className="text-sm text-muted-foreground">Headers Set</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full" onClick={() => window.open('/admin/security', '_blank')}>
                    <Lock className="h-4 w-4 mr-2" />
                    Open Full Security Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management Overview
                </CardTitle>
                <CardDescription>
                  Role-based access control and user activity monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2</div>
                      <p className="text-sm text-muted-foreground">Admin Users</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">1</div>
                      <p className="text-sm text-muted-foreground">Staff Users</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">0</div>
                      <p className="text-sm text-muted-foreground">Partners</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">0</div>
                      <p className="text-sm text-muted-foreground">Agents</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">2</div>
                      <p className="text-sm text-muted-foreground">Guests</p>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => window.open('/admin/users', '_blank')}>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users & Permissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  AI-Powered Gallery Management
                </CardTitle>
                <CardDescription>
                  Intelligent media analysis and SEO optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Images Analyzed</span>
                      <span className="font-medium">48/48</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SEO Optimized</span>
                      <span className="font-medium">42/48</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Video Content</span>
                      <span className="font-medium">6 videos</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Categories</span>
                      <span className="font-medium">8 types</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI Confidence</span>
                      <span className="font-medium text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full" onClick={() => window.open('/admin/ai-gallery', '_blank')}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Open AI Gallery Manager
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => window.open('/admin/ai-gallery', '_blank')}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Manage Gallery
              </Button>
              <Button variant="outline" onClick={() => window.open('/admin/users', '_blank')}>
                <Users className="h-4 w-4 mr-2" />
                User Management
              </Button>
              <Button variant="outline" onClick={() => window.open('/admin/security', '_blank')}>
                <Shield className="h-4 w-4 mr-2" />
                Security Monitor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}