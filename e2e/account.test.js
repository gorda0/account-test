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

  describe("navigation tests", () => {
    it("should navigate to insertion screen after tap back button", async () => {
      await element(by.id(testIds.baseTemplate.insertButton)).tap();

      await expect(element(by.text("Inserir Conta"))).toBeVisible();
      await expect(element(by.id(testIds.baseTemplate.backButton))).toBeVisible();
      await expect(element(by.id(testIds.baseTemplate.finishButton))).toBeVisible();

      await element(by.id(testIds.baseTemplate.backButton)).tap();
      await expect(element(by.text("Plano de Contas"))).toBeVisible();
    });

    device.getPlatform() === "android" &&
      it("should come back to accountlist from insertion screen using system back button (Android)", async () => {
        await element(by.id(testIds.baseTemplate.insertButton)).tap();

        await expect(element(by.text("Inserir Conta"))).toBeVisible();
        await expect(element(by.id(testIds.baseTemplate.backButton))).toBeVisible();
        await expect(element(by.id(testIds.baseTemplate.finishButton))).toBeVisible();
        await device.pressBack();
        await expect(element(by.text("Plano de Contas"))).toBeVisible();
      });
  });

  describe("account management", () => {
    it("should create an account with code 1 and name 'Test' (1 - Test)", async () => {
      await element(by.id(testIds.baseTemplate.insertButton)).tap();
      await element(by.id(testIds.account.accountCodeInput)).typeText("1");
      await element(by.id(testIds.account.accountNameInput)).typeText("Test");
      await element(by.id(testIds.baseTemplate.finishButton)).tap();

      await expect(element(by.text("1 - Test"))).toBeVisible();
    });
  });
});
