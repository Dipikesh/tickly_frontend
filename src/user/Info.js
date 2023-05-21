import React from "react";
import logo from "../core/res/logo.png";
import heroImage from "../core/res/hero.png";
import './Info.css';
import Menu from '../core/Menu';
import { Link, withRouter } from 'react-router-dom'

const Info = () => {
  return (
    <>
      <Menu />
     <div className="container">
      <header>
        <h1>Shorten your URLs</h1>
      </header>
      <main>
        <img src={heroImage} alt="Hero" />
        <h2>Introducing the fastest URL shortener</h2>
        <p>
          Are you tired of long and complicated URLs? Our app can help you
          shorten any URL into a simple and easy-to-remember link and many tools to help you track your users.
        </p>
        <Link to="/">
        <button>Get started now</button>
                           
         </Link>
      </main>
      <footer>
        <p>Copyright © 2023</p>
      </footer>
    </div>
    </>
  );
};

export default Info;