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
    public class SetMain
    {

        public class Command : IRequest
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly Datacontext _datacontext;
            private readonly IUserAccessor _userAccessor;

            public Handler(Datacontext datacontext, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                this._userAccessor = userAccessor;
                this._datacontext = datacontext;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _datacontext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Photo Not Found" });
                }
                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

                currentMain.IsMain = false;
                photo.IsMain = true;
                // Handler Logic
                var success = await _datacontext.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }

        }
    }
}