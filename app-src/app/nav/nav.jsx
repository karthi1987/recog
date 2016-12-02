import React from 'react';
import { render } from 'react-dom';
import Slider from 'react-slick';
import $ from 'jquery';
import Moment from 'moment';
import Striptags from 'striptags';

//scss
import './nav.scss';

class Nav extends React.Component{

	constructor( props ){
        super( props );

        this.state = {
        	giver : {
				avatar: null,
				name: null
        	},
        	receiver: {
        		eCardUrl: null,
				avatar: null,
				name: null,
				tagline: null,
				time: null,
				message: null
        	},
        	products: null
        }
    }

    componentWillReceiveProps(nextProps) {
    	let items = nextProps.products || [];
    	if ( items.length ) {
			this.updateStateAsWhenNeeded(items[0], items);
    	}
    }

    updateStateAsWhenNeeded(item, products) {
    	this.setState(
			{
				"giver": {
					"name" : item.giver.firstName+" "+item.giver.lastName,
					"avatar" : item.giver.avatarUrl
				},
				"receiver": {
					"eCardUrl": item.eCardUrl,
					"name": item.recievers[0].firstName+" "+item.recievers[0].lastName,
					"avatar": item.recievers[0].avatarUrl,
					"tagline": null,
					"time": item.recognitionDate,
					"message": item.comments
				},
				"products": products
			}
		);
    }

    updateLeftSlider(props, products) {
    	this.updateStateAsWhenNeeded(props, products);
    }

   render() {

   		let {giver, receiver, products} = this.state;

        return(

    		<div className="content">
				<div className="content-left">
				{
					this.state.products && this.state.products.length
					&&
					<div>
						<ReactLeftSlickDemo item={this.state.products} />
					</div>
				}
    			</div>
    			<div className="content-right">
    				<div className="recognized-items">
    				{
    					this.state.products && this.state.products.length
    					&&
				 	 	<ReactSlickDemo products={this.state.products} updateLeftSlider={this.updateLeftSlider.bind(this)}/>
    				}
				</div>
    			</div>
	    	</div>

        )
    }

}


/*
 *
 *   2. Right Slider
 *
 *   List view of the Recoginition
 *
 */
class RecognitionHeader extends React.Component{
	constructor( props ){
        super( props );
        this.state = {
	       "header" : {
	       		"image" : {
	       			"transform":  "translate3d(0, "+ ( 0 ) +"px,  0 )"
	       		}
	       }

        }
    }

    componentWillReceiveProps(nextState, nextProps) {
	   
    }

    render(){
    	let {avatar, name, tagline, time, eCardUrl} = this.props.item;
		let recImage =  "recognitionby-image ";
		let recTagline = "recognitionby-tagline";
		let recName = "recognitionby-username";
		let recTime = "time-standard";

        return(

			<div className="content-header">
			{
				this.props.item.firstName
				?
				<div>
					<div className={recImage}>
						<img src={this.props.item.avatarUrl} />
					</div>
					<div className="recognitionby-username-tagline">
						<p className={recName}>
							{this.props.item.firstName +" "+this.props.item.lastName}
						</p>
						<p className={recTagline}>
							{this.props.tagline.text}
						</p>
					</div>
					<div className="recognitionby-time" ref="time">
						<p className={recTime}> {Moment(this.props.dateSentBy).startOf('hour').fromNow()} </p>
					</div>
				</div>
				:
				<span>No Results</span>
			}
			</div>

        )
    }
}

/*
 *
 *   2. Right Slider
 *
 *   List view of the Recoginition
 *
 */
class RecognitionHeartContent extends React.Component{

	constructor( props ){
        super( props );

        this.state = {
        	avatar: props.avatar || null,
        	recogninized: {
				'transform': "translate3d(0, "+ ( 0 ) +"px,  0 )",
        	}
        }
    }

    componentWillReceiveProps(nextState, nextProps) {

		
    }

    render(){
    	let {comments, eCardUrl} = this.props.item;

        return(

			<div className="content-main">
				{
					this.props.item.comments
					?
					<div className="recognized-message-content">
					{
						this.props.item.eCardUrl
						&&
						<img src={this.props.item.eCardUrl} />
					}
					
					<p className="recogninized-text" >
						<span className="strip-tags-text">
							{
								Striptags(this.props.item.comments, '<a><strong>')
							}
						</span>
					</p>
					</div>
					:
					<span>No Results</span>
				}
				
			</div>

        )
    }
}


/*
 *
 *   2. Right Slider
 *
 *   List view of the Recoginition
 *
 */
class RecognitionFooter extends React.Component {
	constructor( props ){
        super( props );

        this.state = {
        	avatar: props.avatar || null,
        	giver: {
				'transform': "translate3d(0, "+ ( 0 ) +"px,  0 )",
        	}
        }
    }

    componentWillReceiveProps(nextState, nextProps) {

    }

    render(){
    	let {name, avatar} = this.props.item;
        return(

			<div className="content-footer">
				{
					this.props.item.firstName
					?
					<div className="recognized-by">
						<div className="recognized-sentby">
							<p> 
								<span className="sent-by">sent by</span>
								<span> {this.props.item.firstName +" "+this.props.item.lastName} </span>
							</p>
						</div>
						<div className="recognizedby-image">
							<img src={this.props.item.avatarUrl} />
						</div>
					</div>
					:
					null
				}
				
			</div>

        )
    }
}


/*
 *
 *   2. Right Slider
 *
 *   List view of the Recoginition
 *
 */
class RecoginitionList extends React.Component{
    render(){
    	let {comments, eCardUrl, giver, recievers, recognitionDate, promotionName, promotionType} = this.props.item;
        return(
			<li className="recognized-list" onSelect={this.props.updateSlides} onClick={this.props.updateSlides.bind(this, this.props.item)}>
				<a href="#" className="recognized-list-info" >
				     {
				         recievers && recievers.length 
				         && 
				         <RecoginitionName names={recievers} />
				     }
				</a>
			</li>
        )
    }
}

/*
 *
 *   3. Right Slider Recoginition Name
 *
 *   List view of the Recoginition
 *
 */
class RecoginitionName extends React.Component {
	modifyName(names){
		let modifiedNames = [];
		if (names.length) {
			names.map((name, i)=> {
				modifiedNames = [ ...modifiedNames, name.firstName +" "+ name.lastName ];
			})
			modifiedNames.join(", ");
		}
	return modifiedNames;
	}
	receiverImage() {
		if (this.props.names.length > 1) {
			return this.props.names.length;
		} else {
			return this.props.names[0].avatarUrl;
		}
	}
    render(){
    	let {names} = this.props;
        return(
        	<div>
	        	<span className="recognized-list-image">
	        	{
	        		names && names.length > 1
	        		?
	        		<span>{this.receiverImage()}</span>
	        		:
					<img src={this.receiverImage()} />
	        	}
				</span>
				<span className="recognized-list-message"> 
					{this.modifyName(names)}
				</span>
			</div>
        )
    }
}

/*
 *
 *   4. Right Slider Recoginition List
 *
 *   
 *
 */

class ReactSlickDemo extends React.Component{
	highlightActiveItem(currentSlide){
		$(".recognized-items .slick-track").find(".recognized-list").removeClass("selected");
		$(".recognized-items .slick-track .recognized-list").eq(currentSlide).addClass("selected");
	}
   render(){

	let {products, updateLeftSlider} = this.props;

	let self = this;
	let interval = "";

    const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		vertical: true,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 4400,
		rtl:false,
		initialSlide: 0,
		easing: 'easeOutBounce',
		className: 'recognition-feed-slides',
		beforeChange: function (currentSlide, nextSlide) {
			//self.highlightActiveItem(nextSlide);
		},
		afterChange: function (currentSlide) {
			//self.highlightActiveItem(currentSlide);
			updateLeftSlider(products[currentSlide], products);
		}
    };

      return (
      	<div style={
      		{
				"margin": "0 auto",
				"padding": "0",
				"height": "850px",
				"overflow": "hidden",
				"perspective": "1000px"
			}
		}>
		<ul>
		{
			products && products.length > 0
			?
			 <Slider {...settings}>
	         { 
	         	products.map(
     				     ( item, index ) =>
     			          <li className="recognized-list" data-index={index} key={index}>
     			          	<a href="#" className="recognized-list-info" >
     						     {
     						         item.recievers && item.recievers.length 
     						         && 
     						         <RecoginitionName names={item.recievers} />
     						     }
     						</a>
     			          </li>
     					)
	         }
			</Slider>
			:
			null
		}
		</ul>
        </div>
    )
   }
 }

 /*
 *	5. Left Side Parallex component
 *
 *
 */

class ReactLeftSlickDemo extends React.Component{
   render(){

	let {products} = this.props.item;

	let self = this;
	let interval = "";

    const settings = {
    	arrows: true,
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 4800,
		rtl:false,
		initialSlide: 0,
		easing: 'easeOutBounce',
		className: 'recognition-inner-slides',
		adaptiveHeight: true,
		beforeChange: function (currentSlide, nextSlide) {
			//self.highlightActiveItem(nextSlide);
		},
		afterChange: function (currentSlide) {
			//self.highlightActiveItem(currentSlide);
			//updateLeftSlider(products[currentSlide], products);
		}
    };

      return (
      	<div style={
      		{
				"margin": "0 auto",
				"padding": "0",
				"height": "850px",
				"overflow": "hidden",
				"perspective": "1000px"
			}
		}>
		<ul>
		{
			this.props.item && this.props.item.length > 0
			?
			 <Slider {...settings}>
	         { 
	         	this.props.item.map(
     				     ( item, index ) =>
	     				    <div data-index={index} key={index}>
								<RecognitionHeader item={item.recievers[0]} dateSentBy={item.recognitionDate} tagline={item.behavior[0]} default={false} />
								<RecognitionHeartContent item={item} />
								<RecognitionFooter item={item.giver} />
							</div>
     					)
	         }
			</Slider>
			:
			null
		}
		</ul>
        </div>
    )
   }
 }




export default Nav;
