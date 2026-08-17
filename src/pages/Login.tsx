import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { supabase } from '../lib/supabase';
import { useTheme } from '../hooks/useTheme';

function Login() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        console.error('Erro do Supabase:', {
          message: error.message,
          status: error.status,
          name: error.name,
        });

        const errorText = error.message.toLowerCase();

        if (errorText.includes('email not confirmed')) {
          setErrorMessage(
            'Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada.'
          );

          return;
        }

        if (errorText.includes('invalid login credentials')) {
          setErrorMessage('E-mail ou senha inválidos.');

          return;
        }

        setErrorMessage(`Não foi possível entrar: ${error.message}`);

        return;
      }

      if (!data.session) {
        setErrorMessage('Não foi possível iniciar uma sessão válida.');

        return;
      }

      console.log('Lembrar usuário:', rememberMe);

      navigate('/dashboard', {
        replace: true,
      });
    } catch (error) {
      console.error('Erro inesperado no login:', error);

      setErrorMessage('Não foi possível conectar ao serviço de autenticação.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-body">
      <button
        className="icon-button theme-toggle auth-theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={
          theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
        }
        title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      >
        <i
          className={theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'}
          aria-hidden="true"
        />
      </button>

      <main className="auth-page">
        <section className="auth-card">
          <Link
            className="auth-brand"
            to="/"
            aria-label="Voltar para a página inicial"
          >
            <span className="brand-icon">
              <i className="bi bi-grid-1x2-fill" aria-hidden="true" />
            </span>

            <span>
              <strong>Meu App</strong>

              <small>Entre na sua conta.</small>
            </span>
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="eyebrow mb-1">Acesso seguro</p>

              <h1 className="h3 mb-1">Login</h1>

              <p className="text-muted mb-0">Entre para acessar sua conta.</p>
            </div>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                <i
                  className="bi bi-exclamation-circle me-2"
                  aria-hidden="true"
                />

                {errorMessage}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label" htmlFor="login-email">
                E-mail
              </label>

              <input
                id="login-email"
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label" htmlFor="login-password">
                  Senha
                </label>

                <Link className="small fw-semibold" to="/recuperar-senha">
                  Esqueceu?
                </Link>
              </div>

              <input
                id="login-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                minLength={6}
                disabled={loading}
                required
              />
            </div>

            <div className="form-check mb-4">
              <input
                id="remember-me"
                type="checkbox"
                className="form-check-input"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                disabled={loading}
              />

              <label className="form-check-label" htmlFor="remember-me">
                Lembrar de mim
              </label>
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  />

                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right" aria-hidden="true" />

                  <span>Entrar</span>
                </>
              )}
            </button>

            <div className="auth-footer">
              Ainda não tem uma conta? <Link to="/cadastro">Criar conta</Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;
