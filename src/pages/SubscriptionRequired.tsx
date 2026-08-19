import { Link } from 'react-router-dom';

function SubscriptionRequired() {
  return (
    <div className="container-fluid px-3 px-lg-4 py-4">
      <section className="panel blank-panel">
        <div className="blank-state">
          <span className="page-icon mb-3">
            <i className="bi bi-clock-history" aria-hidden="true" />
          </span>

          <p className="eyebrow mb-1">Período de avaliação encerrado</p>

          <h1 className="h3 mb-3">Escolha um plano para continuar</h1>

          <p className="text-muted mb-4">
            Seu período gratuito de 3 dias terminou. Assine um dos planos para
            continuar utilizando o sistema.
          </p>

          <Link to="/planos" className="btn btn-primary">
            <i className="bi bi-credit-card" aria-hidden="true" />
            Ver planos
          </Link>
        </div>
      </section>
    </div>
  );
}

export default SubscriptionRequired;
