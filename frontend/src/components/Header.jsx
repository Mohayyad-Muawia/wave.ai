import { useEffect, useState } from "react"
import ParticlesComponent from './ParticlesComponent'
import { Link } from "react-router-dom"

const Header = () => {

    const [theme, setTheme] = useState('dark')
    
    useEffect(() => {
        // menu
        const menuIcon = document.querySelector('.menuIcon')
        const menu = document.querySelector('.menu ul')

        const openMenu = () => {
            menuIcon.classList.toggle('active')
            menu.classList.toggle('opened')
        }
    
        const closeMenu = () => {
            menuIcon.classList.remove('active')
            menu.classList.remove('opened')
        }
    
        menuIcon.addEventListener('click', openMenu)
        document.addEventListener('click', (e) => {
            if(!e.target.classList.contains('menuItem')) {
                closeMenu()
            }
        })

        // change theme
        const inputElmt = document.querySelector(".input");

        
        inputElmt.checked = JSON.parse(localStorage.getItem("mode"));
        updateBackground();
        
        inputElmt.addEventListener("input", () => {
          updateBackground();
          updateLocale();
        })
        
        function updateBackground(){
          if(inputElmt.checked){
            // dark theme on
            document.documentElement.style.setProperty('--theme', '#22272b')
            document.documentElement.style.setProperty('--txt', '#fff')
            document.documentElement.style.setProperty('--shadow', '0 4px 8px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2)')            
            setTheme('dark')
        }
        else {
            // light theme on 
            document.documentElement.style.setProperty('--theme', '#F5F5F5')
            document.documentElement.style.setProperty('--txt', '#22272b')
            document.documentElement.style.setProperty('--shadow', '0 4px 6px rgba(0, 0, 0, 0.1),  0 1px 3px rgba(0, 0, 0, 0.1)')            
            setTheme('light')
 
        }
        }
        
        
        function updateLocale() {
          localStorage.setItem("mode", JSON.stringify(inputElmt.checked))
        }

        
    }, [])
    
    const clear = () => {
        window.localStorage.removeItem('chat')
        document.querySelector('.chat-box').innerHTML = ''
    }


    return ( 
        <>
        <ParticlesComponent id='particles' theme={theme} style={{transition: .2}}/>

        <header>
            <Link to='/' className="logo">
                <img src="/logo.png" alt="" />
                <h1>wave</h1>
            </Link>
            <div className="menu menuItem">
                <i className="fa-solid fa-ellipsis-vertical menuItem menuIcon"></i>
                <ul>
                    <li className="menuItem themeBtn">
                        {/* Dark mode */}
                        <input className="input menuItem" defaultChecked type="checkbox" name="darkmode" id="dark-mode"/>
                        <label htmlFor="dark-mode" className="label menuItem">
                        <span className="text menuItem">Dark mode</span>
                        <span className="circle menuItem"></span>
                        </label>
                    </li>
                    <li onClick={clear}>Clear the chat <i className="fa-solid fa-trash-can"></i></li>
                    <li className="menuItem"><Link to='/about'>About the bot</Link><i className="fa-solid fa-circle-exclamation menuItem" ></i> </li> 
                </ul>
            </div>
        </header>
        </>
     );
}
 
export default Header;