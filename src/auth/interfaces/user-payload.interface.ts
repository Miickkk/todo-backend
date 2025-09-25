import { Role } from '../../common/enums/role.enum';

export interface UserPayload {
userId: number;
email: string;
role: Role;
}