using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
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
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _datacontext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not Found" });
                }
                if (photo.IsMain)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Photo = "You Cannot delete Your main Photo" });

                }
                var result = _photoAccessor.DeletePhoto(photo.Id);
                if (result == null)
                {
                    throw new Exception("Problem Deleteing Photo");
                }

                user.Photos.Remove(photo);
                // Handler Logic
                var success = await _datacontext.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");

            }


        }
    }
}