# Setting Up a New Project

This readme file provides the steps for creating a basic website project that will allow you to use gulp.js v4 along with:
- **gulp-sass**: converts scss files to css
- **postcss**: provides a way to analyze and modify css rules (needed to use both autoprefixer and cssnano)
- **autoprefixer**: prefixes css rules with browser prefixes that help make your css work in a broader number of environments
- **cssnano**: minifies your css
- **rename**: allows you to rename files, such as adding .min to a file extension when a file is minified
- **babel.js**: transpiles (converts) modern ES6 code to an older syntax making it possible to run on more browsers
- **uglify**: minifies your js

## Summary of Steps

These instructions will cover each of the steps below:

1. Create a new project folder with folders for source and "compiled" files.
2. Initializes the project for git and create a basic .gitignore file.
3. Initializes the project for use with node modules (creating package.json file and installing node_modules directory).
4. Install gulp for use with the project and save it to the dev-dependencies in the package.json.
5. Create a gulpfile.js file, where we'll add our gulp code.
6. Install all of the gulp plugins described above and save them to the dev-dependencies in the package.json.
7. Create a basic gulp workflow for watching, compiling/transpiling, minifying and serving js and sass files.

### Create a Project Folder

We need a project folder to hold all of our files.  It needs a structure that's a little different from the one we've been using so far.  It should look like this:

![](assets/img/folders.png)

You can create this folder/file structure manually, or you can use the command line to do it.  Lets open up Terminal on the MAC and do this the pro way:

1. Open Terminal (find it in the Applications > Utilities folder or use Spotlight to search for it).
2. When a new Terminal window opens, you should be in your user home directory by default.  You can confirm this by typing `pwd`, which is the command to have Terminal report what is the current working directory.  If you're not in your /Users/*yourusername* directory, just type `cd ~`.  The cd is the command to *change directory* and the tilde tells it to change to your home directory.
3. We're going to put the project folder, which I'll name exampleproj, on the desktop, so type `mkdir -p ~/Desktop/exampleproj`.  The mkdir command means *make directory* and the part that follows is the path and foldername.  Remember, the ~ means start in your root.  We're already there so we could have skipped it, but we're practicing so we get used to using it. :smile: When you use the `-p` (this is known as a flag and in this case the p flag) with the mkdir command, it will create the entire folder path if it doesn't exist. If you had typed `mk dir -p ~/Desktop/mysites/newproj` for example, and there wasn't a mysites folder already on the desktop, it would have created both the mysites folder and the nested newproj folder.
4. Next, type `cd !$`.  The !$ is another one of those special commands we can give to change directory.  It will take us into the folder we just created.
5. From here we need to build our project folders.  We could do these one at a time by using our `mkdir` command, but we can make several folders all in one command by wrapping them in curly braces like this: `mkdir -p assets/{css,img,js} src/{js,sass}`.  
6. You can check your handy work so far with `ls` command. The ls, which stands for *list*, will list all of the files in the folder.  You should see that you have two top level folders named assets and src now in the project folder, and if you cd into the assets folder with `cd assets` and then type `ls`, you'll see the 3 folders we created there as well.  Use `cd ..` to go back one directory so you're in your project folder.  Remember, you can type `pwd` at any time to find out where you're at inside your directory structure.
7. Next, we're going to create an index.html file in the root of our project.  Once you're back in the project folder, type `touch index.html`.  I know -- it's a creepy sounding command, but it just means *if this file doesn't exist, create it*.
8. We're going to use touch once more now to create our sass file, so type `touch src/sass/styles.scss`.

Go check out your work by opening the folder you created on the Desktop using Finder and perusing everything you did with just the command line!!!! :tada:

### Initialize the Project for Git

1. We're going to want to use git for our project, so to initialize the folder, we just need to make sure we're in our project folder by typing `pwd`.  If you need to, cd into the correct folder with `cd ~/Desktop/exampleproj`.  Once there, type `git init`.  You should get back a message that reads: **Initialized empty Git repository in /Users/yourusername/Desktop/test/.git/**.
2. That's really it, but since we're going to have a lot of special files in here for gulp to work with, we want to make sure to exclude them automatically when we upload stuff to GitHub.  We can do that with a special file called a **.gitignore** file.  This file just contains a list of files we don't want git to bother with tracking or syncing to our GitHub account, such as those weird .DS_Store files you may have seen show up in your GitHub account.  One easy way to create this file is to use our touch command again.  So, type `touch .gitignore` in the root of the project.
3. We're going to add some stuff to this file by opening it in our Atom text editor by typing: `atom .gitignore`.
4. Next, copy the .gitignore contents in this directory and paste it into your file that is open in Atom.  Save it and close it.  There are several ways to get good starting boilerplate.  I use a site maintained by the folks at Git called: https://www.gitignore.io/.  You can go there and manually generate the file contents, or you can use a special package like wget that allows you to use the command line to retrieve files over the Internet.

Now, you've got your project set up to use git locally.  When you want to connect to GitHub, you can just open up your GitHub Desktop program and go to File > Add Local Repository..., find the folder and click Add Repository.  To add a corresponding GitHub remote repository, just commit your files and click the Publish button.  

# Initialize the Project for Use with Node

You already have Node.js installed. We did that to get the Browsersync server installed on your computer in one of our classes.  Node.js is pretty powerful and offers a lot more than just the option to run a web server.  Node.js *is* actually a server. Specifically, it's a server that runs Javascript (except without a browser). Many people have written open source projects that run on the Node.js server -- over 350,000 as a matter of fact.  This is great if we're creating a web project because we can take advantage of many of these node projects to improve our code; simplify our workflows; and even build sophisticated backends for our site.

This is where npm comes into play.  The Node Package Manager, known as npm, is a tool that lets us easily install and manage any of those 350,000 node projects that people have built and shared with the rest of the world.  Again, we've already installed npm.  You can verify that by typing `npm -v` in the Terminal.  This command will tell you what version of npm is installed on your machine.

To use Node.js and npm on our project, we need to have a package.json file. A package.json file is a manifest of your project that describes the packages and applications it depends on, information about its unique source control (like Git), and specific metadata like the project's name, description, and author.  You can create this file manually.  All it is is a JSON formatted document, but it's picky about the format and doing that is tedious, so we can use the npm init command to do it for us:

1. Use `pwd` or just type `cd ~/Desktop/exampleproj` to make sure you're in the project folder first.  Once you've made sure you're in the root folder for your project, type `npm init`.
