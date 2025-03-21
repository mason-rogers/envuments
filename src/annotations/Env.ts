import { Envuments } from '../';

const envCache: { [key: string]: any } = {};

export const Env = function (
  key: string,
  defaultVal?: any,
  type: typeof Number | typeof Boolean | typeof String = String
) {
  if (!Reflect)
    throw new Error(
      "@Env annotation used without Reflect, have you called import 'reflect-metadata'; in your code?`"
    );

  return function (target: any, propertyKey: string) {
    let value = envCache[key];

    if (value)
      return Object.defineProperty(target, propertyKey, {
        value,
      });

    switch (type) {
      case Number: {
        value = Envuments.getNumber(key, parseFloat(defaultVal));
        break;
      }

      case Boolean: {
        value = Envuments.getBoolean(key, Boolean(defaultVal));
        break;
      }

      default: {
        value = Envuments.get(key, String(defaultVal));
        break;
      }
    }

    envCache[key] = value;

    Object.defineProperty(target, propertyKey, {
      value,
    });
  };
};
