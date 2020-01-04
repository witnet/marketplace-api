import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Template } from '../entity/Template'
import { validate } from 'class-validator'

export class TemplateController {
  private templateRepository = getRepository(Template)

  async save (request: Request, response: Response, next: NextFunction) {
    const template = new Template()
    template.name = request.body.name
    template.description = request.body.description
    template.radRequest = request.body.radRequest

    const errors = await validate(template)
    if (errors.length > 0) {
      response.status(400).send(errors)
    } else {
      const result = await this.templateRepository.save(template)
      return result
    }
  }

  async all (request: Request, response: Response, next: NextFunction) {
    return this.templateRepository.find()
  }

  async one (request: Request, response: Response, next: NextFunction) {
    return this.templateRepository.findOne(request.params.id)
  }

  async remove (request: Request, response: Response, next: NextFunction) {
    let templateToRemove = await this.templateRepository.findOne(
      request.params.id
    )
    await this.templateRepository.remove(templateToRemove)
  }
}
