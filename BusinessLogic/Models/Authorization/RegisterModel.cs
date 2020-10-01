using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static BusinessLogic.Models.Enum.Enum;

namespace BusinessLogic.Models.Authorization
{
	public class RegisterModel
	{
		[Key]
		public string Id { get; set; }

		[Required(ErrorMessage = "Заповніть це поле")]
		public string Login { get; set; }

		[Required(ErrorMessage = "Заповніть це поле")]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Required(ErrorMessage = "Заповніть це поле")]
		[Compare("Password", ErrorMessage = "Паролі не збігаються")]
		[DataType(DataType.Password)]
		public string PasswordConfirm { get; set; }

		[Required]
		public Sex Sex { get; set; }

		[Required(ErrorMessage = "Заповніть це поле")]
		public int Age { get; set; }

		public string ImageLink { get; set; }
	}
}
