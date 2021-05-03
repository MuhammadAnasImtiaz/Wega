using System.Collections.Generic;
using System.Threading.Tasks;
using API.Core;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly AppDbContext _context;

        public VehicleRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Add(Vehicle vehicle)
        {
            _context.Add(vehicle);
        }

        public async Task<Vehicle> GetVehicle(int id){
            return await _context.Vehicles.Include(v => v.Model).ThenInclude(m => m.Make)
                .Include(v => v.Features).ThenInclude(vf => vf.Feature).SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles()
        {
            return await _context.Vehicles
        .Include(v => v.Model)
          .ThenInclude(m => m.Make)
        .Include(v => v.Features)
          .ThenInclude(vf => vf.Feature)
        .ToListAsync();
        }

        public void Remove(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
        }
    }
}