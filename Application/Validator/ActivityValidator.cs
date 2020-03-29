using FluentValidation;
using static Application.Activities.Create;


namespace Application.Validator
{
    public class ActivityValidator : AbstractValidator<Command>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(255);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(255);
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
        }
    }
}