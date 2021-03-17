import { Component } from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentYear: new Date().getFullYear()
      }
    }
  
    render() {
      return (
        <footer className={styles.footer}>
        
        <div className="text-center p-3">
          © { this.state.currentYear }
          <Link className={styles.footerLink} to="/"> Recipes 247</Link> 
        </div>
        
      </footer>
      );
    }
  }

export default Footer;