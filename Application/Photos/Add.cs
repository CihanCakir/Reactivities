using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {

        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }
        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly Datacontext _datacontext;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(Datacontext datacontext, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                this._photoAccessor = photoAccessor;
                this._userAccessor = userAccessor;
                this._datacontext = datacontext;
            }
            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                var user = await _datacontext.Users
                .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };



                if (!user.Photos.Any(x => x.IsMain))
                {
                    photo.IsMain = true;
                }

                user.Photos.Add(photo);
                // Handler Logic
                var success = await _datacontext.SaveChangesAsync() > 0;

                if (success) return photo;
                throw new Exception("Problem saving changes");

            }


        }
    }
}