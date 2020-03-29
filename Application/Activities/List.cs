using MediatR;
using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly Datacontext _context;
            private readonly ILogger _logger;
            public Handler(Datacontext context, ILogger<List> logger)
            {
                this._logger = logger;
                this._context = context;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {



                var activities = await _context.Activities.ToListAsync();

                // try
                // {
                //     // sistem Yoğunluğuna göre taskde cevap verme süresi eklettir yada rabbitmq/ Kafkayı burada kullan
                //     for (var i = 0; i < 10; i++)
                //     {
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000, cancellationToken);
                //         _logger.LogInformation($"Task {i} Has Completed");
                //     }
                // }
                // catch (Exception exception) when (exception is TaskCanceledException)
                // {
                //     _logger.LogInformation("Task was cancelled");
                // }

                // var activities = await _context.Activities.ToListAsync(cancellationToken);

                return activities;
            }



        }
    }
}