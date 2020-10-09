using BusinessLogic;
using BusinessLogic.BusinessLogicMethods;
using BusinessLogic.Contexts;
using BusinessLogic.DbInitialize;
using BusinessLogic.Models;
using BusinessLogic.Models.Enum;
using BusinessLogic.Models.JSON_Deserialize._Models;
using BusinessLogic.Models.ViewModels;
using BusinessLogic.StaticConstants;
using HataCom.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static BusinessLogic.Models.Enum.Enum;

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