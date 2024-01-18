//start with appwrite auth service
import conf from "../conf/conf.js"
import {Client, Account} from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)

    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount){

                return this.login(email, password)

            } else {
                return userAccount
            }
        } catch (error){
            throw error
        }

    }
    async login(email, password){
        try {
            return await this.account.createEmailSession(email, password)

        } catch (error){

        }

    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("backend service cannot get current user", error);
        }
    }
    async logout(){
        try{
            await this.account.deleteSessions()

        } catch (error) {
            console.log("Could not logout", error)
        }
    }

}

const authService = new AuthService()

export default authService;

