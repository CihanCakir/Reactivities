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
using System.Linq;

namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelope
        {
            //  sayfada aşağıya indikçe listelemek için  client side daki değişiklik
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }
        public class Query : IRequest<ActivitiesEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                this.Limit = limit;
                this.Offset = offset;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
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
            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var quearable = _context.Activities.AsQueryable();


                // // Eager Loading
                //        .Include(x => x.UserActivities)
                // .ThenInclude(x => x.AppUser)
                var activities = await quearable
                .Include(x => x.UserActivities)
                .ThenInclude(x => x.AppUser)
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3)
                .ToListAsync();

                var activityToReturn = _mapper.Map<List<Activity>, List<ActivityDto>>(activities);

                return new ActivitiesEnvelope
                {
                    Activities = activityToReturn,
                    ActivityCount = quearable.Count()
                };
            }

        }
    }
}