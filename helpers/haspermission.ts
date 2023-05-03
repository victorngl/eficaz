export const userHasPermission = (role_name: string, roles) => {

    var filteredRoles = roles.filter(role => (role === role_name));

    if (filteredRoles.length >= 1 && role_name === filteredRoles[0]) {

        return true
    }

    return false
}

