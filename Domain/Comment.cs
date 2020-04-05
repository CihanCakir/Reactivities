using System;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }

        // Body Olacak ve commente comment edileblir olacak mp ozamana kadat Mappingle geçeriz
        public string MyProperty { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Activity Activity { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}