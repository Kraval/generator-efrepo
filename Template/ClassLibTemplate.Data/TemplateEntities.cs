using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using <%= modelProjectName %>;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace <%= repoProjectName %>.Models
{
    public class <%= contextName %> : DbContext
    {

        public <%= contextName %>()
            : base("<%= contextName %>")
        {
        }
        
        <%= dbSetEntries %>

        public virtual void Commit()
        {
            base.SaveChanges();
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<IncludeMetadataConvention>();
        }
    }
}