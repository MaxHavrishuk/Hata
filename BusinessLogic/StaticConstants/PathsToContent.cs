using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.StaticConstants
{
	//клас для збереження статичних шляхів розміщення контенту
	public static class PathsToContent
	{
		//шлях до фото
		public static string PhotosPath { get; } = "/Content/mediaContent/Photo/";

		//шлях до музики
		public static string MusicsPath { get; } = "/Content/mediaContent/Photo/";

		//шлях до відео
		public static string VideosPath { get; } = "/Content/mediaContent/Photo/";
		
		//базовий шлях до іконок профілів користувачів
		public static string UsersPhoto { get; } = "/Content/mediaContent/UsersPhoto/";
	}
}
