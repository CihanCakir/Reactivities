using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {

        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly Datacontext _datacontext;
            private readonly IMapper _mapper;

            public Handler(Datacontext datacontext, IMapper mapper)
            {
                this._mapper = mapper;
                this._datacontext = datacontext;
            }
            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _datacontext.Activities.FindAsync(request.ActivityId);
                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not Found" });

                }
                // Yada Kayıtlı olan tokendaki ismi buraya geçeriz 
                var user = await _datacontext.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    MyProperty = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comments.Add(comment);
                // Handler Logic
                var success = await _datacontext.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDto>(comment);

                throw new Exception("Problem saving changes");

            }


        }
    }
}