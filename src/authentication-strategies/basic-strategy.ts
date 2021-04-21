import {asAuthStrategy, AuthenticationStrategy} from '@loopback/authentication';
import {asSpecEnhancer, mergeSecuritySchemeToSpec, OASEnhancer, OpenApiSpec} from '@loopback/openapi-v3';
import {Request} from '@loopback/rest';
import {injectable} from '@loopback/context';
import {securityId, UserProfile} from '@loopback/security';

@injectable(asAuthStrategy, asSpecEnhancer)
export class BasicAuthenticationStrategy implements AuthenticationStrategy, OASEnhancer {
    name = 'basic';

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        return {
            [securityId]: 'api-key',
        };
    }

    modifySpec(spec: OpenApiSpec): OpenApiSpec {
        return mergeSecuritySchemeToSpec(spec, this.name, {
            type: 'apiKey',
            in: 'cookie',
            name: 'api',
        });
    }
}
