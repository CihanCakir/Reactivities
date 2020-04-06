using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class Add
    {

        public class Command : IRequest
        {
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly Datacontext _datacontext;
            private readonly IUserAccessor _userAccessor;

            public Handler(Datacontext datacontext, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._datacontext = datacontext;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var observer = await _datacontext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());


                var target = await _datacontext.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (target == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = " Not Found" });
                }

                //EagerLoading  var following = await datacontext. include theninclde diye

                // EAGER LOADİNG COMPLETE
                // var following = await _datacontext.Users
                //                                     .Include(x => x.Followers)
                //                                     .ThenInclude(x => x.ObserverId == observer.Id && x.TargetId == target.Id)
                //                                  .SingleOrDefaultAsync(x => x.UserName == request.Username);

                var following = await _datacontext.Followings.SingleOrDefaultAsync(x => x.ObserverId == observer.Id && x.TargetId == target.Id);



                if (following != null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "You are already following this user" });
                }

                if (following == null)
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };

                    _datacontext.Followings.Add(following);
                }
                // Handler Logic
                var success = await _datacontext.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");

            }
        }
    }
}