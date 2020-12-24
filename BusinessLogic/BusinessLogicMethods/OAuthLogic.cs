using BusinessLogic.Contexts;
using BusinessLogic.Models.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.BusinessLogicMethods
{
	public class OAuthLogic
	{
		private HataContext db = new HataContext();
		private UserOpenAuthModel user = new UserOpenAuthModel();

		public bool IsUserExists(string ProviderUserid)
		{
			if (db.OpenAuthUsers.Any(e => e.ProvideUserId == ProviderUserid))
			{
				return true;
			}
			else
			{
				return false;
			}		
		}
		public bool AddNewUser(UserOpenAuthModel userOpenAuth)
		{
			db.OpenAuthUsers.Add(userOpenAuth);
			try
			{
				db.SaveChanges();
				return true;
			}
			catch (Exception)
			{

				return false;
			}
		}
	}
}
