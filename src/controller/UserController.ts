import {UserBusiness} from "../business/UserBusiness"
import {Request, Response} from "express"
import {BaseError} from "../errors/BaseError"

import {ZodError} from "zod"
import {SignupOutputDTO, SignupSchema} from "../dtos/user/signup.dto"
import {LoginOutputDTO, LoginSchema} from "../dtos/user/login.dto"

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.getUsers()

      // res.status(200).send(users)
      res.status(200).send(users)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public signUp = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      const output: SignupOutputDTO = await this.userBusiness.signUp(input)

      res.status(201).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public logIn = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      })

      const token = await this.userBusiness.logIn(input)

      const output: LoginOutputDTO = {
        token: token,
      }

      res.status(200).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}
