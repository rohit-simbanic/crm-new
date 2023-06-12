import userRoles from "assets/constants/user-roles";
import { ObjectType } from "types";
import { isEmpty } from "./misc-helper";


export const isUserBrokerageOperationManager = () => {

    const roles = JSON.parse(localStorage.getItem("roles") || "[]");

    const exist = roles.find((role: ObjectType) => role.role_type === userRoles.operation_manager_brokerage_user);

    return !isEmpty(exist) ? true : false
}

export const isUserAdmin = () => {

    const { user } = JSON.parse(localStorage.getItem('user') || '{}');

    return (user?.is_admin === 1) ? true : false

}