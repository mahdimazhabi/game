import { Link } from "react-router-dom"

const NavLink = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-log-0">
        <li className='nav-item'>
            <a className='nav-link active fw-semibold' href="#!">home</a>
        </li>
        <li className='nav-item'>
            <link to="/profile" className='nav-link active fw-semibold' href="#!">shop</>
        </li>
        <li className='nav-item'>
            <a className='nav-link active fw-semibold' href="#!">About</a>
        </li>
        <li className='nav-item'>
            <a className='nav-link active fw-semibold' href="#!">Contact</a>
        </li>

    </ul>
  )
}

export default NavLink