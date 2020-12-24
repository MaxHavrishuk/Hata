using BusinessLogic.BusinessLogicMethods;
using BusinessLogic.Contexts;
using BusinessLogic.Models;
using BusinessLogic.Models.Authorization;
using BusinessLogic.Models.ViewModels;
using BusinessLogic.StaticConstants;
using DotNetOpenAuth.GoogleOAuth2;
using HataCom.Providers;
using Microsoft.AspNet.Membership.OpenAuth;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
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
		OAuthLogic oAuthLogic = new OAuthLogic();

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
		//6.Add an action method to redirect user to Google login URL on click of the above “Login Using Google” link.
		public ActionResult RedirectToGoogle()
		{
			string provider = "google";
			string returnUrl = "";
			return new ExternalLoginResult(provider, Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl }));
		}
		internal class ExternalLoginResult : ActionResult
		{
			public ExternalLoginResult(string provider, string returnUrl)
			{
				Provider = provider;
				ReturnUrl = returnUrl;
			}

			public string Provider { get; private set; }
			public string ReturnUrl { get; private set; }

			public override void ExecuteResult(ControllerContext context)
			{
				OpenAuth.RequestAuthentication(Provider, ReturnUrl);
			}
		}
		//When user clicks the link, he or she will be redirected to Google login page by specifying “/Account/ExternalLoginCallback” 
		//as the redirect URL. This URL should match the URL we saved when creating OAuth application on Google developer console.

		//7. Next, let’s add the landing page or redirect URL action method “ExternalLoginCallback” to get back access token 
		//and user details Google is forwarding.
		[AllowAnonymous]
		public ActionResult ExternalLoginCallback(string returnUrl)
		{
			string ProviderName = OpenAuth.GetProviderNameFromCurrentRequest();

			if (ProviderName == null || ProviderName == "")
			{
				NameValueCollection nvs = Request.QueryString;
				if (nvs.Count > 0)
				{
					if (nvs["state"] != null)
					{
						NameValueCollection provideritem = HttpUtility.ParseQueryString(nvs["state"]);
						if (provideritem["__provider__"] != null)
						{
							ProviderName = provideritem["__provider__"];
						}
					}
				}
			}

			GoogleOAuth2Client.RewriteRequest();

			var redirectUrl = Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl });
			var retUrl = returnUrl;
			var authResult = OpenAuth.VerifyAuthentication(redirectUrl);

			if (authResult.IsSuccessful)
			{
				//Зовнішня аутентифікація успішна, перевярємо чи юзер вже є в локальній БД
				//Якшо юзера немає додаємо
				if (!oAuthLogic.IsUserExists(authResult.ProviderUserId))
				{
					UserOpenAuthModel user = new UserOpenAuthModel();
					user.ProvideUserId = authResult.ProviderUserId;
					user.ProviderUserName = authResult.UserName;
					user.ProviderName = authResult.Provider;
					string Email = null;
					if (Email == null && authResult.ExtraData.ContainsKey("email"))
					{
						Email = authResult.ExtraData["email"];
					}
					user.MembershipUserrName = Email;
					//Додаємо новго юзера, ставим кукі і повертаємо його на головну
					if (oAuthLogic.AddNewUser(user))
					{
						FormsAuthentication.SetAuthCookie(authResult.UserName, true);
						return Redirect(Url.Action("Index", "Home"));
					}

				}
				//Якшо юзер вже є, ставимо кукі і на головну
				else
				{
					FormsAuthentication.SetAuthCookie(authResult.UserName, true);
					return Redirect(Url.Action("Index", "Home"));
				}
			}
			else
			{
				ViewBag.Message = "Помилка авторизації!";
				return View("Error");
			}

			return View();
		}
	}
}