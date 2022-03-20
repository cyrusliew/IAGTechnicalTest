using System.Collections.Generic;

namespace VehicleSummary.Api.Services.VehicleSummary
{
    public class VehicleSummaryResponse
    {
        public string Make { get; set; }
        public List<VehicleSummaryModels> Models { get; set; }
    }

    public class VehicleSummaryModels
    {
        public string Name { get; set; }
        public int YearsAvailable { get; set;  }
    }
}