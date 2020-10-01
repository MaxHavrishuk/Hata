using BusinessLogic.Contexts;
using BusinessLogic.Models;
using BusinessLogic.Models.Authorization;
using BusinessLogic.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;

namespace BusinessLogic.BusinessLogicMethods
{
	public class AccountLogic
	{
		HataContext db = new HataContext();

		public UserModel SignIn(SignIn signIn)
		{
			string pass = SHA.GetPasswordHashWithSalt(signIn.Login, signIn.Password);
			return db.Users.FirstOrDefault(e => e.Name == signIn.Login && e.PassWord == pass);
		}

		public UserModel UserInfo(string login)
		{
			var user = db.Users.FirstOrDefault(e => e.Name == login);
			user.Role = db.Roles.Where(e => e.RoleId == user.RoleId).FirstOrDefault();
			return user;
		}

		//Додати валідацію даних!!!
		public bool Register(RegisterModel registerUser)
		{
			if (registerUser != null)
			{
				if (db.Users.Any(e => e.Name == registerUser.Login))
				{
					return false;
				}
				else
				{
					UserModel user = new UserModel();

					user.Age = registerUser.Age;
					user.Name = registerUser.Login;
					user.PassWord = SHA.GetPasswordHashWithSalt(registerUser.Login, registerUser.Password);
					user.Sex = (int)registerUser.Sex;
					user.ImageUser = registerUser.ImageLink;
					user.Role = db.Roles.Where(e => e.RoleType == RoleTypes.Authorized_LOW_Access).FirstOrDefault();
					db.Users.Add(user);
					db.SaveChanges();

					string pass = SHA.GetPasswordHashWithSalt(registerUser.Login, registerUser.Password);
					user = db.Users.Where(e => e.Name == registerUser.Login && e.PassWord == pass).FirstOrDefault();
					if (user != null)
					{
						FormsAuthentication.SetAuthCookie(registerUser.Login, true);
						return true;
					}
					else
					{
						return false;
					}
				}
			}
			else
			{
				return false;
			}
		}
	}
}
