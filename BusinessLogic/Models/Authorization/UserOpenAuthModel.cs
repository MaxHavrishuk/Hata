using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models.Authorization
{
	public class UserOpenAuthModel
	{
		[Key]
		public int Id { get; set; }
		public string ProviderName { get; set; }

		public string ProvideUserId { get; set; }

		public string ProviderUserName { get; set; }

		public string MembershipUserrName { get; set; }

		//public DateTime LastUsedDatetime { get; set; }
	}
}
