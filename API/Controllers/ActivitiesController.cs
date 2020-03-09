using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using System;



namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken cancellationToken)
        {
            return await _mediator.Send(new List.Query(), cancellationToken);
        }

        [HttpGet("{activityId}")]
        public async Task<ActionResult<Activity>> Details(Guid activityId)
        {
            return await _mediator.Send(new Details.Query { ActivityId = activityId });
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> CreateActivity(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{activityId}")]
        public async Task<ActionResult<Unit>> EditActivity(Guid activityId, Edit.Command command)
        {

            command.ActivityId = activityId;
            return await _mediator.Send(command);
        }

        [HttpDelete("{activityId}")]
        public async Task<ActionResult<Unit>> DeleteActivity(Guid activityId)
        {
            return await _mediator.Send(new Delete.Command { ActivityId = activityId });
        }




    }
}