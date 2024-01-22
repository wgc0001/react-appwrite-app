import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)

        } catch(error) {
            console.log('Appwrite cannot get post', error)
            return false

        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try{
           return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)

        } catch (error) {
            console.log("get posts in Appwrite is not working", error);
            return false
        }
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,{
                title, content, featuredImage, status, userId
            })

        } catch (error) {
            console.log("Appwrite cannot create a post", error)
            return false

        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,slug, {title, content, featuredImage, status})

        } catch(error) {
            console.log("Appwrite unable to update post", error)
            return false

        }

    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,slug)
            return true;

        } catch(error) {
            console.log("Appwrite unable to delete post", error)
            return false

        }

    }
//storage service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch {
            console.log("Appwrite cannot upload the file", error)
            return false
        }

    }

    
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch {
            console.log("Appwrite cannot delete the file", error)
            return false
        }

    }

    getFilePreview(fileId){
        return this.bucket/this.getFilePreview(
            conf.appwriteBucketId,
            fileId
        ).href
    }

}

const service = new Service()

export default new service;



