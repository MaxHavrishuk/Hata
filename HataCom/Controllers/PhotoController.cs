using BusinessLogic;
using BusinessLogic.BusinessLogicMethods;
using BusinessLogic.Models;
using BusinessLogic.Models.JSON_Deserialize._Models;
using BusinessLogic.Models.ViewModels;
using BusinessLogic.StaticConstants;
using HataCom.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace HataCom.Controllers
{
	public class PhotoController : Controller
	{
		PhotoAlbumsRepository photoAlbumsDb = new PhotoAlbumsRepository();
		PhotoRepository photosDb = new PhotoRepository();

		public ActionResult PhotoAlbum()
		{
			AddAlbumView addAlbumView = new AddAlbumView();
			addAlbumView.PhotoAlbums = photoAlbumsDb.GetAll();
			
			return View(addAlbumView);
		}

		[HttpPost]
		public HttpStatusCode Upload(FormCollection formCollection)
		{
			if (ModelState.IsValid)
			{
				AlbumDescriptionModel albumDescription = new AlbumDescriptionModel();
				string jsonString = formCollection["albuminfo"];
				albumDescription = JsonConvert.DeserializeObject<AlbumDescriptionModel>(jsonString);
				HttpFileCollectionBase files = null;
				if (Request.Files.Count > 0 && !string.IsNullOrEmpty(albumDescription.AlbumName))
				{
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
						return HttpStatusCode.OK;
					}
					else
					{
						return HttpStatusCode.BadRequest;
					}
				}
				else
				{
					return HttpStatusCode.BadRequest;
				}
			}
			else
			{
				return HttpStatusCode.BadRequest;
			}
		}

		[HttpGet]
		public ActionResult Photos(int Id)
		{

			IEnumerable<Photo> photos = photosDb.GetPhotosByAlbumId(Id);
			if (photos.Any())
			{
				ViewBag.AlbumTitle = photoAlbumsDb.Get(Id).Title;
				return View(photos);
			}
			else
			{
				ViewBag.Message = "Такого альбому не існує";
				return View("Error", ViewBag);
			}

		}

		public ActionResult DeletePhotoAlbum(int Id)
		{
			AddAlbumView addAlbumView = new AddAlbumView();
			if (photoAlbumsDb.Remove(Id))
			{
				addAlbumView.PhotoAlbums = photoAlbumsDb.GetAll();
				return RedirectToAction("PhotoAlbum");//RedirectToAction - для запобігання відображенню адреси для видалення в браузері
			}
			else
			{
				ViewBag.Message = "Як Ви сюди потрапили";
				return View("Error", ViewBag);
			}

		}
	}
}