using MediatR;
using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using FluentValidation;
using Application.Errors;
using System.Net;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid ActivityId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }

        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty().MaximumLength(255);
                RuleFor(x => x.Description).NotEmpty().MaximumLength(255);
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
            }
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
                var activity = await _datacontext.Activities.FindAsync(request.ActivityId);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found Activity" });
                }
                activity.Title = request.Title ?? activity.Title;
                activity.Description = request.Description ?? activity.Description;
                activity.Category = request.Category ?? activity.Category;
                activity.Date = request.Date ?? activity.Date;
                activity.City = request.City ?? activity.City;
                activity.Venue = request.Venue ?? activity.Venue;

                var success = await _datacontext.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");

            }


        }
    }
}