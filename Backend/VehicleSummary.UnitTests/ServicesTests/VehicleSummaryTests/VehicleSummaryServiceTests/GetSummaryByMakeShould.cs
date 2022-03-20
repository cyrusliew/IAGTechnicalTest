using System.Threading.Tasks;
using FluentAssertions;
using Flurl.Http.Testing;
using Newtonsoft.Json;
using VehicleSummary.Api.Services.VehicleSummary;
using Xunit;
using Xunit.Abstractions;

namespace VehicleSummary.UnitTests.ServicesTests.VehicleSummaryTests.VehicleSummaryServiceTests
{
    public class GetSummaryByMakeShould
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public GetSummaryByMakeShould(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }
        
        [Fact]
        public async Task Call_Http()
        {
            var make = "yo";
            var sut = new VehicleSummaryService();

            var modelResponse = new string[]
            {
                "First",
                "Second"
            };

            VehicleSummaryResponse response;

            using (var httpTest = new HttpTest())
            {
                httpTest.RespondWithJson(modelResponse);
                
                response = await sut.GetSummaryByMake(make);  
                
                
                //httpTest.ShouldHaveCalled()
            }
            
            response.Make.Should().Be(make);

            response.Models.Count.Should().Be(modelResponse.Length);







//            var a = JsonConvert.SerializeObject(response);
//            _testOutputHelper.WriteLine(a);


        }
    }
}