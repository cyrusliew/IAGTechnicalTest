using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using VehicleSummary.Api.Controllers;
using VehicleSummary.Api.Services.VehicleSummary;
using Xunit;

namespace VehicleSummary.UnitTests.ControllersTests.VehicleChecksControllerTests
{
    public class GetShould
    {
        private readonly VehicleChecksController _sut;
        private readonly IVehicleSummaryService _fakeVehicleSummaryService;

        public GetShould()
        {
            _fakeVehicleSummaryService = A.Fake<IVehicleSummaryService>();
            _sut = new VehicleChecksController(_fakeVehicleSummaryService);
        }
        

        [Fact]
        public async Task Call_VehicleSummaryService_with_given_make()
        {
            var make = "First";


            A.CallTo(() => _fakeVehicleSummaryService.GetSummaryByMake(make))
                .Returns(new VehicleSummaryResponse());
            

            var response = await _sut.Makes(make);


            A.CallTo(() => _fakeVehicleSummaryService.GetSummaryByMake(make))
                .MustHaveHappened();





        }
    }
}