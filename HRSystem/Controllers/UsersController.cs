using Microsoft.AspNetCore.Mvc;

namespace HRSystem.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
