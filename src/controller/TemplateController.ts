import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Template } from '../entity/Template'

export class TemplateController {
  private templateRepository = getRepository(Template)

  save (request: Request, response: Response, next: NextFunction) {
    return this.templateRepository.save(request.body)
  }
}
