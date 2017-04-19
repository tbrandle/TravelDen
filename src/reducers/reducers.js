

export const currentUser = (state = {}, action) => {
  switch(action.type){
    case 'LOG_IN':
      return action.user;
    case 'LOG_OUT':
      return {};
    case 'UPDATE_USER':
      return Object.assign({}, state, action.newUser )
      // return [...state.wishlist, { wishlist:[action.wishlist] }];
    default:
      return state;
  }
}

export const itineraries = (state = [], action) => {
  switch(action.type){
    case 'ADD_ITINERARY':
      return [action.itinerary];
    case 'RETRIEVE':
      return [...state, action.itinerary];
    default:
      return state;
  }
}
