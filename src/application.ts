import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {
  AuthenticationComponent,
  AuthenticationMiddlewareProvider,
  registerAuthenticationStrategy
} from "@loopback/authentication";
import {BasicAuthenticationStrategy} from "./authentication-strategies/basic-strategy";
import {RepositoryMixin} from "@loopback/repository";

export {ApplicationConfig};

export class LoopbackSecuritySchemeApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    registerAuthenticationStrategy(this, BasicAuthenticationStrategy);

    this.middleware(AuthenticationMiddlewareProvider);

    this.component(AuthenticationComponent);

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
