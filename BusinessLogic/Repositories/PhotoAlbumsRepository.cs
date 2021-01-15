using BusinessLogic.Contexts;
using BusinessLogic.DbInitialize;
using BusinessLogic.Models;
using BusinessLogic.StaticConstants;
using HataCom.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BusinessLogic.BusinessLogicMethods
{
	public class PhotoAlbumsRepository : IRepository<PhotoAlbum>
	{
		private HataContext db = new HataContext();

		DbInitializer dbInitializer = new DbInitializer();//ініціалізатор для уникання міграцій (dropAndCreateDB) - створення екземплеяра класа

		public PhotoAlbum Get(int id)
		{
			try
			{
				return db.PhotoAlbums.Find(id);
			}
			catch (Exception)
			{
				throw;
			}
		}

		public IEnumerable<PhotoAlbum> GetAll()
		{
			try
			{
				var albums = db.PhotoAlbums;
				return albums;
			}
			catch (Exception)
			{
				throw;
			}
			
		}

		//Додатково перевірити все, перевірки і тд!!!!!!!!!
		public bool Remove(int id)
		{
			PhotoAlbum album = db.PhotoAlbums.Find(id);
			if (album != null)
			{
				try
				{
					List<Photo> photosToDelete = db.Photos.Where(e => e.PhotoAlbumId == album.PhotoAlbumId).ToList();
					db.Photos.RemoveRange(photosToDelete);
					db.PhotoAlbums.Remove(album);
					db.SaveChanges();


					foreach (var item in photosToDelete)
					{
						if (File.Exists(HttpContext.Current.Server.MapPath(item.ImageLink)))
						{
							File.Delete(HttpContext.Current.Server.MapPath(item.ImageLink));
						}

					}
					return true;
				}
				catch (Exception)
				{
					return false;
				}
			}
			else
			{
				return false;
			}

		}

		public bool Add(PhotoAlbum entity)
		{
			try
			{
				db.PhotoAlbums.Add(entity);
				db.SaveChanges();
				return true;
			}
			catch (Exception)
			{
				return false;
			}
		}

		public bool AddWithPhotos(PhotoAlbum entity)
		{
			try
			{
				//Перевірка чи є в списку фото з відміткою про обложку, якщо ні то обрати перше фото
				//db.PhotoAlbums.Add(entity).IconLink = photos.Where(e => e.IsCover == 1).FirstOrDefault().ImageLink;
				try
				{
					if (entity.Photos.Any(e => e.IsCover == true))
					{
						entity.IconLink = entity.Photos.Where(e => e.IsCover == true).FirstOrDefault().ImageLink;
						db.PhotoAlbums.Add(entity);
						db.SaveChanges();
					}
					else
					{
						entity.IconLink = entity.Photos.First().ImageLink;
						db.PhotoAlbums.Add(entity);
						db.SaveChanges();
					}
				}
				catch (Exception) { throw; }

				return true;
			}
			catch (Exception ex)
			{
				var test = ex.Message;
				return false;
			}
		}


		public bool Update(PhotoAlbum enitity)
		{
			try
			{
				var result = db.PhotoAlbums.SingleOrDefault(e => e.PhotoAlbumId == enitity.PhotoAlbumId);
				if (result != null)
				{
					result.Title = enitity.Title;
					result.Description = enitity.Description;
					db.SaveChanges();
					return true;
				}
				else
				{
					return false;
				}
			}
			catch (Exception ex)
			{
				var etst = ex.Message;
				return false;
			}
		}

		public void Save()
		{
			try
			{
				db.SaveChanges();
			}
			catch (Exception)
			{

				throw;
			}
		}

		private bool disposed = false;
		protected virtual void Dispose(bool disposing)
		{
			if (!this.disposed)
			{
				if (disposing)
				{
					db.Dispose();
				}
			}
			this.disposed = true;
		}

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}
	}
}
