import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { supabase } from '../lib/supabase';
import { useTheme } from '../hooks/useTheme';

function Register() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setErrorMessage('Informe seu nome.');
      return;
    }

    if (!cleanEmail) {
      setErrorMessage('Informe seu e-mail.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve possuir pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('A confirmação da senha não corresponde.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            name: cleanName,
            full_name: cleanName,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }

      /*
       * Se a confirmação de e-mail estiver
       * desabilitada, o Supabase cria a sessão
       * imediatamente.
       */
      if (data.session) {
        navigate('/');
        return;
      }

      /*
       * Se a confirmação estiver habilitada,
       * o usuário deverá confirmar o e-mail.
       */
      setSuccessMessage(
        'Cadastro realizado com sucesso. Verifique seu e-mail para confirmar a conta.'
      );

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: unknown) {
      console.error('Erro ao cadastrar usuário:', error);

      if (error instanceof Error) {
        if (error.message === 'Password should be at least 6 characters.') {
          setErrorMessage('A senha deve possuir pelo menos 6 caracteres.');
        } else {
          setErrorMessage(`Não foi possível criar a conta: ${error.message}`);
        }
      } else {
        setErrorMessage('Não foi possível criar a conta.');
      }
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

              <small>Crie sua conta para começar.</small>
            </span>
          </Link>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <p className="eyebrow mb-1">Nova conta</p>

              <h1 className="h3 mb-1">Cadastro</h1>

              <p className="text-muted mb-0">
                Preencha os dados para criar sua conta.
              </p>
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

            {successMessage && (
              <div className="alert alert-success" role="alert">
                <i className="bi bi-check-circle me-2" aria-hidden="true" />

                {successMessage}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label" htmlFor="register-name">
                Nome completo
              </label>

              <input
                id="register-name"
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Digite seu nome"
                autoComplete="name"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="register-email">
                E-mail
              </label>

              <input
                id="register-email"
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nome@exemplo.com"
                autoComplete="email"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="register-password">
                Senha
              </label>

              <input
                id="register-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mínimo de 6 caracteres"
                autoComplete="new-password"
                minLength={6}
                disabled={loading}
                required
              />

              <div className="form-text">Utilize pelo menos 6 caracteres.</div>
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="register-confirm-password">
                Confirmar senha
              </label>

              <input
                id="register-confirm-password"
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Digite novamente sua senha"
                autoComplete="new-password"
                minLength={6}
                disabled={loading}
                required
              />
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

                  <span>Criando conta...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus" aria-hidden="true" />

                  <span>Criar conta</span>
                </>
              )}
            </button>

            <div className="auth-footer">
              Já possui uma conta? <Link to="/login">Entrar</Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Register;
