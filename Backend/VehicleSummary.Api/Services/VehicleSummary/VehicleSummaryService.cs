using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Diagnostics;
using Flurl;
using Flurl.Http;
using System.Linq;


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
            Debug.WriteLine("=== HUHU ===");
            var models = await getModels(make);

            var tasks = models.Select(model => getSummary(make, model));
            var results = await Task.WhenAll(tasks);
            
            return new VehicleSummaryResponse {
                Make = make,
                Models = results.ToList()
            };
        }
        
        //  Here's a small helper. We're using Flurl for http requests. (Change it if you wish)
        //  https://flurl.dev/
            
        private async Task<List<string>> getModels(string make)
        {   
            var modelsUrl = $"https://api.iag.co.nz/vehicles/vehicletypes/makes/{make}/models?api-version=v1";

            var response = await modelsUrl
                .WithHeader("Ocp-Apim-Subscription-Key", "72ec78fb999e43be8dbdac94d7236cae")
                .GetJsonAsync<List<string>>();
                
            return response;
        }

        private async Task<VehicleSummaryModels> getSummary(string make, string model)
        {
            var yearsUrl = $"https://api.iag.co.nz/vehicles/vehicletypes/makes/{make}/models/{model}/years?api-version=v1";
            
            try {
                var response = await yearsUrl
                    .WithHeader("Ocp-Apim-Subscription-Key", "72ec78fb999e43be8dbdac94d7236cae")
                    .GetJsonAsync<List<int>>();

                return new VehicleSummaryModels {
                    Name = model,
                    YearsAvailable = response.Count,
                };
            } catch (FlurlHttpException ex) {
                Debug.WriteLine(ex);
                throw new NotSupportedException();
            }
        }
        
        
    }
}