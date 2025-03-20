import 'reflect-metadata';
import { Envuments, Env } from '../src';
import { assert } from 'chai';

describe('Env Annotation Tests', () => {
   describe('Valid cases', () => {
      class ConfigValid extends Envuments {
         @Env('TEST_NUMBER', 2, Number)
         public static testNumber: number;

         @Env('TEST_BOOLEAN', false, Boolean)
         public static testBoolean: boolean;

         @Env('TEST_STRING', 'default', String)
         public static testString: string;

         @Env('TEST_STRING_2', 'test')
         public static testString2: string;
      }

      it('should assign a number for testNumber', () => {
         assert.typeOf(ConfigValid.testNumber, 'number');
         assert.equal(ConfigValid.testNumber, 2);
      });

      it('should assign a boolean for testBoolean', () => {
         assert.typeOf(ConfigValid.testBoolean, 'boolean');
         assert.equal(ConfigValid.testBoolean, false);
      });

      it('should assign a string for testString', () => {
         assert.typeOf(ConfigValid.testString, 'string');
         assert.equal(ConfigValid.testString, 'default');
      });

      it('should assign a string by default for testString2', () => {
         assert.typeOf(ConfigValid.testString2, 'string');
         assert.equal(ConfigValid.testString2, 'test');
      });
   });

   describe('Invalid cases', () => {
      class ConfigInvalid extends Envuments {
         @Env('TEST_NUMBER_2', 3)
         public static testNumber2: number;

         @Env('TEST_BOOLEAN_2', true)
         public static testBoolean2: boolean;

         @Env('TEST_STRING_3') // Test for undefined as default value
         public static testString3: string;
      }

      it('should not assign a number, but string for testNumber2', () => {
         assert.typeOf(ConfigInvalid.testNumber2, 'string');
         assert.notStrictEqual(ConfigInvalid.testNumber2, 3);
      });

      it('should not assign a boolean, but string for testBoolean2', () => {
         assert.typeOf(ConfigInvalid.testBoolean2, 'string');
         assert.notStrictEqual(ConfigInvalid.testBoolean2, true);
      });

      it(`should return undefined string for testString3`, () => {
         assert.typeOf(ConfigInvalid.testString3, 'undefined');
         assert.equal(ConfigInvalid.testString3, undefined);
      });
   });
});
