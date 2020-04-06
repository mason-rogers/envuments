import * as dotenv from 'dotenv';

import { Parser } from "./lib/Parser";
import { EnvumentType } from "./lib/Types.enum";

let configObject: {[key: string]: any} = {};

export class Envuments {
    private static parser = new Parser();

    private static getConfig() {
        if (!configObject || !Object.keys(configObject).length) { // Default to dotenv config
            try {
                dotenv.config()
            } catch {}

            Envuments.SeedConfig(process.env);
        }

        return configObject;
    }

    static SeedConfig(config: {[key: string]: any}) {
        if (Object.keys(config).includes('parsed')) { // Dotenv.config() response
            configObject = config.parsed;
        } else {
            configObject = config;
        }
    }

    private static _get(key: string, type: EnvumentType = EnvumentType.STRING, def?: any): any {
        const rawVal = this.getConfig()[key];
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

    static get(key: string, def?: string): string {
        return this._get(key, EnvumentType.STRING, def);
    }

    static getNumber(key: string, def?: number): number {
        return this._get(key, EnvumentType.NUMBER, def);
    }

    static getBoolean(key: string, def?: boolean): boolean {
        return this._get(key, EnvumentType.BOOLEAN, def);
    }

    get(key: string, def?: string): string {
        return Envuments._get(key, EnvumentType.STRING, def);
    }

    getNumber(key: string, def?: number): number {
        return Envuments._get(key, EnvumentType.NUMBER, def);
    }

    getBoolean(key: string, def?: boolean): boolean {
        return Envuments._get(key, EnvumentType.BOOLEAN, def);
    }
}