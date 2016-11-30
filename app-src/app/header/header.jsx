//libs and utilities
import React from 'react';
import { render } from 'react-dom';
import Time from '../shared/time';
import DateTime from '../shared/date';


//scss
import './header.scss';

class Header extends React.Component{
    render(){
        return(
            <HeaderComponent />
        )
    }
}


/* Header Componets */

class HeaderComponent extends React.Component{

	getTime() {
		// For the time now
		Date.prototype.timeNow = function () {
		     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
		}
		return new Date().today();
	}

	getDate() {
		Date.prototype.today = function () { 
		    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
		}

		return new Date().timeNow();
	}
    render(){
        return(
            <header>
				<div className="header">
					<div className="logo-and-icon">
						<div className="logo">
							<span className="logo-span">
								<img src="./img/bravo_logo.png" alt="" />
							</span>
						</div>
						<div className="icon">
							<span className="icon-span">
								<img src="./img/BIWings.png" alt="" />
							</span>
						</div>
					</div>
					<div className="date-and-time">
						<div className="date">
							<span>
								<DateTime name="CityDate" UTCOffset="6" />
							</span>
						</div>
						<div className="time">
							<span>
								<Time name="CityTime" UTCOffset="6" />
							</span>
						</div>
					</div>
				</div>
		</header>
        )
    }
}

module.exports = Header;
