/* eslint-env detox/detox */
import { testIds } from "./testHelper";

describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should open account list screen", async () => {
    await expect(element(by.text("Plano de Contas"))).toBeVisible();
  });

  it("should navigate to account insertion screen after tap insert button", async () => {
    await element(by.id(testIds.baseTemplate.insertButton)).tap();
    await expect(element(by.text("Inserir Conta"))).toBeVisible();
  });
});
