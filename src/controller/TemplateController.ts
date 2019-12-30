import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Template } from '../entity/Template'

export class TemplateController {
  private templateRepository = getRepository(Template)

  async save (request: Request, response: Response, next: NextFunction) {
    return this.templateRepository.save(request.body)
  }

  async all (request: Request, response: Response, next: NextFunction) {
    return this.templateRepository.find()
  }

  async one (request: Request, response: Response, next: NextFunction) {
    return this.templateRepository.findOne(request.params.id)
  }

  async remove (request: Request, response: Response, next: NextFunction) {
    let templateToRemove = await this.templateRepository.findOne(request.params.id)
    await this.templateRepository.remove(templateToRemove)
  }
}
