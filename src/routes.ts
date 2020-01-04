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
  }
]
