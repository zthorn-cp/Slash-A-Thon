using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace slash_a_thon.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
