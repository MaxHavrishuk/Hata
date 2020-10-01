using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BusinessLogic.Models.ViewModels
{
	public class AddAlbumView
	{
		//Альбоми для відображення
		public IEnumerable<PhotoAlbum> PhotoAlbums { get; set; }

		//Дані для завантаження
		public PhotoAlbum PhotoAlbum { get; set; }
		public IEnumerable<HttpPostedFileBase> Files { get; set; }

	}
}
