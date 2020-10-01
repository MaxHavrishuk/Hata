using BusinessLogic;
using BusinessLogic.BusinessLogicMethods;
using BusinessLogic.Contexts;
using BusinessLogic.DbInitialize;
using BusinessLogic.Models;
using BusinessLogic.Models.Enum;
using BusinessLogic.Models.JSON_Deserialize._Models;
using BusinessLogic.Models.ViewModels;
using BusinessLogic.StaticConstants;
using HataCom.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static BusinessLogic.Models.Enum.Enum;

namespace HataCom.Controllers
{
	public class HomeController : Controller
	{
		PhotoAlbumsRepository photoAlbumsDb = new PhotoAlbumsRepository();
		PhotoRepository photosDb = new PhotoRepository();
		public ActionResult Index()
		{
			return View();
		}

		[HttpGet]
		public ContentResult Test()
		{
			var t = new AlbumDescriptionModel();
			var res = JsonConvert.SerializeObject(t, Formatting.None);
			ContentResult result = new ContentResult();
			result.ContentType = "testing";
			return result;
		}

		[HttpPost]
		public HttpStatusCode Upload(FormCollection formCollection)
		{
			if (ModelState.IsValid)
			{
				AlbumDescriptionModel albumDescription = new AlbumDescriptionModel();
				string jsonString = formCollection["albuminfo"];
				HttpFileCollectionBase files = null;
				if (Request.Files.Count > 0 && !string.IsNullOrEmpty(albumDescription.AlbumName))
				{
					albumDescription = JsonConvert.DeserializeObject<AlbumDescriptionModel>(jsonString);
					files = Request.Files;
					List<Photo> photos = new List<Photo>();
					PhotoAlbum album = new PhotoAlbum();
					string fileName;
					for (int i = 0; i < files.Count; i++)
					{
						fileName = Guid.NewGuid() + files[i].ContentType.Replace('/', '.');
						files[i].SaveAs(Server.MapPath(PathsToContent.PhotosPath + fileName));
						photos.Add(new Photo()
						{
							ImageLink = PathsToContent.PhotosPath + fileName,
							Title = albumDescription.Photos[i].Name,
							IsCover = albumDescription.Photos[i].IsCover
						});
					}
					album.Photos = photos;
					album.Title = albumDescription.AlbumName;
					album.Description = albumDescription.AlbumDescription;

					if (photoAlbumsDb.AddWithPhotos(album))
					{
						photoAlbumsDb.Dispose();
						return HttpStatusCode.OK;
					}
					else
					{
						photoAlbumsDb.Dispose();
						return HttpStatusCode.BadRequest;
					}
				}
				else
				{
					photoAlbumsDb.Dispose();
					return HttpStatusCode.BadRequest;
				}
			}
			else
			{
				photoAlbumsDb.Dispose();
				return HttpStatusCode.BadRequest;
			}
		}

		//Test begin
		public ActionResult PhotoAlbum()
		{
			AddAlbumView addAlbumView = new AddAlbumView();

			addAlbumView.PhotoAlbums = photoAlbumsDb.GetAll();
			
			return View(addAlbumView);
		}

		[HttpGet]
		public ActionResult Photos(int Id)
		{
			var test = photosDb.GetPhotosByAlbumId(Id);

			return View(test);
		}

		//[ValidateAntiForgeryToken]
		//[HttpPost]
		//public ActionResult Disabled_____Upload(AddAlbumView model)
		//{
		//	if (ModelState.IsValid)
		//	{
		//		//Потрібно зробити перевірку на формати!!! можливо покращити перевірку на наявність файлів
		//		//Вдосконалити перевірку на те чи обрана обложка
		//		List<Photo> photos = new List<Photo>();
		//		int counter = 0;
		//		foreach (var file in model.Files)
		//		{
		//			string fileName = Path.GetFileName(file.FileName);
		//			//створення правильного посилання
		//			string finalName = Guid.NewGuid() + file.ContentType.Replace('/', '.');
		//			string link = Server.MapPath(PathsToContent.PhotosPath + finalName);
		//			file.SaveAs(link);

		//			photos.Add(new Photo()
		//			{
		//				ImageLink = PathsToContent.PhotosPath + finalName,
		//				Title = model.PhotoAlbum.Photos[counter].Title,
		//				IsCover = model.PhotoAlbum.Photos[counter].IsCover
		//			});
		//			counter++;
		//		}
		//		//photos[0].IsCover = true;//!!!!!!!!!!!!!!!!!!!!!!!!!!

		//		model.PhotoAlbum.Photos = photos;
		//		photoAlbums.AddWithPhotos(model.PhotoAlbum);
		//	}
		//	//Фізичне завнатаження файлі на сервер

		//	return RedirectToAction("PhotoAlbum");
		//}

		//if (upload != null)
		//{
		//	// получаем имя файла
		//	string fileName = System.IO.Path.GetFileName(upload.FileName);
		//	// сохраняем файл в папку Files в проекте
		//	upload.SaveAs(Server.MapPath("~/Content/testFiles/" + fileName));

		//}
		//return View("PhotoAlbum");
		//return RedirectToAction("Index");

		//Test end

		[Authorize(Roles = RoleTypes.Admin + "," + RoleTypes.Authorized_Extended_Access)]
		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";
			return View();
		}

		public ActionResult Contact()
		{

			ViewBag.Message = "Your contact page.";
			return View();
		}

		public ActionResult Music()
		{
			return View();
		}

	}
}