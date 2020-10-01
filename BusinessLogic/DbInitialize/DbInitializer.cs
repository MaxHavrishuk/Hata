using BusinessLogic.BusinessLogicMethods;
using BusinessLogic.Contexts;
using BusinessLogic.Models;
using BusinessLogic.Models.Authorization;
using BusinessLogic.Models.Enum;
using BusinessLogic.StaticConstants;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;
using static BusinessLogic.Models.Enum.Enum;

namespace BusinessLogic.DbInitialize
{


	public class DbInitializer : DropCreateDatabaseAlways<HataContext>
	{

		protected override void Seed(HataContext db)
		{
			//!!!
			//Додання базових ролей в Бд
			db.Roles.Add(new Role() { RoleType = RoleTypes.God, RoleName = RoleTypes.GetRoleName(RoleTypes.God) });//всі права на перегляд + давати доступ, тобто призначати ролі іншим користувачам
			db.Roles.Add(new Role() { RoleType = RoleTypes.Admin, RoleName = RoleTypes.GetRoleName(RoleTypes.Admin) });//всі права на перегляд
			db.Roles.Add(new Role() { RoleType = RoleTypes.Authorized_LOW_Access, RoleName = RoleTypes.GetRoleName(RoleTypes.Authorized_LOW_Access) });//авторизований в тому числі через гугл користувач з більш широким доступом для презентабельного конетнту
			db.Roles.Add(new Role() { RoleType = RoleTypes.Authorized_Extended_Access, RoleName = RoleTypes.GetRoleName(RoleTypes.Authorized_Extended_Access) });//аторизований користувач якому дані права для НЕпрезентабельного контенту (для обмеженої групи людей)

			db.SaveChanges();
			//!!!!


			//Додання юезрів в Бд з базовими ролями
			db.Users.Add(new UserModel()
			{
				Age = 25,
				Name = "Max",
				PassWord = SHA.GetPasswordHashWithSalt("Max", "admin"),
				Sex = (int)Sex.Male,
				ImageUser = PathsToContent.UsersPhoto + "basicUserAdmin.jpg",
				Role = db.Roles.Where(e => e.RoleType == RoleTypes.Admin).FirstOrDefault()
			});



			//іконки для альбому
			//var albumICo1 = HostingEnvironment.MapPath(@"../Content/img/TestAlbum/1.jpg"); //віртуальний шлях до корню проекта
			var albumICo1 = PathsToContent.PhotosPath + "1.jpeg"; //віртуальний шлях до корню проекта
			var albumICo2 = PathsToContent.PhotosPath + "2.jpeg"; //віртуальний шлях до корню проекта

			string testDesription = @"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.";

			//Самі фото для альбому 1
			List<Photo> photos = new List<Photo>();

			for (int i = 0; i < 5; i++)
			{
				photos.Add(new Photo()
				{
					ImageLink = PathsToContent.PhotosPath + "1.jpeg",
					Title = "Test",
					UserId = 1
				});
			}


			db.PhotoAlbums.Add(new PhotoAlbum() { Title = "Test1", UserId = 1, Photos = photos, IconLink = albumICo1, Description = testDesription });
			//context.Photos.AddRange(new List<Photo>(photos));


			//Самі фото для альбому 2

			List<Photo> photos1 = new List<Photo>();
			for (int i = 0; i < 5; i++)
			{
				photos1.Add(new Photo()
				{
					ImageLink = PathsToContent.PhotosPath + "2.jpeg",
					Title = "Test",
					UserId = 1
				});
			}

			db.PhotoAlbums.Add(new PhotoAlbum() { Title = "Test2", UserId = 1, Photos = photos1, IconLink = albumICo2, Description = testDesription });
			//context.Photos.AddRange(new List<Photo>(photos1));

			//context.Photos.Add(new Photo() { ImageLink = "/Content/img/TestAlbum/2.jpg", Title = "Test", UserId = 1,  });



			db.SaveChanges();
			base.Seed(db);
		}
	}
}
