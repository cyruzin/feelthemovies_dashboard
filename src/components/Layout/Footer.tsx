import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer__block block no-margin-bottom">
          <div className="container-fluid text-center">
            <p className="no-margin-bottom">
              {new Date().getFullYear()} &copy; Feel the Movies. Design by{' '}
              <a
                href="https://bootstrapious.com/p/bootstrap-4-dark-admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bootstrapious
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
