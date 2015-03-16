using <%= modelProjectName %>;
using <%= repoProjectName %>.Models;
using <%= repoProjectName %>.Infrastructure;


namespace <%= repoProjectName %>.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDatabaseFactory databaseFactory;
        private <%= contextName %> dataContext;

        public UnitOfWork(IDatabaseFactory databaseFactory)
        {
            this.databaseFactory = databaseFactory;
        }

        protected <%= contextName %> DataContext
        {
            get { return dataContext ?? (dataContext = databaseFactory.Get()); }
        }

        public void Commit()
        {
            DataContext.Commit();
        }
    }
}
