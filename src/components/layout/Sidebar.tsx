import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  fullName?: string;
  email?: string;
  avatarUrl?: string | null;
  plan?: string;
}

function Sidebar({
  isOpen,
  onClose,
  fullName = 'Usuário',
  email = '',
  avatarUrl,
  plan = 'basic',
}: SidebarProps) {
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      <button
        className="sidebar-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Fechar menu lateral"
      />

      <aside
        className="admin-sidebar"
        id="adminSidebar"
        aria-label="Navegação principal"
      >
        <div className="sidebar-header">
          <NavLink
            className="brand-mark"
            to="/dashboard"
            aria-label="Ir para o dashboard"
          >
            <span className="brand-icon">
              <i className="bi bi-grid-1x2-fill" aria-hidden="true" />
            </span>

            <span className="brand-copy">
              <span className="brand-title">Meu App</span>

              <span className="brand-subtitle">Painel administrativo</span>
            </span>
          </NavLink>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            end
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">
              <i className="bi bi-speedometer2" aria-hidden="true" />
            </span>

            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/usuarios"
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">
              <i className="bi bi-people" aria-hidden="true" />
            </span>

            <span className="nav-text">Usuários</span>
          </NavLink>

          <NavLink
            to="/dashboard/perfil"
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">
              <i className="bi bi-person-badge" aria-hidden="true" />
            </span>

            <span className="nav-text">Perfil</span>
          </NavLink>

          <NavLink
            to="/dashboard/configuracoes"
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">
              <i className="bi bi-gear" aria-hidden="true" />
            </span>

            <span className="nav-text">Configurações</span>
          </NavLink>
        </nav>

        <div className="sidebar-user">
          {avatarUrl ? (
            { avatarUrl }
          ) : (
            <span className="profile-avatar avatar-md sidebar-user-avatar">
              {initials || 'US'}
            </span>
          )}

          <strong>{fullName}</strong>

          <small>{email}</small>

          <span className="badge text-bg-primary mt-2">Plano {plan}</span>
        </div>

        <div className="sidebar-footer">
          <span className="status-dot" />

          <span className="sidebar-footer-text">Sistema funcionando</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
