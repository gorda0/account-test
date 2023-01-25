/* eslint-env detox/detox */
import { testIds } from "./testHelper";

describe("Account tests", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should open account list screen", async () => {
    await expect(element(by.text("Plano de Contas"))).toBeVisible();
    await expect(element(by.id(testIds.baseTemplate.insertButton))).toBeVisible();
  });

  it("should navigate to account insertion screen after tap insert button", async () => {
    await element(by.id(testIds.baseTemplate.insertButton)).tap();

    await expect(element(by.text("Inserir Conta"))).toBeVisible();
    await expect(element(by.id(testIds.baseTemplate.backButton))).toBeVisible();
    await expect(element(by.id(testIds.baseTemplate.finishButton))).toBeVisible();
  });

  it("should create an account with code 1 and name 'Test' (1 - Test)", async () => {
    await element(by.id(testIds.baseTemplate.insertButton)).tap();
    await element(by.id(testIds.account.accountCodeInput)).typeText("1");
    await element(by.id(testIds.account.accountNameInput)).typeText("Test");
    await element(by.id(testIds.baseTemplate.finishButton)).tap();

    await expect(element(by.text("1 - Test"))).toBeVisible();
  });
});
