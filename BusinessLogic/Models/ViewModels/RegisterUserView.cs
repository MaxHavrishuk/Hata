using BusinessLogic.Models.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BusinessLogic.Models.ViewModels
{
	public class RegisterUserView
	{
		public RegisterModel RegisterModel { get; set; }

		public HttpPostedFileBase File { get; set; }
	}
}
