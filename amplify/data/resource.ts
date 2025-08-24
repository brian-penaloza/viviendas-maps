import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Property database table with a "content" field and
an Area database table with hierarchical relationships. Properties are linked
to areas, and areas can have parent areas creating a nested structure.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      lat: a.float(),
      lng: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Property: a
    .model({
      content: a.string(),
      lat: a.float(),
      lng: a.float(),
      idArea: a.string(), // Referencia al área donde está ubicada la propiedad
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Area: a
    .model({
      name: a.string(), // Nombre del área (ej: "Colonia Centro", "Barrio La Vega")
      description: a.string(), // Descripción opcional del área
      idSubArea: a.string(), // Referencia al área padre (null si es área raíz)
      level: a.integer(), // Nivel en la jerarquía (0 = raíz, 1 = subárea, 2 = sub-subárea, etc.)
      isActive: a.boolean().default(true), // Indica si el área está activa
    })
    .authorization((allow) => [allow.publicApiKey()]),

  AreaPoint: a
    .model({
      lat: a.float(), // Latitud del punto
      lng: a.float(), // Longitud del punto
      order: a.integer(), // Orden del punto en la secuencia del polígono
      areaId: a.string(), // Referencia al área a la que pertenece este punto
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: properties } = await client.models.Property.list()
// const { data: areas } = await client.models.Area.list()

// return <ul>{properties.map(property => <li key={property.id}>{property.content}</li>)}</ul>
