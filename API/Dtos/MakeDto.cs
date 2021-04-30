using System.Collections.Generic;


namespace API.Dtos
{
    public class MakeDto : KeyValuePairDto
    {
        
        public List<KeyValuePairDto> Models { get; set; } = new List<KeyValuePairDto>();
    }
}