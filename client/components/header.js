import React from "react";
import Link from "next/link";

const Header = ({ currentUser }) => {
   //mostrar contendio condicionalmente
   const links = [
      !currentUser && { label: "Registrarse", href: "/auth/signup" },
      !currentUser && { label: "Iniciar Sesion", href: "/auth/signin" },
      currentUser && { label: "Salir", href: "/auth/signout" },
   ]
      .filter((linkConfig) => linkConfig)
      .map(({ label, href }) => {
         return (
            <li key={href} className="nav-item">
               <Link href={href}>
                  <a className="nav-link">{label}</a>
               </Link>
            </li>
         );
      });

   return (
      <nav className="navabr navbar-light bg-light">
         <Link href="/">
            <a className="navbar-brand">Microservicios</a>
         </Link>
         <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">{links}</ul>
         </div>
      </nav>
   );
};

export default Header;
