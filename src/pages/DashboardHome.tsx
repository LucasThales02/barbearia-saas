function DashboardHome() {
  return (
    <div className="container-fluid px-3 px-lg-4 py-4">
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon">
            <i className="bi bi-speedometer2" aria-hidden="true" />
          </span>

          <div>
            <p className="eyebrow mb-1">Visão geral</p>

            <h1 className="h3 mb-1">Dashboard</h1>

            <p className="text-muted mb-0">
              Acompanhe os principais dados da sua operação.
            </p>
          </div>
        </div>

        <div className="heading-actions">
          <button className="btn btn-outline-secondary btn-sm" type="button">
            <i className="bi bi-download" aria-hidden="true" />
            Exportar
          </button>

          <button className="btn btn-primary btn-sm" type="button">
            <i className="bi bi-file-earmark-plus" aria-hidden="true" />
            Criar relatório
          </button>
        </div>
      </div>

      <section className="row g-3 mt-1" aria-label="Indicadores do dashboard">
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-primary">
            <div className="metric-top">
              <span className="metric-label">Faturamento</span>

              <span className="metric-icon">
                <i className="bi bi-currency-dollar" aria-hidden="true" />
              </span>
            </div>

            <div className="metric-value">R$ 48.240</div>

            <div className="metric-meta">
              <span className="text-success">+12,5%</span>

              <span>em relação ao mês anterior</span>
            </div>
          </article>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-success">
            <div className="metric-top">
              <span className="metric-label">Pedidos</span>

              <span className="metric-icon">
                <i className="bi bi-bag-check" aria-hidden="true" />
              </span>
            </div>

            <div className="metric-value">1.284</div>

            <div className="metric-meta">
              <span className="text-success">+8,2%</span>

              <span>novos pedidos</span>
            </div>
          </article>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-warning">
            <div className="metric-top">
              <span className="metric-label">Clientes</span>

              <span className="metric-icon">
                <i className="bi bi-people" aria-hidden="true" />
              </span>
            </div>

            <div className="metric-value">8.742</div>

            <div className="metric-meta">
              <span className="text-success">+5,1%</span>

              <span>clientes ativos</span>
            </div>
          </article>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-danger">
            <div className="metric-top">
              <span className="metric-label">Chamados</span>

              <span className="metric-icon">
                <i className="bi bi-life-preserver" aria-hidden="true" />
              </span>
            </div>

            <div className="metric-value">36</div>

            <div className="metric-meta">
              <span className="text-danger">3 urgentes</span>

              <span>aguardando análise</span>
            </div>
          </article>
        </div>
      </section>

      <section className="row g-3 mt-1">
        <div className="col-12 col-xl-8">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2 className="h5 mb-1 section-title">
                  <i className="bi bi-graph-up-arrow" aria-hidden="true" />

                  <span>Desempenho de vendas</span>
                </h2>

                <p className="text-muted mb-0">
                  Faturamento mensal comparado com as metas.
                </p>
              </div>
            </div>

            <div className="chart-bars" aria-label="Gráfico de vendas">
              <div className="chart-column bar-42">
                <span />
                <small>Jan</small>
              </div>

              <div className="chart-column bar-58">
                <span />
                <small>Fev</small>
              </div>

              <div className="chart-column bar-51">
                <span />
                <small>Mar</small>
              </div>

              <div className="chart-column bar-72">
                <span />
                <small>Abr</small>
              </div>

              <div className="chart-column bar-66">
                <span />
                <small>Mai</small>
              </div>

              <div className="chart-column bar-83">
                <span />
                <small>Jun</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="panel h-100">
            <div className="panel-header">
              <div>
                <h2 className="h5 mb-1 section-title">
                  <i className="bi bi-activity" aria-hidden="true" />

                  <span>Atividades</span>
                </h2>

                <p className="text-muted mb-0">Atualizações recentes.</p>
              </div>
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-dot bg-primary" />

                <div>
                  <p className="mb-1 fw-semibold">Nova campanha publicada</p>

                  <p className="text-muted small mb-0">
                    A campanha mensal foi iniciada.
                  </p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot bg-success" />

                <div>
                  <p className="mb-1 fw-semibold">Pagamentos processados</p>

                  <p className="text-muted small mb-0">
                    246 pagamentos foram processados.
                  </p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot bg-warning" />

                <div>
                  <p className="mb-1 fw-semibold">Aumento nos chamados</p>

                  <p className="text-muted small mb-0">
                    O tempo médio de resposta é de 18 minutos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
