import { Envuments } from '../';
import { EnvType } from './Types.env';

const envCache: { [key: string]: any } = {};

/**
 *  @description Annotate class properties, either static or instance, to retrieve environment variables. EnvType needs to be passed in for Number and Boolean types.
 *
 * @param key Environment variable key to retrieve.
 * @param defaultVal Default value to return if the environment variable is not set.
 * @param type Type of environment variable to return. Defaults to String.
 * @returns
 */
export const Env = function (key: string, defaultVal?: any, type: EnvType = String) {
   if (!Reflect)
      throw new Error("@Env annotation used without Reflect, have you called import 'reflect-metadata'; in your code?");

   const computeValue = () => {
      switch (type) {
         case Number:
            return Envuments.getNumber(key, parseFloat(defaultVal));
         case Boolean:
            return Envuments.getBoolean(key, Boolean(defaultVal));
         default:
            return Envuments.get(key, String(defaultVal));
      }
   };

   return function (_target: any, _propertyKey: any) {
      let value = envCache[key];
      if (value === undefined) {
         value = computeValue();
         envCache[key] = value;
      }
      return () => value;
   };
};
