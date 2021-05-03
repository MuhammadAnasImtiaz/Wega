using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id);
        void Add (Vehicle vehicle);
        void Remove (Vehicle vehicle);
        Task<IEnumerable<Vehicle>> GetVehicles();
    }
}