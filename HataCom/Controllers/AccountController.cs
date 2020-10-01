using BusinessLogic.BusinessLogicMethods;
using BusinessLogic.Models;
using BusinessLogic.Models.Authorization;
using BusinessLogic.Models.ViewModels;
using BusinessLogic.StaticConstants;
using HataCom.Providers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace HataCom.Controllers
{
	public class AccountController : Controller
	{
		AccountLogic accountLogic = new AccountLogic();

		// GET: Account
		public ActionResult SignIn()
		{
			return View();
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult SignIn(SignIn sign)
		{
			if (ModelState.IsValid)
			{
				UserModel user = accountLogic.SignIn(sign);
				if (user != null)
				{
					FormsAuthentication.SetAuthCookie(sign.Login, true);
					return RedirectToAction("UserPage", "Account");
				}
				else
				{
					ModelState.AddModelError("", "Неправильний логін або Пароль");
				}

			}
			return View("SignIn");
		}

		[Authorize]
		public ActionResult UserPage()
		{
			UserModel user = accountLogic.UserInfo(User.Identity.Name);
			return View(user);
		}

		[Authorize]
		public ActionResult SignOut()
		{
			FormsAuthentication.SignOut();
			return RedirectToAction("Index", "Home");
		}


		public ActionResult SignUp()
		{
			return View();
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult SignUp(RegisterUserView model)
		{
			var file = model.File;

			string fileName = Path.GetFileName(file.FileName);
			//створення правильного посилання
			var finalName = Guid.NewGuid() + file.ContentType.Replace('/', '.');
			string link = Server.MapPath(PathsToContent.UsersPhoto + finalName);
			file.SaveAs(link);

			var finalModel = model.RegisterModel;
			finalModel.ImageLink = PathsToContent.UsersPhoto + finalName;
			if (accountLogic.Register(finalModel))
			{
				return RedirectToAction("UserPage", "Account");
			}
			return View();
		}
	}
}