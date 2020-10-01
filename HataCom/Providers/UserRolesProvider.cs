using BusinessLogic.Contexts;
using BusinessLogic.Models;
using BusinessLogic.Models.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace HataCom.Providers
{
	public class UserRolesProvider : RoleProvider
	{
		
		public override string ApplicationName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

		public override void AddUsersToRoles(string[] usernames, string[] roleNames)
		{
			throw new NotImplementedException();
		}

		public override void CreateRole(string roleName)
		{
			throw new NotImplementedException();
		}

		public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
		{
			throw new NotImplementedException();
		}

		public override string[] FindUsersInRole(string roleName, string usernameToMatch)
		{
			throw new NotImplementedException();
		}

		public override string[] GetAllRoles()
		{
			throw new NotImplementedException();
		}

		public override string[] GetRolesForUser(string username)
		{
			string[] roles = new string[] { };
			using (HataContext db = new HataContext())
			{
				UserModel user = db.Users.FirstOrDefault(e => e.Name == username);
				if (user != null)
				{
					Role userRole = db.Roles.Find(user.RoleId);
					if (userRole != null)
					{
						roles = new string[] { userRole.RoleType };
					}
				}
			}
			return roles;
		}

		public override string[] GetUsersInRole(string roleName)
		{
			throw new NotImplementedException();
		}

		public override bool IsUserInRole(string username, string roleName)
		{
			bool result = false;

			using (HataContext db = new HataContext())
			{
				UserModel user = db.Users.FirstOrDefault(e => e.Name == username);
				if (user != null)
				{
					Role userRole = db.Roles.Find(user.RoleId);
					if (userRole != null && userRole.RoleType == roleName)
					{
						result = true;
					}
				}
			}
			return result;
		}

		public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
		{
			throw new NotImplementedException();
		}

		public override bool RoleExists(string roleName)
		{
			throw new NotImplementedException();
		}
	}
}