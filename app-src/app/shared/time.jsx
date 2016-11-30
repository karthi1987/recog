import React from 'react';
import { render } from 'react-dom';
//scss
import './time.scss';


class Time extends React.Component{

  constructor( props ){

        super( props );
        this.state = { 
          hours: null,
          minutes: null,
          seconds: null
        }
  }

  componentWillMount(){
    this.setTime();
  }

  componentDidMount(){
     window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  }

  setTime(){
  
    let currentdate = new Date();
    let hours = currentdate.getUTCHours() + parseInt(this.props.UTCOffset); 
    let seconds = null;   

      // correct for number over 24, and negatives
      if( hours >= 24 ){ hours -= 24; }
      if( hours < 0   ){ hours += 12; }

      // add leading zero, first convert hours to string
      hours = hours + "";
      if( hours.length == 1 ){ hours = "0" + hours; }

      // minutes are the same on every time zone
      let minutes = currentdate.getUTCMinutes();
    
      // add leading zero, first convert hours to string
      minutes = minutes + "";
      if( minutes.length == 1 ){ minutes = "0" + minutes; }

      seconds = currentdate.getUTCSeconds();

      //Set State to the modified time
      this.setState({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
  }

   render() {

      let {hours, minutes, seconds} = this.state;

        return(
          <div className="local-time" ref="watchMe">
            <span className="city-hours">{hours}</span>
            <span className="divider">:</span>
            <span className="city-hours">{minutes}</span>
            <span className="divider">:</span>
            <span className="city-hours">{seconds}</span>
          </div>
        )
  }

}


export default Time;
