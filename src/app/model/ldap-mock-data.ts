import { UserLdap } from './user-ldap';

export const LDAP_USERS: UserLdap[] = [
  {
    id: 1,
    nomComplet: 'V1 Test',
    password: '123',
    email: 'test.v1@epsi.fr',
    role: 'ROLE_SUPER_ADMIN',
    active: true,
  },
  {
    id: 2,
    nomComplet: 'V2 Test',
    password: '123',
    email: 'test.v2@epsi.fr',
    role: 'ROLE_USER',
    active: false,
  },
  {
  id: 3,
  nomComplet: 'V3 Test',
  password: '123',
  email: 'test.v1@epsi.fr',
  role: 'ROLE_USER',
  active: true,
},
{
  id: 4,
  nomComplet: 'V4 Test',
  password: '123',
  email: 'test.v1@epsi.fr',
  role: 'ROLE_USER',
  active: false,
},

{
  id: 5,
  nomComplet: 'V5 Test',
  password: 'V5 Test',
  email: 'test.v1@epsi.fr',
  role: 'ROLE_USER',
  active: false,
},
];
