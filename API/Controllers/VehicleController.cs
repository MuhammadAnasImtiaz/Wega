using System;
using System.Linq;
using System.Threading.Tasks;
using API.Core;
using API.Data;
using API.Dtos;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class VehicleController : BaseController
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IUnitOfWork _uow;
        public VehicleController(AppDbContext appDbContext, IMapper mapper, IVehicleRepository vehicleRepository, IUnitOfWork uow)
        {
            _uow = uow;
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        [HttpPost("add-vehicle")]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleDto vehicleDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<SaveVehicleDto, Vehicle>(vehicleDto);

            _vehicleRepository.Add(vehicle);
            await _uow.Complete();

            vehicle = await _vehicleRepository.GetVehicle(vehicle.Id);

            var result = _mapper.Map<Vehicle, VehicleDto>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleDto vehicleDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _appDbContext.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

            _mapper.Map(vehicleDto, vehicle);

            _appDbContext.Entry(vehicle).State = EntityState.Modified;

             await _uow.Complete();

            vehicle = await _vehicleRepository.GetVehicle(vehicle.Id);

            var result = _mapper.Map<Vehicle, VehicleDto>(vehicle);

            return Ok(result);
        }

        //     [HttpPut("{id}")] 
        // public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleDto vehicleResource)
        // {
        //     if (!ModelState.IsValid)
        //       return BadRequest(ModelState);

        //     var vehicle = await _appDbContext.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);
        //     _mapper.Map<VehicleDto, Vehicle>(vehicleResource, vehicle);
        //     vehicle.LastUpdate = DateTime.Now;

        //     await _appDbContext.SaveChangesAsync();

        //     var result = _mapper.Map<Vehicle, VehicleDto>(vehicle);

        //     return Ok(result);
        // }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {

            var vehicle = await _vehicleRepository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            var vehicleResource = _mapper.Map<Vehicle, VehicleDto>(vehicle);

            return Ok(vehicleResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            _vehicleRepository.Remove(vehicle);
            await _uow.Complete();

            return Ok(id);
        }
    }
}