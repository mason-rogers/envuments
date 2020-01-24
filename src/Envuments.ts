import * as dotenv from 'dotenv';

import { Parser } from "./lib/Parser";
import { EnvumentType } from "./lib/Types.enum";

let configObject: {[key: string]: any} = {};

export class Envuments {
    private parser = new Parser(this);

    constructor() {
        if (!configObject || !Object.keys(configObject).length) { // Default to dotenv config
            try {
                dotenv.config()
            } catch {}

            Envuments.SeedConfig(process.env);
        }
    }

    static SeedConfig(config: {[key: string]: any}) {
        if (Object.keys(config).includes('parsed')) { // Dotenv.config() response
            configObject = config.parsed;
        } else {
            configObject = config;
        }
    }

    private _get(key: string, type: EnvumentType = EnvumentType.STRING, def?: any): any {
        const rawVal = configObject[key];
        if (!rawVal) return def;

        const parsed = this.parser.resolveValueString(key, String(rawVal));

        switch(type) {
            case EnvumentType.STRING: {
                return parsed !== '' && parsed || def;
            }
            case EnvumentType.NUMBER: {
                const num = Number(parsed);

                return !isNaN(num) && num || def;
            }
            case EnvumentType.BOOLEAN: {
                const yes = ['1', 'yes', 'true'];
                const no = ['0', 'no', 'false'];

                if (yes.includes(parsed)) return true;
                if (no.includes(parsed)) return false;

                return def;
            }

            default: {
                return parsed !== '' && parsed || def;
            }
        }
    }

    get(key: string, def?: string): string {
        return this._get(key, EnvumentType.STRING, def);
    }

    getNumber(key: string, def?: number): number {
        return this._get(key, EnvumentType.NUMBER, def);
    }

    getBoolean(key: string, def?: boolean): boolean {
        return this._get(key, EnvumentType.BOOLEAN, def);
    }
}