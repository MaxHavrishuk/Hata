using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models.ViewModels
{
	public class AlbumWithPhotosView
	{
		public IEnumerable<Photo> Photos { get; set; }

		public PhotoAlbum  PhotoAlbum { get; set; }

	}
}
