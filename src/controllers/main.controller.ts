import {authenticate} from "@loopback/authentication";
import {get, response} from "@loopback/rest";
import {GenericError} from "../models/error.model";

export class MainController {
    @response(500, GenericError)
    @authenticate('basic')
    @get('/test', {
        security: [{basic: []}],
        responses: {}
    })
    test() {
        return;
    }
}
