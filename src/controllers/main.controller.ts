import { authenticate } from "@loopback/authentication";
import {get, response} from "@loopback/rest";
import {GenericError} from "../models/error.model";

export class MainController {
  constructor() {}

  @response(500, GenericError)
  @authenticate('basic')
  @get('/test')
  test() {
    return;
  }
}
