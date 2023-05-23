using Application.Users.Commands.CreateUser;
using Application.Users.Queries.CheckUserExists;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoldenIslandGang.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly IMediator _mediator;

		public UsersController(IMediator mediator)
		{
			_mediator = mediator;
		}

		[HttpPost("register")]
		public async Task<ActionResult<User>> CreateUser(CreateUserCommand command)
		{
			var user = await _mediator.Send(command);
			return Ok(user);
		}
	}
}
