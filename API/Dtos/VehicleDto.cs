using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Dtos
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public KeyValuePairDto Make { get; set; }
        public KeyValuePairDto Model { get; set; }
        public bool IsRegistered { get; set; }
        public ICollection<KeyValuePairDto> Features { get; set; } = new Collection<KeyValuePairDto>();

        public ContactDto Contact { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}