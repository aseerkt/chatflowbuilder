import { test } from '@playwright/test'

test('chatbot flow create', async ({ page }) => {
  await page.goto('/')

  const flowPlane = page.locator('.react-flow__pane')
  await page.getByRole('option', { name: 'Message' }).dragTo(flowPlane)

  await flowPlane
    .getByTestId(/rf__node-textNode/)
    .getByRole('button', { name: 'Send message test message' })
    .click()

  await page.getByLabel('Text').fill('hello world')

  await page.getByLabel('Back to node panel').click()

  await page.getByRole('option', { name: 'Message' }).dragTo(flowPlane)

  await flowPlane
    .getByTestId(/rf__node-textNode/)
    .getByRole('button', { name: 'Send message test message' })
    .click()

  await page.getByLabel('Text').fill('goodbye world')

  await page.getByLabel('Back to node panel').click()

  // TODO: connecting two nodes by edge
})
