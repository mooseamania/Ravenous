const clientID 	= 'cGthPeaoyr7TV9vlZZeYZQ';
const secret 	= 'vGeIQJau6pEaaV3B3820rQAkD4ga7rvow9aveDxUSwR0Ejw9cMOz2EOjZQwCDiZSBuz_KjOA_-o7V4IAgnaVh_i1IMbQLwWRfTNy4KT3wYWz6yl8nBNnkTSFou0qWnYx';
let accessToken ;

let Yelp = {
  getAccessToken(){
    if(accessToken){
      return new Promise(resolve => resolve(accessToken));
  }


  return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=
    ${clientID}&client_secret=${secret}`, this.method:'POST').then(response => {return response.json();}).then(jsonResponse =>
       {accessToken = jsonResponse.access_token;})
     },

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {headers:{Authorization: `Bearer ${accessToken}`}}).then(response => {return response.json();}).then(jsonResponse =>
                {if(jsonResponse.businesses){
                  return jsonResponse.businesses.map(business=>({
                    id:business.id,
                    name:business.name,
                    category:business.categories,
                    rating: business.rating,
                    review: business.review_count,
                    image: business.image_url,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zip: business.location.zip_code

                  }));
                  }


    });

  })
  }
};

export default Yelp;