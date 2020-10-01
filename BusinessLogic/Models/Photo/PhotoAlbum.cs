using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace BusinessLogic
{
	public class PhotoAlbum
	{
		[Key]
		public int PhotoAlbumId { get; set; }

		public int UserId { get; set; }

		//[Display(Name ="Назва")]
		//[StringLength(50,ErrorMessage = "Назва не може перевищувати 50 символів!")]
		//[Required(ErrorMessage = "Вкажіть назву альбому!")]
		public string Title { get; set; }

		//[Display(Name = "Опис")]
		//[StringLength(230, ErrorMessage = "Опис не може перевищувати 230 символів!")]
		public string Description { get; set; }

		public string IconLink { get; set; }

		public List<Photo> Photos { get; set; }

		public PhotoAlbum()
		{
			Photos = new List<Photo>();
		}
	}
}
