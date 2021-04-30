using System.Linq;
using API.Dtos;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //Domain To API Resource
            CreateMap<MakeDto,Make>().ReverseMap();
            CreateMap<Make,KeyValuePairDto>();
            CreateMap<KeyValuePairDto,Model>().ReverseMap();
            CreateMap<KeyValuePairDto,Feature>().ReverseMap();
            CreateMap<Vehicle,SaveVehicleDto>()
             .ForMember(vr => vr.Contact , opt => opt.MapFrom(v => new ContactDto { Name = v.ContactName , Email = v.ContactEmail, Phone = v.ContactPhone}))
             .ForMember(vr => vr.Features , opt =>opt.MapFrom(v => v.Features.Select( vf => vf.FeatureId)));
             CreateMap<Vehicle,VehicleDto>()
              .ForMember(vr => vr.Contact, opt => opt.MapFrom( v => new ContactDto { Name = v.ContactName , Email = v.ContactEmail, Phone = v.ContactPhone}))
              .ForMember(vr => vr.Features , opt => opt.MapFrom (vf => vf.Features.Select( vf => new KeyValuePairDto { Id = vf.Feature.Id ,Name =vf.Feature.Name})))
              .ForMember(vr => vr.Make , opt => opt.MapFrom(m => m.Model.Make));

            //API Resource to Domain
            CreateMap<SaveVehicleDto,Vehicle>()
             .ForMember(v => v.ContactName , opt => opt.MapFrom(vr => vr.Contact.Name))
             .ForMember(v => v.ContactEmail , opt => opt.MapFrom(vr => vr.Contact.Email))
             .ForMember(v => v.ContactPhone , opt => opt.MapFrom(vr => vr.Contact.Phone))
             .ForMember(v => v.Features , opt => opt.MapFrom(vr => vr.Features.Select( id => new VehicleFeature {FeatureId = id})));
            
        }
    }
}