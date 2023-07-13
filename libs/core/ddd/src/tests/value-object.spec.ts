// write unit test for the value-object.base.ts with 100% coverage

import { DomainPrimitive, ValueObject } from '../lib/value-object.base';
import {AppRequestContext, RequestContextService} from "@all-in-one/core/application";
import {ArgumentNotProvidedException} from "@all-in-one/core/exceptions";


describe('ValueObject', () => {

  let requestContextService: RequestContextService;
  const mockStaticMethod = jest.fn();

  beforeEach(() => {

    RequestContextService.getContext = mockStaticMethod;
    mockStaticMethod.mockReturnValue({
      requestId: 'test'
    })

  });

  it('should throw an error if props are empty', () => {
    expect(() => {
      const testValueObject: DomainPrimitive<string> = {
        value: ''
      };

      class TestValueObject extends ValueObject<string> {
        protected validate(props: DomainPrimitive<string>): void {
          return;
        }
      }
      new TestValueObject(testValueObject);
    }).toThrowError(ArgumentNotProvidedException);
  });


  // test the unpack function
  it('should unpack the value object', () => {
    const testValueObject: DomainPrimitive<string> = {
      value: 'test'
    };

    class TestValueObject extends ValueObject<string> {
      protected validate(props: DomainPrimitive<string>): void {
        return;
      }
    }
    const valueObject = new TestValueObject(testValueObject);
    expect(valueObject.unpack()).toEqual('test');
  });

});
