import { Client, Account,Databases,Storage,Avatars} from 'appwrite';

// export const client = new Client();

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('<YOUR_PROJECT_ID>'); // Replace with your project ID

// export const account = new Account(client);
// export { ID } from 'appwrite';


export const appwriteConfig = {
    url:import.meta.env.VITE_APPWRITE_PROJECT_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId :import.meta.env.VITE_APPWRITE_BUCKET_ID ,
    userCollectionId : import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID ,
    postCollectionId : import.meta.env.VITE_APPWRITE_COLLECTION_POST_ID ,
    savesCollectionId : import.meta.env.VITE_APPWRITE_COLLECTION_SAVES_ID ,


}



export const client = new Client();

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client);
export const database = new Databases(client);
export const storage  =  new Storage(client);
export const avatars = new Avatars(client);

