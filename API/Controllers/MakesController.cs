using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MakesController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        public MakesController(AppDbContext appDbContext, IMapper mapper)
        {
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        [HttpGet("makes")]
        public async Task<ActionResult<IReadOnlyList<MakeDto>>> GetCarsAsync(){
            var cars = await _appDbContext.Makes.Include( x => x.Models).ToListAsync();

            return Ok(_mapper.Map<IReadOnlyList<Make>,IReadOnlyList<MakeDto>>(cars));
        }

        [HttpGet("features")]
        public async Task<ActionResult<IReadOnlyList<KeyValuePairDto>>> GetFeaturesAsync()
        {

            var features = await _appDbContext.Features.ToListAsync();

            return Ok(_mapper.Map<IReadOnlyList<Feature>,IReadOnlyList<KeyValuePairDto>>(features));


        }
    }
}