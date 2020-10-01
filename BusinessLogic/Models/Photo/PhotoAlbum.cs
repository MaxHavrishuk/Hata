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

		//[Display(Name ="�����")]
		//[StringLength(50,ErrorMessage = "����� �� ���� ������������ 50 �������!")]
		//[Required(ErrorMessage = "������ ����� �������!")]
		public string Title { get; set; }

		//[Display(Name = "����")]
		//[StringLength(230, ErrorMessage = "���� �� ���� ������������ 230 �������!")]
		public string Description { get; set; }

		public string IconLink { get; set; }

		public List<Photo> Photos { get; set; }

		public PhotoAlbum()
		{
			Photos = new List<Photo>();
		}
	}
}
