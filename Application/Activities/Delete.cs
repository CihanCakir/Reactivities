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
    public class Delete
    {

        public class Command : IRequest
        {
            public Guid ActivityId { get; set; }

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
                    throw new Exception("Could not found activities");

                _datacontext.Remove(activity);

                // Handler Logic
                var success = await _datacontext.SaveChangesAsync() > 0;


                if (success) return Unit.Value;
                throw new Exception("Problem Delete Activity");

            }
        }
    }
}