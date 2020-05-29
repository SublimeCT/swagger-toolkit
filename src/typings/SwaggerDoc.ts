import { Spec, Info, Path } from 'swagger-schema-official'

/**
 * swagger doc.json struct
 */
export class SwaggerDoc implements Spec {
    constructor(
        public swagger: string,
        public info: Info,
        public paths: { [pathName: string]: Path }
    ) {}
}
