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
  await driver.wait(until.alertIsPresent(), 2000); // vänta på prompt
  let alert = await driver.switchTo().alert();
  await alert.sendKeys("Bananer");
  await alert.accept();
  const topEl = await driver.findElement(By.id('top_of_stack'));
  await driver.wait(until.elementTextIs(topEl, 'Bananer'), 2000);
  let stackText = await topEl.getText();
  expect(stackText).toEqual("Bananer");
});

test('Poppa stacken updates display to previous top', async () => {
  // push "A"
  let push = await driver.findElement(By.id('push'));
  await push.click();
  await driver.wait(until.alertIsPresent(), 2000);
  let alert = await driver.switchTo().alert();
  await alert.sendKeys("A");
  await alert.accept();

  // push "B"
  push = await driver.findElement(By.id('push'));
  await push.click();
  await driver.wait(until.alertIsPresent(), 2000);
  alert = await driver.switchTo().alert();
  await alert.sendKeys("B");
  await alert.accept();

  // peek -> "B"
  const peekBtn = await driver.findElement(By.id('peek'));
  await peekBtn.click();
  const topEl = await driver.findElement(By.id('top_of_stack'));
  await driver.wait(until.elementTextIs(topEl, 'B'), 2000);

  // pop -> efter pop + peek ska det bli "A"
  const popBtn = await driver.findElement(By.id('pop'));
  await popBtn.click();
  await driver.wait(until.alertIsPresent(), 2000);
  alert = await driver.switchTo().alert();
  await alert.accept();

  await peekBtn.click();
  await driver.wait(until.elementTextIs(topEl, 'A'), 2000);
});
