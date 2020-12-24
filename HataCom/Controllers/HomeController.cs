using System.Web.Mvc;

namespace HataCom.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		//[Authorize(Roles = RoleTypes.Admin + "," + RoleTypes.Authorized_Extended_Access)]
		//public ActionResult About()
		//{
		//	ViewBag.Message = "Your application description page.";
		//	return View();
		//}

		//public ActionResult Contact()
		//{

		//	ViewBag.Message = "Your contact page.";
		//	return View();
		//}

	}
}