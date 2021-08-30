import React from 'react';
import './footer.scss';

export default function Footer(): JSX.Element {
  return (
    <footer>
      <div className="footer-container card bg-light mb-3">
        <a className="github" href="https://github.com/halaveika">github</a>
        <a className="rss" href="https://rs.school/js/">
        <span className="rss-year">2021</span>
      </a>
      </div>
    </footer>
  );
}
