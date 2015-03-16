'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var EFRepoGenerator = yeoman.generators.Base.extend({

	promptUser: function() {
        var done = this.async();
        
        console.log(yosay('Welcome to yeoman EntitiFramework Repository Generator'));
 
        var prompts = [{
            name: 'projectName',
            message: 'What is your app\'s name ?',
            default: 'MyProj.Model'
        }, {
		    name: 'modelCls',
		    message: 'What model classes you have?',		    
	  	}, {
		    name: 'contextName',
		    message: 'How you want to name EntitiFramework Context class?',
		    default: 'EFContext'
	  	}];
 
        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;
            this.modelProjectName = props.projectName +'.Model';
            this.repoProjectName = props.projectName +'.Data';
            this.modelClasses = props.modelCls.split(',');
            this.contextName = props.contextName;
            // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript#answer-8809472
            function generateUUID() {
		      var d = new Date().getTime();
		      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		          var r = (d + Math.random()*16)%16 | 0;
		          d = Math.floor(d/16);
		          return (c=='x' ? r : (r&0x7|0x8)).toString(16);
		      });
		      return uuid;
		    };

    		this.projectGuid = generateUUID();
    		this.repoProjectGuid = generateUUID();
            done();
        }.bind(this));
    },

    scaffoldFolders: function(){
		
		this.sourceRoot(path.join(__dirname, '../Template/'));
	    this.mkdir(this.modelProjectName);		    
	    //this.bulkDirectory('packages','packages');   
	    this.copy('ClassLibTemplate/packages.config', this.modelProjectName + '/' +'packages.config');   
	    this.copy('ClassLibTemplate/App.config', this.modelProjectName + '/' +'App.config');   
	    
	    this.mkdir(this.modelProjectName + '/Properties'); 
	    this.copy('ClassLibTemplate/Properties/AssemblyInfo.cs', this.modelProjectName + '/Properties/AssemblyInfo.cs');
	    
	    this.mkdir(this.modelProjectName + '/Models'); 

	    var template = '<Compile Include=\"Models\\**cls**.cs\" />';
	    this.classItems ='';

	    for (var i = 0; i < this.modelClasses.length; i++) {

	    	var classEntry = template.replace('**cls**',this.modelClasses[i]);
	    	this.classItems = this.classItems + '\r\n' + classEntry;	    	
			this.template('ClassLibTemplate/Class.cs'
						  ,this.modelProjectName + '/Models/'+ this.modelClasses[i] + '.cs'
						  , { namespace: this.modelProjectName, classname: this.modelClasses[i] });
		    
		}
	    this.template('ClassLibTemplate/ClassLibTemplate.csproj'
						  ,this.modelProjectName + '/' + this.modelProjectName + '.csproj'
						  , { projectGuid: this.projectGuid, modelProjectName: this.modelProjectName, modelClassEntries:this.classItems });

	    

		//Repository Project
		this.mkdir(this.repoProjectName);
		this.copy('ClassLibTemplate.Data/packages.config', this.repoProjectName + '/' +'packages.config');   
	    this.copy('ClassLibTemplate.Data/App.config', this.repoProjectName + '/' +'App.config');   
	    this.mkdir(this.repoProjectName + '/Properties'); 
	    this.copy('ClassLibTemplate/Properties/AssemblyInfo.cs', this.repoProjectName + '/Properties/AssemblyInfo.cs');
	    this.mkdir(this.repoProjectName + '/Infrastructure'); 
	    this.mkdir(this.repoProjectName + '/Repository'); 

		this.template('ClassLibTemplate.Data/Infrastructure/DatabaseFactory.cs'
						  ,this.repoProjectName + '/Infrastructure/DatabaseFactory.cs'
						  , {repoProjectName:this.repoProjectName,contextName:this.contextName });


		this.copy('ClassLibTemplate.Data/Infrastructure/Disposable.cs', this.repoProjectName + '/' +'Infrastructure/Disposable.cs');   
		
		this.template('ClassLibTemplate.Data/Infrastructure/IDatabaseFactory.cs'
						  ,this.repoProjectName + '/Infrastructure/IDatabaseFactory.cs'
						  , {repoProjectName:this.repoProjectName,contextName:this.contextName });

		this.copy('ClassLibTemplate.Data/Infrastructure/IRepository.cs', this.repoProjectName + '/' +'Infrastructure/IRepository.cs');   
		this.copy('ClassLibTemplate.Data/Infrastructure/IUnitOfWork.cs', this.repoProjectName + '/' +'Infrastructure/IUnitOfWork.cs');  
		this.copy('ClassLibTemplate.Data/Infrastructure/Page.cs', this.repoProjectName + '/' +'Infrastructure/Page.cs');  

		this.template('ClassLibTemplate.Data/Infrastructure/RepositoryBase.cs'
						  ,this.repoProjectName + '/Infrastructure/RepositoryBase.cs'
						  , {modelProjectName: this.modelProjectName,repoProjectName:this.repoProjectName
						  	,contextName:this.contextName });

		this.template('ClassLibTemplate.Data/Infrastructure/UnitOfWork.cs'
						  ,this.repoProjectName + '/Infrastructure/UnitOfWork.cs'
						  , {modelProjectName: this.modelProjectName,repoProjectName:this.repoProjectName
						  	,contextName:this.contextName });


		var dbSetTemplate = 'public DbSet<cls> cls { get; set; }';
		this.dbSetItems = '';

		var repoTemplate = '<Compile Include=\"Repository\\**cls**Repository.cs\" />';
		this.repoItems = '';

		for (var i = 0; i < this.modelClasses.length; i++) {

	    	var repoEntry = repoTemplate.replace('**cls**',this.modelClasses[i]);
	    	this.repoItems = this.repoItems + '\r\n' + repoEntry;	

	    	var dbSetEntry = dbSetTemplate.replace(/cls/g,this.modelClasses[i]);	    	
	    	this.dbSetItems = this.dbSetItems + '\r\n' + dbSetEntry;

			this.template('ClassLibTemplate.Data/Repository/TemplateRepository.cs'
						  ,this.repoProjectName + '/Repository/'+ this.modelClasses[i] + 'Repository.cs'
						  , { namespace: this.repoProjectName, classname: this.modelClasses[i] 
						  ,   modelproject:this.modelProjectName});
		}

		this.template('ClassLibTemplate.Data/TemplateEntities.cs'
						  ,this.repoProjectName + '/'+ this.contextName + '.cs'
						  , { modelProjectName: this.modelProjectName,repoProjectName:this.repoProjectName 
						  ,   contextName:this.contextName, dbSetEntries:this.dbSetItems });

		this.template('ClassLibTemplate.Data/ClassLibTemplate.Data.csproj'
						  ,this.repoProjectName + '/' + this.repoProjectName + '.csproj'
						  , { projectGuid: this.projectGuid, modelProjectName: this.modelProjectName
						  ,   repoProjectGuid:this.repoProjectGuid,repoProjectName:this.repoProjectName 
						  ,   contextName:this.contextName , repoEntries:this.repoItems });

		this.copy('Template.sln', 'Template.sln');  

	}

});
module.exports = EFRepoGenerator;