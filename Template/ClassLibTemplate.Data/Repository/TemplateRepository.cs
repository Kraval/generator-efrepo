using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using <%= modelproject %>;
using <%= namespace %>.Infrastructure;

namespace <%= namespace %>.Repository
{
    public class <%= classname %>Repository : RepositoryBase<<%= classname %>>, I<%= classname %>Repository
    {
        public <%= classname %>Repository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }
    public interface I<%= classname %>Repository : IRepository<<%= classname %>>
    {

    }
}
