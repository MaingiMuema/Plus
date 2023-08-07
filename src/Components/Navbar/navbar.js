import './navbar.css';

//Images
import Logo from "../../Assets/Plus Agency logo.png";

const Navbar = () => {
  return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="/"><img src={Logo} className="img-fluid"/></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-bs-controls="navbarNavDropdown" aria-bs-expanded="false" aria-bs-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div class="nav-links d-flex justify-content-center">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Blog</a>
                            </li>
                        </ul>
                        <button className="navbar-text my-2 my-lg-0 navbar-btn theme-btn"><span>Get In Touch</span></button>
                    </div>
                </div>
            </nav>
        </div>
  );
}

export default Navbar;