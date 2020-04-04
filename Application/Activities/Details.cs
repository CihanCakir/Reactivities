using MediatR;
using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using Application.Errors;
using System.Net;
using AutoMapper;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid ActivityId { get; set; }

        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly Datacontext _dataContext;
            private readonly IMapper _mapper;
            public Handler(Datacontext dataContext, IMapper mapper)
            {
                this._mapper = mapper;
                this._dataContext = dataContext;
            }
            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                // To Eager Loading
                //    .Include(x => x.UserActivities)
                // .ThenInclude(x => x.AppUser)
                // .SingleOrDefaultAsync(x => x.ActivityId == request.ActivityId);
                var activity = await _dataContext.Activities
                                        .Include(x => x.UserActivities)
                                        .ThenInclude(x => x.AppUser)
                                        .SingleOrDefaultAsync(x => x.activityId == request.ActivityId);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found Activity" });
                }

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return activityToReturn;
            }



        }


    }
}