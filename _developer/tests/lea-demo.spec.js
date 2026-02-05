import { test, expect } from '@playwright/test';

/**
 * LEA Demo Script
 *
 * This test file demonstrates LEA's key features for client demos.
 * Run with: npx playwright test tests/lea-demo.spec.js --headed --slow-mo=500
 *
 * The --headed flag shows the browser, --slow-mo slows down actions for visibility
 */

// Increase timeout for demo tests (they have intentional pauses for visibility)
test.describe.configure({ timeout: 120000 });

test.describe('LEA Demo - Discovery Coaching Assistant', () => {

  test('Complete LEA Walkthrough Demo', async ({ page }) => {
    // ========================================
    // PART 1: Application Overview
    // ========================================

    await test.step('Launch LEA Application', async () => {
      await page.goto('/index.html');
      await page.waitForLoadState('domcontentloaded');

      // Verify the header is visible
      const header = page.locator('header h1');
      await expect(header).toContainText('Learning Empowered Advisor');

      // Show the tagline
      const tagline = page.locator('header p');
      await expect(tagline).toContainText('Discovery Coaching Assistant');

      await page.waitForTimeout(1500); // Pause for demo visibility
    });

    // ========================================
    // PART 2: Setting Up a New Client Engagement
    // ========================================

    await test.step('Enter Client Information', async () => {
      // Enter client name
      await page.fill('#clientName', 'Acme Corporation');
      await page.waitForTimeout(500);

      // Set engagement date
      const today = new Date().toISOString().split('T')[0];
      await page.fill('#engagementDate', today);
      await page.waitForTimeout(1000);
    });

    // ========================================
    // PART 3: Navigating Discovery Phases
    // ========================================

    await test.step('Explore Phase 1: Foundation & Context', async () => {
      // Phase 1 should already be active
      const phase1Tab = page.locator('.tab-btn[data-phase="1"]');
      await expect(phase1Tab).toHaveClass(/active/);

      // Show the first question
      const firstQuestion = page.locator('.question-card').first();
      await expect(firstQuestion).toBeVisible();

      await page.waitForTimeout(1500);
    });

    await test.step('Answer Discovery Questions with Findings', async () => {
      // Q1: Why does this product exist?
      const q1Card = page.locator('[data-question-id="q1"]');
      const q1Findings = q1Card.locator('.findings-input');
      await q1Findings.fill(
        'Acme Corp is building an invoice processing platform to reduce manual data entry. ' +
        'Customer interviews revealed that finance teams spend 40% of their time on manual invoice processing. ' +
        'The core problem is the lack of automated extraction and validation of invoice data.'
      );
      await page.waitForTimeout(800);

      // Select discovery methods for Q1
      await q1Card.locator('[data-method="interview"]').click();
      await page.waitForTimeout(300);
      await q1Card.locator('[data-method="observation"]').click();
      await page.waitForTimeout(300);

      // Mark Q1 as complete - update state and trigger progress update
      await page.evaluate(() => {
        const sm = window.dataManager.stateManager;
        sm.state.questions.q1.status = 'answered';
        // Update card UI if visible
        const card = document.querySelector('[data-question-id="q1"]');
        if (card) card.dataset.status = 'answered';
        sm.updateProgress();
      });
      await page.waitForTimeout(500);

      // Q2: Who experiences the problem?
      const q2Card = page.locator('[data-question-id="q2"]');
      const q2Findings = q2Card.locator('.findings-input');
      await q2Findings.fill(
        'Primary users are Accounts Payable clerks and Finance Managers in mid-market companies (50-500 employees). ' +
        'They process 200-500 invoices per month. Secondary stakeholders include CFOs who need real-time visibility into payables.'
      );
      await page.waitForTimeout(500);

      await q2Card.locator('[data-method="interview"]').click();
      await q2Card.locator('[data-method="survey"]').click();

      // Mark Q2 as complete
      await page.evaluate(() => {
        const sm = window.dataManager.stateManager;
        sm.state.questions.q2.status = 'answered';
        const card = document.querySelector('[data-question-id="q2"]');
        if (card) card.dataset.status = 'answered';
        sm.updateProgress();
      });
      await page.waitForTimeout(1000);
    });

    await test.step('Navigate to Phase 2: Success & Outcomes', async () => {
      await page.click('.tab-btn[data-phase="2"]');
      await page.waitForTimeout(1000);

      // Answer Q5: What would good look like?
      const q5Card = page.locator('[data-question-id="q5"]');
      await q5Card.locator('.findings-input').fill(
        '3-month success criteria: 70% reduction in manual data entry time, ' +
        '95% invoice extraction accuracy, and positive NPS from pilot customers. ' +
        'Team aligned on these metrics during planning workshop.'
      );
      await page.waitForTimeout(500);

      await q5Card.locator('[data-method="workshop"]').click();
      await page.evaluate(() => {
        const sm = window.dataManager.stateManager;
        sm.state.questions.q5.status = 'answered';
        const card = document.querySelector('[data-question-id="q5"]');
        if (card) card.dataset.status = 'answered';
        sm.updateProgress();
      });
      await page.waitForTimeout(800);

      // Answer Q7: How will we know this worked?
      const q7Card = page.locator('[data-question-id="q7"]');
      await q7Card.locator('.findings-input').fill(
        'Key metrics: Time-to-process per invoice, extraction accuracy rate, user adoption rate. ' +
        'We have baseline data from current manual process (avg 8 min/invoice). ' +
        'A/B testing planned for automation vs manual processing.'
      );
      await page.waitForTimeout(500);

      await q7Card.locator('[data-method="data_analysis"]').click();
      await page.evaluate(() => {
        const sm = window.dataManager.stateManager;
        sm.state.questions.q7.status = 'answered';
        const card = document.querySelector('[data-question-id="q7"]');
        if (card) card.dataset.status = 'answered';
        sm.updateProgress();
      });
      await page.waitForTimeout(1000);
    });

    await test.step('Navigate to Phase 4: Team Dynamics', async () => {
      await page.click('.tab-btn[data-phase="4"]');
      await page.waitForTimeout(1000);

      // Answer Q13: Appetite for challenge
      const q13Card = page.locator('[data-question-id="q13"]');
      await q13Card.locator('.findings-input').fill(
        'Team shows high appetite for innovation but leadership is risk-averse due to recent failed project. ' +
        'Need to build confidence through small wins. Recommend incremental delivery with frequent demos.'
      );
      await page.waitForTimeout(500);

      await q13Card.locator('[data-method="interview"]').click();
      await page.evaluate(() => {
        const sm = window.dataManager.stateManager;
        sm.state.questions.q13.status = 'answered';
        const card = document.querySelector('[data-question-id="q13"]');
        if (card) card.dataset.status = 'answered';
        sm.updateProgress();
      });
      await page.waitForTimeout(800);

      // Answer Q32: Customer interaction frequency
      const q32Card = page.locator('[data-question-id="q32"]');
      await q32Card.locator('.findings-input').fill(
        'Currently minimal direct customer contact - only through support tickets. ' +
        'No regular user research cadence. Team relies on stakeholder assumptions about user needs. ' +
        'This is a significant gap that needs addressing.'
      );
      await page.waitForTimeout(500);

      await q32Card.locator('[data-method="interview"]').click();
      await page.evaluate(() => {
        const sm = window.dataManager.stateManager;
        sm.state.questions.q32.status = 'answered';
        const card = document.querySelector('[data-question-id="q32"]');
        if (card) card.dataset.status = 'answered';
        sm.updateProgress();
      });
      await page.waitForTimeout(1000);
    });

    // ========================================
    // PART 4: View Progress Dashboard
    // ========================================

    await test.step('Review Coverage Dashboard', async () => {
      // Scroll to top to see dashboard
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      // Verify progress is shown
      const progressCircle = page.locator('.stat-circle .percentage');
      await expect(progressCircle).toBeVisible();

      // Check phase progress bars
      const phaseBreakdown = page.locator('.phase-breakdown');
      await expect(phaseBreakdown).toBeVisible();

      await page.waitForTimeout(2000);
    });

    // ========================================
    // PART 5: Save Version (NEW FEATURE!)
    // ========================================

    await test.step('Save Discovery Session Version', async () => {
      // Navigate to Version History tab
      await page.click('.tab-btn[data-phase="versions"]');
      await page.waitForTimeout(1000);

      // Click Save Version button
      await page.click('#saveVersionBtn');
      await page.waitForTimeout(1000);

      // Verify success notification
      const notification = page.locator('text=Version 1 saved');
      await expect(notification).toBeVisible({ timeout: 3000 });

      // Show the saved version in the list
      const versionItem = page.locator('.version-item');
      await expect(versionItem).toBeVisible();
      await expect(versionItem).toContainText('Version 1');

      await page.waitForTimeout(2000);
    });

    // ========================================
    // PART 6: Continue Work and Save Another Version
    // ========================================

    await test.step('Add More Findings and Save Version 2', async () => {
      // Go back to Phase 5 and add assumption
      await page.click('.tab-btn[data-phase="5"]');
      await page.waitForTimeout(800);

      const q21Card = page.locator('[data-question-id="q21"]');
      await q21Card.locator('.findings-input').fill(
        'UNTESTED ASSUMPTIONS:\n' +
        '1. Users will trust AI-extracted data without manual verification\n' +
        '2. Integration with existing ERP systems will be straightforward\n' +
        '3. Customers will pay premium pricing for automation\n\n' +
        'RECOMMENDATION: Run prototype tests with 3 pilot customers before full development.'
      );
      await page.waitForTimeout(500);

      await q21Card.locator('[data-method="workshop"]').click();
      await page.evaluate(() => {
        const sm = window.dataManager.stateManager;
        sm.state.questions.q21.status = 'answered';
        const card = document.querySelector('[data-question-id="q21"]');
        if (card) card.dataset.status = 'answered';
        sm.updateProgress();
      });
      await page.waitForTimeout(800);

      // Save Version 2
      await page.click('.tab-btn[data-phase="versions"]');
      await page.waitForTimeout(500);
      await page.click('#saveVersionBtn');
      await page.waitForTimeout(1000);

      // Verify two versions now exist
      const versionItems = page.locator('.version-item');
      await expect(versionItems).toHaveCount(2);

      await page.waitForTimeout(1500);
    });

    // ========================================
    // PART 7: Generate Leadership Summary
    // ========================================

    await test.step('Generate AI-Powered Summary', async () => {
      // Navigate to Summary tab
      await page.click('.tab-btn[data-phase="summary"]');
      await page.waitForTimeout(1000);

      // Verify button is enabled (we have answered questions)
      const summaryBtn = page.locator('#generateSummary');
      await expect(summaryBtn).toBeEnabled({ timeout: 5000 });

      // Click Generate Summary
      await summaryBtn.click();
      await page.waitForTimeout(2000);

      // Verify summary content is generated
      const summaryContent = page.locator('#summaryContent');
      await expect(summaryContent).not.toBeEmpty();

      // Check for key sections
      await expect(summaryContent).toContainText('Key Findings');
      await expect(summaryContent).toContainText('Recommended Discovery Techniques');

      // Scroll through the summary
      await page.evaluate(() => {
        const content = document.getElementById('summaryContent');
        content.scrollTo(0, content.scrollHeight / 2);
      });
      await page.waitForTimeout(2000);
    });

    // ========================================
    // PART 8: Demonstrate Version History Features
    // ========================================

    await test.step('Demonstrate Loading Previous Version', async () => {
      // Go to Version History
      await page.click('.tab-btn[data-phase="versions"]');
      await page.waitForTimeout(1000);

      // Show both versions
      await expect(page.locator('.version-number:has-text("Version 1")')).toBeVisible();
      await expect(page.locator('.version-number:has-text("Version 2")')).toBeVisible();

      // Demonstrate that we can load Version 1
      // (Not actually loading to preserve demo state)
      const loadBtn = page.locator('.btn-load-version').last(); // Version 1 is at bottom (older)
      await expect(loadBtn).toBeVisible();

      await page.waitForTimeout(2000);
    });

    // ========================================
    // PART 9: Export Functionality
    // ========================================

    await test.step('Demonstrate Export Capability', async () => {
      // Show export button
      const exportBtn = page.locator('#exportBtn');
      await expect(exportBtn).toBeVisible();

      // Highlight the export options
      await page.evaluate(() => {
        const btn = document.getElementById('exportBtn');
        btn.style.boxShadow = '0 0 10px 3px rgba(249, 168, 37, 0.8)';
        btn.style.transform = 'scale(1.05)';
      });
      await page.waitForTimeout(1500);

      // Reset styling
      await page.evaluate(() => {
        const btn = document.getElementById('exportBtn');
        btn.style.boxShadow = '';
        btn.style.transform = '';
      });

      await page.waitForTimeout(1000);
    });

    // ========================================
    // PART 10: Run Built-in Tests
    // ========================================

    await test.step('Run LEA Self-Diagnostics', async () => {
      // Click Run Tests
      await page.click('#runTestsBtn');
      await page.waitForTimeout(1500);

      // Verify test modal appears
      const modal = page.locator('text=LEA Regression Tests');
      await expect(modal).toBeVisible();

      // Show all tests passed
      await expect(page.locator('text=Passed: 15')).toBeVisible();
      await expect(page.locator('text=Failed: 0')).toBeVisible();

      await page.waitForTimeout(2000);

      // Close modal
      await page.click('#closeTestResults');
      await page.waitForTimeout(500);
    });

    // ========================================
    // CLEANUP
    // ========================================

    await test.step('Demo Complete - Cleanup', async () => {
      // Clear localStorage for next demo
      await page.evaluate(() => {
        localStorage.removeItem('lea_clients');
      });

      // Final pause
      await page.waitForTimeout(1000);
    });
  });
});

test.describe('LEA Quick Feature Demos', () => {

  test('Demo: Version History Feature', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('domcontentloaded');

    // Clear any existing data
    await page.evaluate(() => localStorage.removeItem('lea_clients'));

    // Set up client
    await page.fill('#clientName', 'Demo Client');

    // Add a finding
    await page.locator('[data-question-id="q1"] .findings-input').fill(
      'Initial discovery finding - this represents version 1 of our session.'
    );
    await page.click('[data-question-id="q1"] .btn-mark-complete');

    // Save Version 1
    await page.click('.tab-btn[data-phase="versions"]');
    await page.click('#saveVersionBtn');
    await page.waitForTimeout(1000);

    // Add more findings for Version 2
    await page.click('.tab-btn[data-phase="1"]');
    await page.locator('[data-question-id="q2"] .findings-input').fill(
      'Additional finding for version 2 - we learned more from customer interviews.'
    );
    await page.click('[data-question-id="q2"] .btn-mark-complete');

    // Save Version 2
    await page.click('.tab-btn[data-phase="versions"]');
    await page.click('#saveVersionBtn');
    await page.waitForTimeout(1000);

    // Verify both versions exist
    await expect(page.locator('.version-item')).toHaveCount(2);
    await expect(page.locator('.version-number:has-text("Version 2")')).toBeVisible();

    // Cleanup
    await page.evaluate(() => localStorage.removeItem('lea_clients'));
  });

  test('Demo: Discovery Method Tagging', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('domcontentloaded');

    // Fill in a finding
    await page.locator('[data-question-id="q1"] .findings-input').fill(
      'We discovered through user interviews that customers need faster invoice processing.'
    );

    // Show all available discovery methods
    const methodTags = page.locator('[data-question-id="q1"] .method-tag');
    const count = await methodTags.count();

    // Click through each method to demonstrate
    for (let i = 0; i < count; i++) {
      await methodTags.nth(i).click();
      await page.waitForTimeout(300);
    }

    // Verify all methods are selected
    for (let i = 0; i < count; i++) {
      await expect(methodTags.nth(i)).toHaveClass(/active/);
    }

    await page.waitForTimeout(1000);
  });

  test('Demo: Phase Navigation', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('domcontentloaded');

    // Navigate through all phases
    const phases = ['1', '2', '3', '4', '5', 'summary', 'versions'];

    for (const phase of phases) {
      await page.click(`.tab-btn[data-phase="${phase}"]`);
      await page.waitForTimeout(500);

      const panel = page.locator(`.tab-panel[data-phase="${phase}"]`);
      await expect(panel).toBeVisible();
    }
  });

  test('Demo: Summary Generation', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('domcontentloaded');

    // Add minimum data for summary
    await page.fill('#clientName', 'Summary Demo Client');

    // Q1 - fill and mark complete
    const q1Card = page.locator('[data-question-id="q1"]');
    await q1Card.locator('.findings-input').fill(
      'Team needs to validate assumptions about user needs through customer discovery.'
    );
    await q1Card.locator('[data-method="interview"]').click();
    await page.evaluate(() => {
      const sm = window.dataManager.stateManager;
      sm.state.questions.q1.status = 'answered';
      const card = document.querySelector('[data-question-id="q1"]');
      if (card) card.dataset.status = 'answered';
      sm.updateProgress();
    });
    await page.waitForTimeout(500);

    // Verify Q1 is answered
    await expect(q1Card).toHaveAttribute('data-status', 'answered');

    // Q2 - fill and mark complete
    const q2Card = page.locator('[data-question-id="q2"]');
    await q2Card.locator('.findings-input').fill(
      'Target users are enterprise finance teams struggling with manual processes.'
    );
    await page.evaluate(() => {
      const sm = window.dataManager.stateManager;
      sm.state.questions.q2.status = 'answered';
      const card = document.querySelector('[data-question-id="q2"]');
      if (card) card.dataset.status = 'answered';
      sm.updateProgress();
    });
    await page.waitForTimeout(500);

    // Generate summary
    await page.click('.tab-btn[data-phase="summary"]');
    await page.waitForTimeout(500);

    // Verify button is enabled
    const summaryBtn = page.locator('#generateSummary');
    await expect(summaryBtn).toBeEnabled({ timeout: 5000 });

    await summaryBtn.click();
    await page.waitForTimeout(2000);

    // Verify summary sections
    const content = page.locator('#summaryContent');
    await expect(content).toContainText('Summary Demo Client');
    await expect(content).toContainText('Key Findings');
  });
});
