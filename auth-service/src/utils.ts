/* Check if a field is empty */
export const checkForEmptyField = <T>(value:T): boolean => {
    if (!value) {
        return false;
    }
    return true;
}