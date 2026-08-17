function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <div className="container-fluid px-3 px-lg-4">
        <span>© {currentYear} Meu App.</span>

        <span>Painel administrativo</span>
      </div>
    </footer>
  );
}

export default Footer;
