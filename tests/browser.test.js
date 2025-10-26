const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
let driver;
jest.setTimeout(1000 * 60 * 5);

beforeAll(async () => {
  driver = await new Builder().forBrowser('firefox').build();
  await driver.get(fileUnderTest);
});

afterAll(async () => {
  await driver.quit();
});

test('The stack should be empty in the beginning', async () => {
  let stackText = await driver.findElement(By.id('top_of_stack')).getText();
  expect(stackText).toEqual("n/a");
});

test('Pusha till stacken should update display', async () => {
  let push = await driver.findElement(By.id('push'));
  await push.click();
  let alert = await driver.switchTo().alert();
  await alert.sendKeys("Bananer");
  await alert.accept();

  const topEl = await driver.findElement(By.id('top_of_stack'));
  await driver.wait(until.elementTextIs(topEl, 'Bananer'), 2000);
  let stackText = await topEl.getText();
  expect(stackText).toEqual("Bananer");
});
