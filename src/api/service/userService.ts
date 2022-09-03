import db from "../models";
import { ProfileAttributes as Profile } from "../interfaces/models";

export default class UserService {

    public constructor (private database: typeof db) {
        this.getUserProfile = this.getUserProfile.bind(this)
        this.createUserProfile = this.createUserProfile.bind(this)
        this.getVaultItems = this.getVaultItems.bind(this)
        this.setVaultItem = this.setVaultItem.bind(this)
    }

    public async getUserProfile (email: String, password: String): Promise<Profile> {
        const user = await this.database.Profile.findOne({
            where: { email: email, password: password, },
         })

        return user
    }

    public async createUserProfile(
        email: String, 
        password: String, 
        name: String
    ): Promise<Profile> {
        const user = await this.database.Profile.create({
            email: email,
            password: password,
            name: name
        })

        return user
    }

    public async getVaultItems(
        vaultNumber: String,
    ) {
        const items = await this.database.Item.findAndCountAll({
            where: {vaultNumber: vaultNumber}
        })

        return items
    }
    
    public async setVaultItem(
        vaultNumber: String,
        item: String
    ) {
        console.log(item);
        
        const items = await this.database.Item.create({
            item: item,
            vaultNumber: vaultNumber
        })

        return items
    }
}