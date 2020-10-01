using BusinessLogic.Contexts;
using BusinessLogic.DbInitialize;
using BusinessLogic.Models;
using HataCom.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace HataCom.Repositories
{
	public class PhotoRepository : IRepository<Photo>
	{
		private HataContext db = new HataContext();

		DbInitializer dbInitializer = new DbInitializer();//ініціалізатор для уникання міграцій (dropAndCreateDB) - створення екземплеяра класа

		public Photo Get(int id)
		{
			try
			{
				return db.Photos.Find(id);
			}
			catch (Exception)
			{

				throw;
			}
		}

		public IEnumerable<Photo> GetAll()
		{
			try
			{
				return db.Photos;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public IEnumerable<Photo> GetPhotosByAlbumId(int albumId)
		{
			try
			{
				var photos = db.Photos.Where(e => e.PhotoAlbumId == albumId);
				return photos;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public bool Remove(int id)
		{
			Photo photo = db.Photos.Find(id);
			try
			{
				db.Photos.Remove(photo);
				return true;
			}
			catch (Exception)
			{
				return false;
			}
		}

		public bool Add(Photo entity)
		{
			try
			{
				db.Photos.Add(entity);
				return true;
			}
			catch (Exception)
			{
				return false;
			}
		}

		public bool Update(Photo enitity)
		{

			try
			{
				db.Entry(enitity).State = EntityState.Modified;
				return true;
			}
			catch (Exception)
			{
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