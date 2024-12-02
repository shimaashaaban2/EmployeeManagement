using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace HRSystem.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "User name or Email is required")]
        [MaxLength(50, ErrorMessage = "Max 50 characters allowed.")]
        [DisplayName("User Name or Email")]
        public string UserNameOrEmail { get; set; }

        [Required(ErrorMessage = "Password is required")]
        // [MaxLength(20, ErrorMessage = "Max 20 characters allowed.")]
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Max 20 characters allowed.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
