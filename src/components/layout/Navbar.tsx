import { Link, useNavigate } from 'react-router-dom';

import { useTheme } from '../../hooks/useTheme';

interface NavbarProps {
  fullName?: string;
  avatarUrl?: string | null;
  onToggleSidebar: () => void;
  onLogout: () => Promise<void>;
}

function Navbar({
  fullName = 'Usuário',
  avatarUrl,
  onToggleSidebar,
  onLogout,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  async function handleLogout() {
    try {
      await onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  }

  return (
    <nav className="navbar admin-navbar navbar-expand bg-white">
      <div className="container-fluid px-3 px-lg-4">
        <button
          className="sidebar-toggle"
          type="button"
          onClick={onToggleSidebar}
          aria-controls="adminSidebar"
          aria-label="Abrir ou recolher menu lateral"
        >
          <span />
          <span />
          <span />
        </button>

        <form
          className="d-none d-md-flex ms-3 flex-grow-1"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className="form-control search-input"
            type="search"
            placeholder="Pesquisar"
            aria-label="Pesquisar"
          />
        </form>

        <div className="navbar-actions ms-auto">
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
            }
            title={
              theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
            }
          >
            <i
              className={theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'}
              aria-hidden="true"
            />
          </button>

          <div className="dropdown">
            <button
              className="icon-button"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Notificações"
            >
              <span className="notification-dot" />

              <i className="bi bi-bell" aria-hidden="true" />
            </button>

            <div className="dropdown-menu dropdown-menu-end notification-menu">
              <div className="dropdown-header fw-bold text-body">
                Notificações
              </div>

              <button className="dropdown-item" type="button">
                <span className="notification-title">Bem-vindo ao sistema</span>

                <span className="notification-time">Agora</span>
              </button>
            </div>
          </div>

          <div className="dropdown">
            <button
              className="profile-button dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {avatarUrl ? (
                { avatarUrl }
              ) : (
                <span className="profile-avatar avatar-sm">
                  {initials || 'US'}
                </span>
              )}

              <span className="profile-name d-none d-sm-inline">
                {fullName}
              </span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/dashboard/perfil">
                  <i className="bi bi-person me-2" aria-hidden="true" />
                  Perfil
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/dashboard/configuracoes">
                  <i className="bi bi-gear me-2" aria-hidden="true" />
                  Configurações
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={handleLogout}
                >
                  <i
                    className="bi bi-box-arrow-right me-2"
                    aria-hidden="true"
                  />
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
