using Microsoft.AspNetCore.Mvc;

namespace HRSystem.Controllers
{
    public class DashBoardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
         public IActionResult Attendence()
        {
            return View();
        }

    }
}
