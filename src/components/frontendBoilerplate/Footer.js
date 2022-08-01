import React from "react";
import "../../styles/frontendBoilerplate/Footer.css"

const links = [
  {
    title: 'Support',
    link: ''
  },  
  {
    title: 'Docs',
    link: ''
  },  
  {
    title: 'Discord',
    link: ''
  },  
  {
    title: 'Contact',
    link: ''
  },  
]

function Footer() {
  return (
    <div className="Footer">
      <p className="FooterText">&copy; 2022 Tellor, Inc.</p>

      <nav className="FooterNav">
        {links.map((link, i) => 
          {
            return <a href={link.link} target="_blank" rel="noreferrer" key={`link-${link.title}-${i}`}>
              {link.title}
            </a>
          }
        )}
      </nav>
    </div>
  )
}

export default Footer