# generator-EFRepo 

An EntityFramework Repository and UnitOfWork class generator.


## Getting Started

### Install Yeoman?

```
$ npm install -g yo
```

### Yeoman Generators

Once you have Yeoman generator installed, now you can bring in other generators created by the community. In this case let's install the efrepo generator package from npm.

To install generator-efrepo from npm, run:

```
$ npm install -g generator-efrepo
```

Then make a directory where you want the Yeoman generator to create the EntityFramework project. 

```
$ mkdir MyForum
$ cd MyForum
```

Next, let's initiate the repository yeoman generator. Couple of things before we do that.

- Generator is intended to create two projects
- **.Model** project which will have all the classes
- **.Data** project which will have the Factory, Repositories and UnitOfWork
- You **do not** need to provide the .Model and .Data to generator

Ok, let's fire up the generator.

```
$ yo efrepo
```

The generator will ask you 3 questions. 
- Project Name
- Model classes seperated by comma (Customer,Order,Vendor)
- EntityFramework Context Class name

Alright, that's all. You should see the two project folders .Model,.Data and a solution file(.sln). Open the solution the file using Visual Studio.


### Things to remember
- Project will create empty model classes, use CodeFirst to add necessary properties
- Reference of the .Model project needs to be readded to .Data project
- NuGet pacakges needes to be restored using Nuget Package Manager window
- The project is inspired by [SocialGoal](https://github.com/MarlabsInc/SocialGoal) , so how to further use this repositories can be understood form that repository

And you are all set, Happy Coding !