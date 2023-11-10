import { writeNewSchemaChoices } from './database/schema.js';
import { GetDatabase, Write, Read } from '$lib/database/database.js';

export async function updateSchema(schema){
    const unionArray = (arr1, arr2)=>[...new Set(arr1.concat(arr2))]; 

    return await writeNewSchemaChoices('expense_schema',
        Object.entries(schema)
            //get only the schema with choices
            .filter( ([_,{choices}])=>!!choices )
            //unionize choices with new one and remove duplciate
            .map( ([key, field])=> [key, {...field, choices: unionArray( field.choices, field.value) }] 
            )
    )
    ? [1, ['Updated Tags']]
    : [0, ['Failed to Update Tags']];
}

export async function writeData(schema){
    //look for empty field that is required
    const empty = Object.entries(schema).filter(([_,field])=>
        field.required && (Array.isArray(field.value)
            ? !field.value.length : !field.value)
    );

    if (empty.length){
        //return a list of empty field message
        return [0,empty.map(([key,_])=>key+' is required')];
    }else{
        const data = Object.fromEntries( Object.entries(schema)
            .map(([key, {value}])=>[key, value]) 
        );
        return await Write( 
            await GetDatabase('expense'), 
            `${data.Year}-${data.Month}`, data.ID, data
        ) 
        ? [1, ['Saved data']]
        : [0, ['Failed to save data']];
    }
}
