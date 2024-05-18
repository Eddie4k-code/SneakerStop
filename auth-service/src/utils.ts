import bcrypt from 'bcrypt';

/* Check if a field is empty */
export const checkForEmptyField = <T>(value:T): boolean => {
    if (!value) {
        return false;
    }
    return true;
}

/* Handles operating on a password */
export class Password {
    
    static async passwordToHash(password: string): Promise<string> {

        const saltRounds = 10;

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    static async validate(databasePassword: string, givenPassword: string): Promise<boolean> {
        return await bcrypt.compare(givenPassword, databasePassword);
    }


}

