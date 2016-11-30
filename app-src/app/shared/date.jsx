import React from 'react';
import { render } from 'react-dom';
//scss
import './time.scss';


class DateToday extends React.Component{

  constructor( props ){

        super( props );
        this.state = { 
          date: null,
          month: null
        }
  }

  componentWillMount(){
    this.setDate();
  }

  componentDidMount(){
     window.setTimeout(function () {
      this.setDate();
    }.bind(this), 100);
  }

  setDate(){

    let currentdate = new Date();
    let date = currentdate.getDate();
    let month = null;
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    month = monthNames[currentdate.getMonth()];

      //Set State to the modified time
      this.setState({
        date: date,
        month: month
      });

  }

   render() {

      let {date, month} = this.state;

        return(
          <div className="local-time" ref="watchMyDate">
            <span className="city-month">{month}</span>
            <span className="city-hours">{date}</span>
          </div>
        )
  }

}


export default DateToday;
