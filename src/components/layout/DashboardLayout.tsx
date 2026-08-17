import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useSidebar } from '../../hooks/useSidebar';
import { supabase } from '../../lib/supabase';

import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  plan: string | null;
}

function DashboardLayout() {
  const { user, signOut } = useAuth();

  const { isSidebarOpen, isSidebarMini, toggleSidebar, closeSidebar } =
    useSidebar();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setLoadingProfile(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url, plan')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erro ao carregar perfil:', error.message);
      } else {
        setProfile(data);
      }

      setLoadingProfile(false);
    }

    loadProfile();
  }, [user]);

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', isSidebarOpen);

    document.body.classList.toggle('sidebar-mini', isSidebarMini);

    return () => {
      document.body.classList.remove('sidebar-open');

      document.body.classList.remove('sidebar-mini');
    };
  }, [isSidebarOpen, isSidebarMini]);

  if (loadingProfile) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando perfil...</span>
        </div>
      </div>
    );
  }

  const fullName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    'Usuário';

  const email = profile?.email || user?.email || '';

  return (
    <div className="admin-shell">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        fullName={fullName}
        email={email}
        avatarUrl={profile?.avatar_url}
        plan={profile?.plan || 'basic'}
      />

      <div className="admin-main">
        <Navbar
          fullName={fullName}
          avatarUrl={profile?.avatar_url}
          onToggleSidebar={toggleSidebar}
          onLogout={signOut}
        />

        <main className="dashboard-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
``;
