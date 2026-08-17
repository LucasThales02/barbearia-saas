import { Link, useNavigate } from 'react-router-dom';

import { useTheme } from './hooks/useTheme';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { theme, toggleTheme } = useTheme();

  const { user, loading, signOut } = useAuth();

  const navigate = useNavigate();

  const isLogged = Boolean(user);

  async function handleLogout() {
    try {
      await signOut();

      navigate('/', {
        replace: true,
      });
    } catch (error) {
      console.error(
        'Erro ao encerrar sessão:',

        error
      );
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="navbar admin-navbar navbar-expand bg-white">
        <div className="container-fluid px-3 px-lg-4">
          <div className="navbar-actions ms-auto">
            {/* Botão para alterar o tema */}
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

            {/* Notificações */}
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

                <Link className="dropdown-item" to="/usuarios">
                  <span className="notification-title">
                    Novo usuário cadastrado
                  </span>

                  <span className="notification-time">Há 4 minutos</span>
                </Link>

                <Link className="dropdown-item" to="/dashboard">
                  <span className="notification-title">
                    Meta de receita atingida
                  </span>

                  <span className="notification-time">Há 32 minutos</span>
                </Link>

                <Link className="dropdown-item" to="/configuracoes">
                  <span className="notification-title">
                    Revisão de segurança concluída
                  </span>

                  <span className="notification-time">Há 1 hora</span>
                </Link>
              </div>
            </div>

            {/* Login, cadastro ou perfil */}
            {isLogged ? (
              <div className="dropdown">
                <button
                  className="profile-button dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="profile-avatar">
                    {(
                      user?.user_metadata?.full_name ||
                      user?.user_metadata?.name ||
                      user?.email ||
                      'U'
                    )
                      .split(' ')
                      .filter(Boolean)
                      .map((part: string) => part[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </span>

                  <span className="profile-name d-none d-sm-inline">
                    {user?.user_metadata?.full_name ||
                      user?.user_metadata?.name ||
                      user?.email ||
                      'Usuário'}
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
                    <Link className="dropdown-item" to="/dashboard">
                      <i
                        className="bi bi-speedometer2 me-2"
                        aria-hidden="true"
                      />
                      Dashboard
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
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary">
                  <i className="bi bi-box-arrow-in-right" aria-hidden="true" />
                  Login
                </Link>

                <Link to="/cadastro" className="btn btn-primary">
                  <i className="bi bi-person-plus" aria-hidden="true" />
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <div className="page-heading">
            <div className="page-heading-copy">
              <span className="page-icon">
                <i className="bi bi-speedometer2" aria-hidden="true" />
              </span>

              <div>
                <p className="eyebrow mb-1">Planos</p>

                <h1 className="h3 mb-1">Escolha o plano ideal</h1>

                <p className="text-muted mb-0">
                  Gerencie sua operação com mais eficiência.
                </p>
              </div>
            </div>
          </div>

          <section className="row g-3 mt-1" aria-label="Planos disponíveis">
            {/* Plano Basic */}
            <div className="col-12 col-sm-6 col-xl-4">
              <article className="metric-card metric-primary h-100">
                <div className="metric-top">
                  <span className="metric-label">Basic</span>

                  <button className="btn btn-primary btn-sm" type="button">
                    <i className="bi bi-briefcase" aria-hidden="true" />
                    Contratar
                  </button>
                </div>

                <div className="metric-value">
                  R$ 29 <span className="eyebrow mb-1">/mês</span>
                </div>

                <div className="metric-meta">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <i className="bi bi-check-circle-fill me-2" />1 usuário
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Dashboard
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Relatórios básicos
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Suporte
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            {/* Plano Pro */}
            <div className="col-12 col-sm-6 col-xl-4">
              <article className="metric-card metric-success h-100">
                <div className="metric-top">
                  <span className="metric-label">Pro</span>

                  <button className="btn btn-primary btn-sm" type="button">
                    <i className="bi bi-briefcase" aria-hidden="true" />
                    Contratar
                  </button>
                </div>

                <div className="metric-value">
                  R$ 79 <span className="eyebrow mb-1">/mês</span>
                </div>

                <div className="metric-meta">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <i className="bi bi-check-circle-fill me-2" />5 usuários
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Dashboard avançado
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Relatórios completos
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Suporte prioritário
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            {/* Plano Enterprise */}
            <div className="col-12 col-sm-6 col-xl-4">
              <article className="metric-card metric-warning h-100">
                <div className="metric-top">
                  <span className="metric-label">Enterprise</span>

                  <button className="btn btn-primary btn-sm" type="button">
                    <i className="bi bi-briefcase" aria-hidden="true" />
                    Contratar
                  </button>
                </div>

                <div className="metric-value">
                  R$ 150 <span className="eyebrow mb-1">/mês</span>
                </div>

                <div className="metric-meta">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Usuários ilimitados
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Integrações
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Acesso à API
                    </li>

                    <li>
                      <i className="bi bi-check-circle-fill me-2" />
                      Suporte dedicado
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
