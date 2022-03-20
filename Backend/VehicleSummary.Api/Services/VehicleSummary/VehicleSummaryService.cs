using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;


namespace VehicleSummary.Api.Services.VehicleSummary

{
    public interface IVehicleSummaryService
    {
        Task<VehicleSummaryResponse> GetSummaryByMake(string make);
    }
    
    public class VehicleSummaryService : IVehicleSummaryService
    {
        public async Task<VehicleSummaryResponse> GetSummaryByMake(string make)
        {
            throw new NotImplementedException();
        }

        
        /*
         Here's a small helper. We're using Flurl for http requests. (Change it if you wish)
         https://flurl.dev/
            
        async Task<List<string>> getModels(string make)
        {   
            var modelsUrl = "https://api.iag.co.nz/vehicles/vehicletypes/makes/Lotus/models?api-version=v1";

            var response = await modelsUrl
                .WithHeader("Ocp-Apim-Subscription-Key", "72ec78fb999e43be8dbdac94d7236cae")
                .GetJsonAsync<List<string>>();
                
            return response;
              
        }
        */
        
        
    }
}