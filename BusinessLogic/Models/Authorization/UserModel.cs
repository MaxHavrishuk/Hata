using BusinessLogic.Models.Authorization;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models
{
	public class UserModel
	{
		[Key]
	
		public int Id { get; set; }

		[DisplayName("Логін")]
		public string Name { get; set; }

		[DisplayName("Пароль")]
		public string PassWord { get; set; }

		[DisplayName("Вік")]
		public int Age { get; set; }

		[DisplayName("Стать")]
		public int Sex { get; set; }

		public string ImageUser { get; set; }

		public int? RoleId { get; set; }

		[ForeignKey("RoleId")]
		public Role Role { get; set; }
	}

}
