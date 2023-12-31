import { exists, BaseDirectory, createDir, writeTextFile, readDir, readTextFile } from '@tauri-apps/api/fs';

async function createDirectory(path){
    try{
        if (!await exists(path, { dir: BaseDirectory.AppData })){
            await createDir(path, { dir: BaseDirectory.AppData, recursive: true });
        }
        return path;
    }catch(err){
        console.error("createDirectory Error: ", err);
        return null;
    }
}

async function createFile(path, text_content){
    try {
        await writeTextFile(path, text_content, { dir: BaseDirectory.AppData });
        return true;
    }catch(err){
        console.error("createFile Error: ", err);
        return null;
    }
}

export async function GetDatabase (database_name) {
    try{
        return { path: await createDirectory('database/' + database_name) };
    }catch(err){
        console.error("GetDatabase Error: ", err);
        return null;
    }
}

export async function Write(database, collection, id, data){
    try{
        const json_string = JSON.stringify(data);
        const database_path = await database.path;

        const collection_path = await createDirectory(database_path + "/" + collection);
        const id_path = collection_path + "/" + id + ".json";

        return await createFile(id_path, json_string);
    }catch(err){
        console.error("Write Error: ", err);
        return null;
    }
}

async function getDirectory(path){
    try{
        return Object
            .values(await readDir(path, { dir: BaseDirectory.AppData }))
            .map((file_entry)=>file_entry.name);
    }catch(err){
        console.error("getDirectory Error: ", err);
        return null;
    }
}

async function readFile(path){
    try{
        return JSON.parse(await readTextFile(path, { dir: BaseDirectory.AppData }));
    }catch(err){
        console.error("readFile Error: ", err);
        return null;
    }
}
export async function GetCollections(database){
    try{
        return await getDirectory(database.path);
    }catch(err){
        console.error("GetCollection Error: ", err);
        return null
    }
}

export async function GetIDs(database, collection){
    try{
        const json_file = await getDirectory(database.path+'/'+collection)
        return json_file.map(name=>name.slice(0, -5));
    }catch(err){
        console.error("GetIDs Error: ", err);
        return null
    }
}

export async function Read(database, collection=null, id=null){
    try{
        if (collection && id) {
            return await readFile(database.path+'/'+collection+'/'+id+'.json');
        }

        const name_arr = !collection
            ? await GetCollections(database)
            : await GetIDs(database, collection);

        const data = {};
        (!collection
            ? await GetCollections(database)
            : await GetIDs(database, collection)
        ).forEach(!collection
            ? async(name)=>data[name]=await Read(database,name)
            : async(name)=>data[name]=await Read(database,collection,name)
        );

        return data;

    }catch(err){
        console.error("Read Error: ", err);
        return null
    }
}

