import { GetDatabase, Write, Read } from './database.js';

const default_schema = {
    Amount: {
        type: 'number',
        default: '()=>0',
    },
    Categories: {
        type: 'select',
        choices: ['food', 'school'],
        default: '()=>"food"',
    },
    Tags: {
        type: 'multiple-select',
        choices: ['chip', 'freshco'],
        default: '()=>""',
    },
    Name: {
        type: 'text',
        default: '()=>"No Named"',
    },
    Day: {
        type: 'number',
        default: '()=>0',
    },
    Month: {
        type: 'number',
        default: '()=>0'
    },
    Year: {
        type: 'number',
        default: '()=>0',
    },
    ID: {
        type: 'text',
        default: '()=>Date.now()',
    }
};

export async function getSchema (schema_type) {
    const db = await GetDatabase('config');
    const schema = await Read(db, 'schema', schema_type) || default_schema;
    
    if (!schema) {
        await Write(db, 'schema', schema_type, default_schema);
    }

    return schema;
} 

export async function addSchemaChoices (schema_type, schema_key, new_value) {
    const db = await GetDatabase('config');
    const schema = await Read(db, 'schema', schema_type);

    schema[schema_key].choices.append(new_value);

    return await Write(db, 'schema', schema_type, schema);
}
