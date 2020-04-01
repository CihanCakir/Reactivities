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
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken cancellationToken)
        {
            return await Mediator.Send(new List.Query(), cancellationToken);
        }

        [HttpGet("{activityId}")]
        [Authorize]
        public async Task<ActionResult<Activity>> Details(Guid activityId)
        {
            return await Mediator.Send(new Details.Query { ActivityId = activityId });
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> CreateActivity(Create.Command command)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return await Mediator.Send(command);
        }

        [HttpPut("{activityId}")]
        public async Task<ActionResult<Unit>> EditActivity(Guid activityId, Edit.Command command)
        {

            command.ActivityId = activityId;
            return await Mediator.Send(command);
        }

        [HttpDelete("{activityId}")]
        public async Task<ActionResult<Unit>> DeleteActivity(Guid activityId)
        {
            return await Mediator.Send(new Delete.Command { ActivityId = activityId });
        }




    }
}