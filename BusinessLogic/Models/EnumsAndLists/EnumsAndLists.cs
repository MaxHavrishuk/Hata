using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models.Enum
{
	public class Enum
	{
		public enum Sex
		{
			Male,
			Female
		}

		//Опис всіх ролей з таблиці Roles 
		public enum Roles
		{
			Authorized_LOW_Access,
			Authorized_Extended_Access,
			Admin,
			God
		}
	}

	//Допрацювати метод отримання назви РОЛІ!!! 
	//Список ролей тільки константи для того, щоб додавати напряму в атрибут [Authorize(Roles = RoleTypes.____)]
	public static class RoleTypes
	{
		public const string Authorized_LOW_Access = "Authorized_LOW_Access";
		public const string Authorized_Extended_Access = "Authorized_Extended_Access";
		public const string Admin = "Admin";
		public const string God = "God";

		public static string GetRoleName(string roleType)
		{
			switch (roleType)
			{
				case RoleTypes.God:
					return "Христос";
				case RoleTypes.Admin:
					return "Адмін";
				case RoleTypes.Authorized_Extended_Access:
					return "Вовк";
				case RoleTypes.Authorized_LOW_Access:
					return "Користувач";
				default:
					return "Невідомо";
			}
		}
	}

}
