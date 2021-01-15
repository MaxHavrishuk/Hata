using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models.JSON_Deserialize_Models
{
	public class AlbumUpdateModel
	{
		[JsonProperty("albumId")]
		public int AlbumId { get; set; }

		[JsonProperty("albumName")]
		public string AlbumName { get; set; }

		[JsonProperty("albumDescription")]
		public string AlbumDescription{ get; set; }

		[JsonProperty("photosToEdit")]
		public List<PhotosToUpdateModel> Photos { get; set; }

	}

	public class PhotosToUpdateModel
	{
		[JsonProperty("photoId")]
		public int PhotoId { get; set; }

		[JsonProperty("photoName")]
		public string PhotoName { get; set; }


		[JsonProperty("toRemove")]
		public bool ToRemove { get; set; }



	}
}
