import React, { Component } from 'react';
import GoogleInitialMap from '../GoogleMap/GoogleInitialMap';
import './SingleItinerary.css';


export default class SingleItinerary extends Component {

  renderDestinations(destinations){
    return destinations.map((obj, i) => {
      return (
        <div className="single-destination" key={i}>
          <p className="place">{obj.place}</p>
          <p>{obj.placeDescription}</p>
        </div>
      )
    })
  }


 handleClick(id){
   debugger

    const newWishList = this.props.currentUser.wishlist ? [...this.props.currentUser.wishlist, id] : [id]
    const newUser = Object.assign({}, this.props.currentUser, {wishlist:newWishList})
    console.log(newUser);
    this.props.addToWishList(newUser)
    // database.ref('users').update()
    // need to add id to wishlist array in currentUser
    //createreduce
    // update currentUser object in firebase
  }


  render(){
    const { match, itineraries, addToWishList } = this.props
    const id = parseInt(match.params.id)
    const itinerary = itineraries.find(obj => obj.id === id)
    const { destinations } = itinerary

     return (
      <div>
        <div className='single-map-container'>
          <GoogleInitialMap containerElement={ <div style={{ height: "100%"}}/> }
            mapElement={ <div style={{ height: "100%"}}/> }
            destinations={destinations}
            />
        </div>
        <div className="title-card">
          <p className='itinerary-title'>{itinerary.title}</p>
          <p className='itinerary-description'>{itinerary.description}</p>
        </div>
        <button className="btn" onClick={() => this.handleClick(id) }>add to wish list</button>
        <div className="render-destination-wrapper">
          { this.renderDestinations(itinerary.destinations) }
        </div>
      </div>
    )
  }
}
