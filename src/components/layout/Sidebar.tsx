import { NavLink } from 'react-router-dom';
import { getTrialDaysRemaining } from '../../utils/subscription';

interface SidebarProps {
  onClose: () => void;
  fullName?: string;
  email?: string;
  avatarUrl?: string | null;
  plan?: string | null;
  subscriptionStatus?: string;
  trialEndsAt?: string | null;
}

function Sidebar({
  onClose,
  fullName = 'Usuário',
  email = '',
  avatarUrl,
  plan,
  subscriptionStatus = 'trial',
  trialEndsAt,
}: SidebarProps) {
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

    const trialDaysRemaining =
    getTrialDaysRemaining(trialEndsAt ?? null);

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
            <img src={ avatarUrl } alt="Avatar"/>
          ) : (
            <span className="profile-avatar avatar-md sidebar-user-avatar">
              {initials || 'US'}
            </span>
          )}

          <strong>{fullName}</strong>

          <small>{email}</small>

          {subscriptionStatus === 'trial' ? (
            <span className="badge text-bg-warning mt-2">
              Trial: {trialDaysRemaining}{' '}
              {trialDaysRemaining === 1 ? 'dia' : 'dias'}
            </span>
          ) : subscriptionStatus === 'active' && plan ? (
            <span className="badge text-bg-success mt-2">Plano {plan}</span>
          ) : (
            <span className="badge text-bg-danger mt-2">
              Assinatura expirada
            </span>
          )}
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
