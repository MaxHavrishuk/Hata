using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HataCom.Interfaces
{
    public interface IRepository<T>
    {
        T Get(int id);

        bool Add(T entity);

        bool Remove(int id);

        IEnumerable<T> GetAll();

		bool Update(T enitity);

		void Save();
    }

 
}
