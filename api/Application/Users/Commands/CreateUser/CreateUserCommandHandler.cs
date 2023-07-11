using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Users.Commands.CreateUser
{
	public class CreateUserCommand : IRequest<UserDto>
	{
		public string Name { get; set; }
		public string Email { get; set; }
	}
	
	public class UserDto
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public bool AlreadyExists { get; set; }
	}

	public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, UserDto>
	{
		private readonly IApplicationDbContext _context;

		public CreateUserCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<UserDto> Handle(CreateUserCommand command, CancellationToken cancellationToken)
		{
			var existingUser = _context.Users.FirstOrDefault(x => x.Email == command.Email);
			if(existingUser != null)
			{
				return new UserDto
				{
					Name = existingUser.Name,
					Email = existingUser.Email,
					AlreadyExists = true
				};
			}
			
			var user = new User
			{
				Name = command.Name,
				Email = command.Email,
				CreatedOn = DateTime.Now
			};
			_context.Users.Add(user);
			await _context.SaveChangesAsync(cancellationToken);
			return new UserDto
			{
				Name = user.Name,
				Email = user.Email,
				AlreadyExists = false
			}; ;
		}
	}
}
