# IAG NZ Digital Interview

We are doing a review of our Vehicle API's data integrity. There have been reports from customers stating they can't
find their vehicle model and year when using our API. This is causing us to lose potential customers. 

An analyst team has been deployed to determine the quality of this data and build systems to ensure we can get real-time 
oversight into the state of our vehicle database. 

An IAG analyst would like to have an API which returns summary data of our Vehicle API. 

The first feature will be to build an endpoint that accepts a Manufacturer and returns a list of models and a count of 
the number of years that this model is present in our Vehicle API.


Feature:

    As an internal user, I want to know how many years are on record for each Vehicle Model for a given Manufacturer

    The endpoint route should be:
    
      /vehicle-checks/makes/{Make}
    
    

Output:
{
  make: "Lotus"
  models: [
    {
      name: "Exige",
      yearsAvailable: 5
    },
    ...
  ]
} 
    

AC1:
    I want to pass in a Manufacturer ID "Lotus" and get back a single json object that matches the output defined above

    
Technical References:

    The vehicle API is available via our API site. These APIs returns a json object. 

    For the purposes of this test, only use the "Lotus" make. 
    
    GET Models by Make
        
        https://api.iag.co.nz/vehicles/vehicletypes/makes/Lotus/models?api-version=v1
    
    GET Years of Models by Make
        
        https://api.iag.co.nz/vehicles/vehicletypes/makes/Lotus/models/Esprit/years?api-version=v1
    
    
    Each API call requires the following request header:
        
        Ocp-Apim-Subscription-Key: 72ec78fb999e43be8dbdac94d7236cae
 


Task:
    Build the endpoint as defined in the feature.    
    This part of the test is to build a backend API only.
    
    We have provided a basic skeleton solution that is in an incomplete state.
    Feel free to refactor parts if you think it's a good idea. 
    And add any libraries that you are comfortable with. 
    
    The second part of the test will be an in-person interview where we sit down to discuss what you've built and then 
    work on creating a simple front-end  


Notes:
  We like SOLID and lots of tests. We're after someone that can preach the ways of clean code and help teach the wider teams. 
  

  
