import { UserController } from './controller/UserController'
import { TemplateController } from './controller/TemplateController'
export const Routes = [
  {
    method: 'post',
    route: '/templates',
    controller: TemplateController,
    action: 'save'
  },
  {
    method: 'get',
    route: '/templates',
    controller: TemplateController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/templates/:id',
    controller: TemplateController,
    action: 'one'
  },
  {
    method: 'delete',
    route: '/templates/:id',
    controller: TemplateController,
    action: 'remove'
  },
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one'
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save'
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove'
  }
]
