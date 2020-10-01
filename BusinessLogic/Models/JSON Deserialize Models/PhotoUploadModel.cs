using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models.JSON_Deserialize._Models
{
	/// <summary>
	/// Json Album description class for deserializing
	/// </summary>
	public class AlbumDescriptionModel
	{
		[JsonProperty("albumName")]
		public string AlbumName { get; set; }
		[JsonProperty("albumDescription")]
		public string AlbumDescription { get; set; }
		[JsonProperty("files")]
		public List<PhotoDescriptionModel> Photos { get; set; }

	}

	/// <summary>
	/// Json list photos description for AlbumDescriptionModel list => List<PhotoDescriptionModel> Photos { get; set; }
	/// </summary>
	public class PhotoDescriptionModel
	{

		[JsonProperty("name")]
		public string Name { get; set; }
		[JsonProperty("isCover")]
		public bool IsCover { get; set; }

	}
}
