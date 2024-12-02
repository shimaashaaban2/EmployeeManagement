using HRSystem.Helpers;
using HRSystem.Models;
using HRSystem.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HRSystem.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;
        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View(_context.UserAccounts.ToList());
        }
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Register(RegisterViewModel model)
        {
            if(ModelState.IsValid)
            {
                UserAccount account = new UserAccount();
                account.FirstName = model.FirstName;
                account.LastName = model.LastName;
                account.Email = model.Email;
                account.UserName = model.UserName;
                account.Password = Encryption.Encrypt(model.Password);
                try
                {
                    _context.UserAccounts.Add(account);
                    _context.SaveChanges();
                    ModelState.Clear();
                }
                catch (DbUpdateException ex)
                {
                    ModelState.AddModelError("","Please enter unique Email or Password");
                    return View(model);
                }
                return RedirectToAction("Login");
              
            }
            return View(model);
        }
          public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
           public IActionResult Login(LoginViewModel model)
        {
            var user= _context.UserAccounts.Where(x=>(x.UserName == model.UserNameOrEmail ||x.Email== model.UserNameOrEmail) && Encryption.Decrypt(x.Password)== model.Password).FirstOrDefault();
            if(user !=null)
            {
                //
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.Email),
                    new Claim("Name",user.FirstName),
                    new Claim(ClaimTypes.Role,"User"),
                };
                var claimsIdentity = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);
                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,new ClaimsPrincipal(claimsIdentity));
                return RedirectToAction("Index","DashBoard");
            }
            else
            {
                ModelState.AddModelError("", "UserName/Email or Password is not correct");
            }
            return View(model);
        }
        public IActionResult LogOut()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login");
        }
        [Authorize]
        public IActionResult SecurePage()
        {
            ViewBag.Name = HttpContext.User.Identity.Name;
            return View();
        }

        //public async Task<IActionResult> DeleteEmployee(int Id)
        //{
        //    var employee = await _context.Employees.FindAsync(Id);
        //    if (employee == null)
        //    {
        //        return Json(new { success = false });
        //    }
        //    _context.Employees.Remove(employee);
        //    await _context.SaveChangesAsync();
        //    return Json(new { success = true });
        //}
    }
}
