import React from 'react'
import { Link } from 'react-router-dom'
import { ImSearch } from 'react-icons/im' 

const Header = () => {
  return (
    <nav className='header'>
        <img id="home"src="https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/8f/80/18/8f801836-5772-212d-970e-34703cc29fad/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg" alt="" srcset="" />
        <div>
            <Link to="/">Home</Link>
            <Link to="/tvshows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link>My List</Link>
        </div>
       <Link to="/find"><ImSearch /> </Link>
    </nav>
  )
}

export default Header