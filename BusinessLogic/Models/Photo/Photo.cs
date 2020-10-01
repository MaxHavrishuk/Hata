using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models
{
	public class Photo
	{
		[Key]
		public int PhotoId { get; set; }
		public int UserId { get; set; }

		public string Title { get; set; }

		public string ImageLink { get; set; }

		public bool IsCover { get; set; }

		public int? PhotoAlbumId { get; set; }

		[ForeignKey("PhotoAlbumId")]
		public PhotoAlbum PhotoAlbum { get; set; }

	}
}
