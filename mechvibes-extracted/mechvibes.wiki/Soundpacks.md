# Installing soundpacks
Installing new packs is simple. Just press the install button on the website.

# Installing downloaded packs
Though we're no longer providing support for this method of installing soundpacks, you *can* still do it.

First you'll want to locate your custom folder.

In versions of Mechvibes before v2.3.5, you can find this folder, by right clicking on the tray icon, and clicking "Custom Folder".

In Mechvibes v2.3.5 and later, you can find this folder by right clicking on the tray icon, and hovering over "Folders" and then clicking on "Custom soundpacks"

In the future, these options may be unavailable, in which case you might find the custom folder in your appData.

On Windows: `%appdata%\Mechvibes\custom`\
On macOS: `~/Library/Application Support/Mechvibes/custom`\
On Linux: `~/.config/Mechvibes/custom` or `$XDG_CONFIG_HOME/Mechvibes/custom`

If these folders don't exist on your system, you may be using a version of mechvibes which placed files in your home directory. In this case, the locations are as follows:

On Windows: `C:\Users\YOUR_USERNAME_HERE\mechvibes_custom`\
On macOS: `~/mechvibes_custom`\
On Linux: `~/mechvibes_custom`

Then, be sure to extract the soundpack, and you'll want to ensure that the config.json file is at the root of the folder before moving it into your custom directory.

Valid structure in any version:
```
- custom/
- > soundpack/
- - > config.json
- - > ... sound files ...
```

Valid structure after v2.3.5 only:
```
- custom/
- > soundpack by xyz.zip
```

Invalid structure:
```
- custom/
- > soundpack by xyz/
- - > soundpack/
- - - > config.json
- - - > ... sound files ...
```

Also Invalid:
```
- custom/
- > config.json
- > ... sound files ...
```

Also Invalid:
```
- custom/
- > soundpack by xyz.rar
```

# Before you start creating a new soundpack
Before reading about the specification of config.json or before considering to edit soundpacks by hand, please consider creating soundpacks using the [editor on the website](https://mechvibes.com/editor/) as it's the official way to create soundpacks, and at the time of writing this, we don't support uploading config.json files.

# Using zip files
The way we've implemented zip files in v2.3.5, allows for files to be placed virtually anywhere in the archive, so long as there are no conflicting file names. If there are any conflicting file names, there may be issues with the wrong sound being played, or the wrong config being loaded.
