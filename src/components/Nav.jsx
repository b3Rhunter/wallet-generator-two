import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
          <Link to="/">Create Wallet</Link>
          <Link to="/decrypt">Decrypt Wallet</Link>
    </nav>
  );
}

export default Nav;
