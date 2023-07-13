import { Test, TestingModule } from "@nestjs/testing";
import { SignupHttpController } from "../../lib/signup/signup.http.controller";
import { CqrsModule } from "@nestjs/cqrs";

describe("signupHttpController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SignupHttpController],
      providers: [],
      imports: [CqrsModule],
    }).compile();
  });

  it("should init", () => {
    expect(app).toBeDefined();
  });

  afterAll(async () => {
    // todo: clear database after test
  });
});
