using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Users.Commands.CreateUser
{
	public class CreateUserCommand : IRequest<User>
	{
		public string Name { get; set; }
		public string Email { get; set; }
	}
	public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, User>
	{
		private readonly IApplicationDbContext _context;

		public CreateUserCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<User> Handle(CreateUserCommand command, CancellationToken cancellationToken)
		{
			var user = new User
			{
				Name = command.Name,
				Email = command.Email,
				CreatedOn = DateTime.Now
			};
			_context.Users.Add(user);
			await _context.SaveChangesAsync(cancellationToken);
			return user;
		}
	}
}
