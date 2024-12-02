using HRSystem.DTO;
using HRSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;

namespace HRSystem.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private ICompositeViewEngine _viewEngine;
        public EmployeesController(ApplicationDbContext context, ICompositeViewEngine viewEngine)
        {
            _context = context;
            _viewEngine = viewEngine;
        }
        public IActionResult Index()
        {
            List <Employee> employees = _context.Employees.ToList();
            return View(employees);
           // return Json(new{msg="success",view=RenderRazorViewToString("Employees/_Employeelist",employees) });
        }
        [HttpGet]
        //public async Task<IActionResult> GetAll()
        //{
        //    try
        //    {
        //        var employees = await _context.Employees.ToListAsync();

        //        if (employees != null)
        //        {
        //            return Json(new { success = true, view = RenderRazorViewToString("Employees/_Employeelist", employees) });
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(ex);
        //    }

        //    return Json(new { success = false });

        //    return PartialView("_Employeelist", employees);
        //}
        public IActionResult All()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> GetById(int Id)
        {
            var employee = await _context.Employees.FindAsync(Id);
            if (employee != null)
            {
                return Json(new { data = employee });
            }
            return Json(new { success = false });
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee(AddEmployeeDTO addemployee)
        {
            //if (ModelState.IsValid)
            //{
            var emp = new Employee();
            emp.name = addemployee.name;
            emp.position = addemployee.position;
            emp.Department=addemployee.Department;
            emp.Age=addemployee.Age;
            emp.Dept_no = addemployee.Dept_no;
            emp.salary = addemployee.salary;
            emp.UrlImage= addemployee.UrlImage;
            _context.Add(emp);
                await _context.SaveChangesAsync();
               return RedirectToAction("Index",emp);
          // return Json(new {view= RenderRazorViewToString ("_AddEmployee",emp)});
            //}
            //return View();
        }
        [HttpGet]
        public async Task<IActionResult> UpdateEmployee(int id)
        {
            var empId = await _context.Employees.FindAsync(id);

            return PartialView("Employees/_EditEmployee",empId);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateEmployee(EditEmployeeDTO editemployee)
        {
            var empId = await _context.Employees.FindAsync(editemployee.Id);
            ViewBag.id = empId;
            //if (emp == null)
            //{
            //    return Json(new { success = false });
            //}
            //if (ModelState.IsValid)
            //{
            var emp = new Employee();
            emp.name = editemployee.name;
                emp.Age = editemployee.Age;
                emp.position = editemployee.position;
                emp.Department = editemployee.Department;
                emp.salary = editemployee.salary;
                // _context.Update(emp);
                await _context.SaveChangesAsync();
            //return Json(new { success = true });
            return RedirectToAction("Index", emp);
            //}
            //return Json(new { success = false });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteEmployee(int Id)
        {
            var employee = await _context.Employees.FindAsync(Id);
            if (employee == null)
            {
                return Json(new { success = false });
            }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }
        public IActionResult Create()
        {
            return View();
        }
        private string RenderRazorViewToString(string viewName, object model = null)
        {
            if (string.IsNullOrEmpty(viewName))
                viewName = ControllerContext.ActionDescriptor.ActionName;

            ViewData.Model = model;

            using (var writer = new StringWriter())
            {
                ViewEngineResult viewResult =
                    _viewEngine.FindView(ControllerContext, viewName, false);

                ViewContext viewContext = new ViewContext(
                    ControllerContext,
                    viewResult.View,
                    ViewData,
                    TempData,
                    writer,
                    new HtmlHelperOptions()
                );

                viewResult.View.RenderAsync(viewContext);

                return writer.GetStringBuilder().ToString();
            }
        }
    }
}
