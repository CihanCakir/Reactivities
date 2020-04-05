using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentDto>()
            .ForMember(d => d.Body, p => p.MapFrom(s => s.MyProperty))
            .ForMember(d => d.Username, p => p.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.DisplayName, p => p.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}