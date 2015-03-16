using <%= repoProjectName %>.Models;
using <%= repoProjectName %>.Infrastructure;

namespace <%= repoProjectName %>.Infrastructure
{
public class DatabaseFactory : Disposable, IDatabaseFactory
{
    private <%= contextName %> dataContext;
    public <%= contextName %> Get()
    {
        return dataContext ?? (dataContext = new <%= contextName %>());
    }
    protected override void DisposeCore()
    {
        if (dataContext != null)
            dataContext.Dispose();
    }
}
}
