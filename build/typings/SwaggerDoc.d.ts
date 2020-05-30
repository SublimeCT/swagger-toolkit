import { Spec, Info, Path } from 'swagger-schema-official';
/**
 * swagger doc.json struct
 */
export declare class SwaggerDoc implements Spec {
    swagger: string;
    info: Info;
    paths: {
        [pathName: string]: Path;
    };
    constructor(swagger: string, info: Info, paths: {
        [pathName: string]: Path;
    });
}
//# sourceMappingURL=SwaggerDoc.d.ts.map