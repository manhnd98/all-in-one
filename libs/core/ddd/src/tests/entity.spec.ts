import {RequestContextService} from "@all-in-one/core/application";
import { Entity } from '../lib/entity.base';
import { DomainPrimitive, ValueObject} from '../lib/value-object.base';

describe('Entity', () => {

  // write unit test for the entity.base.ts with 100% coverage

  let requestContextService: RequestContextService;
  const mockStaticMethod = jest.fn();

  beforeEach(() => {
    RequestContextService.getContext = mockStaticMethod;
    mockStaticMethod.mockReturnValue({
      requestId: 'test'
    })
  });


  it('should return the unpacked entity', function () {




    class PrimitiveValueObject extends ValueObject<string> {
      protected validate(props: DomainPrimitive<string>): void {
        return;
      }
    }

    class ComplexEntity extends Entity<TestEntityProps> {
    }



    type TestEntityProps = {
      name: string;
      email: PrimitiveValueObject
    }



    const complexEntity = new ComplexEntity({
     id: 'test',
      props: {
        name: 'test',
        email: new PrimitiveValueObject({value: 'helloworld@gmail.com'})
      },
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    expect(complexEntity.unpack()).toEqual({
      id: 'test',
      name: 'test',
      email: 'helloworld@gmail.com',
      updatedAt: complexEntity.updatedAt,
      createdAt: complexEntity.createdAt,
    });
  });

})
