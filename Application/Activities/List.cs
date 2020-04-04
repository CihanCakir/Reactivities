using MediatR;
using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using AutoMapper;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly Datacontext _context;
            private readonly ILogger _logger;
            private readonly IMapper _mapper;
            public Handler(Datacontext context, ILogger<List> logger, IMapper mapper)
            {
                this._mapper = mapper;
                this._logger = logger;
                this._context = context;
            }
            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {


                // // Eager Loading
                //        .Include(x => x.UserActivities)
                // .ThenInclude(x => x.AppUser)
                var activities = await _context.Activities
                 .Include(x => x.UserActivities)
                .ThenInclude(x => x.AppUser)
                .ToListAsync();

                var activityToReturn = _mapper.Map<List<Activity>, List<ActivityDto>>(activities);

                return activityToReturn;
            }



        }
    }
}