import { GetDatabase, Write, Read } from './database.js';

const default_schema = {
    "Amount": {
        "type": "number",
        "default": "()=>\"\"",
        "width": 30,
        "value": ""
    },
    "Categories": {
        "type": "select",
        "choices": [
            "food",
            "school"
        ],
        "default": "()=>\"food\"",
        "width": 70,
        "value": ""
    },
    "Tags": {
        "type": "multiple-select",
        "choices": [
            "chip",
            "freshco"
        ],
        "default": "()=>\"\"",
        "width": 70,
        "value": ""
    },
    "Name": {
        "type": "text",
        "default": "()=>\"No Named\"",
        "width": 30,
        "value": ""
    },
    "Day": {
        "type": "number",
        "default": "()=>new Date().getDate()",
        "width": 33,
        "value": ""
    },
    "Month": {
        "type": "number",
        "default": "()=>new Date().getMonth()+1",
        "width": 33,
        "value": ""
    },
    "Year": {
        "type": "number",
        "default": "()=>new Date().getYear() + 1900",
        "width": 33,
        "value": ""
    },
    "ID": {
        "type": "text",
        "default": "()=>Date.now()",
        "width": 100,
        "value": ""
    }
};

export async function getSchema (schema_type) {
    try{
        const db = await GetDatabase('config');
        return await Read(db, 'schema', schema_type) 
            || await Write(db, 'schema', schema_type, default_schema) 
            || default_schema; 
    }catch(err) {
        console.error('getSchema Error: ', err);
        return null;
    }
} 

export async function updateSchemaChoices (schema_type, schema_with_choices) {
    try{
        const db = await GetDatabase('config');
        const schema = await getSchema(schema_type);
        schema_with_choices.forEach( ([key, {choices}])=> {
            schema[key].choices = choices;
        });
        return await Write(db, 'schema', schema_type, schema);
    }catch(err){
        console.error("updateSchemaChoices Error:", err)
        return null;
    }
}
