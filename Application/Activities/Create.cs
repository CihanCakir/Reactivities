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
    public class Create
    {
        public class Command : IRequest
        {
            public Guid ActivityId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly Datacontext _datacontext;

            public Handler(Datacontext datacontext)
            {
                this._datacontext = datacontext;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = new Activity
                {
                    ActivityId = request.ActivityId,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                _datacontext.Activities.Add(activity);
                var success = await _datacontext.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");

            }
        }
    }
}