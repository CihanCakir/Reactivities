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

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid ActivityId { get; set; }

        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly Datacontext _dataContext;
            public Handler(Datacontext dataContext)
            {
                this._dataContext = dataContext;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.ActivityId);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found Activity" });
                }
                return activity;
            }



        }


    }
}