using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UnAttend
    {

        public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                var activity = await _datacontext.Activities.FindAsync(request.Id);
                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Could not Find Activity" });
                }
                var user = await _datacontext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _datacontext.UserActivities
                                        .SingleOrDefaultAsync(x => x.ActivityId == activity.activityId && x.AppUserId == user.Id);


                if (attendance == null)
                {
                    return Unit.Value;
                }
                if (attendance.IsHost)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Attenddance = "Düzenliyici iken kendini çıkartamazsın" });

                }
                _datacontext.UserActivities.Remove(attendance);

                var success = await _datacontext.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");

            }


        }
    }
}