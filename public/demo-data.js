// AlsaTalk Demo Suite - Complete Data for All 8 Demos
const demoData = {
  1: {
    icon: 'zap',
    title: 'Cross-Department Workflow Orchestration',
    subtitle: 'Multi-system contract approval across Legal, Finance, Procurement with AI coordination',
    traditional: '48 hours',
    alsatalk: '8 minutes',
    saved: '99%',
    color: 'primary',
    overview: {
      scenario: 'VP Says: "Process Contract Approval for Acme Corp $500K Deal"',
      challenge: 'Traditional contract approval requires 48 hours of manual coordination across Legal (contract review), Finance (credit check), Procurement (compliance), and Executive sign-off. Each department uses different systems, causing delays, errors, and deal slippage.',
      solution: 'AlsaTalk AI orchestrates 5 specialized agents across 8 systems simultaneously - completing the entire workflow in 8 minutes with zero errors.',
      systems: ['DocuSign', 'Legal Database', 'SAP ERP', 'Banking Systems', 'Supplier Portal', 'Salesforce CRM', 'Slack', 'Email & Calendar']
    },
    steps: [
      {
        title: 'Voice Command Processing',
        description: 'AI interprets complex multi-department request',
        icon: 'mic',
        color: 'success',
        details: [
          '<strong>Speaker:</strong> Sarah Chen (VP Sales)',
          '<strong>Command:</strong> "Process the contract approval for Acme Corp. It\'s a $500K annual deal, standard enterprise terms."',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>AI Analysis:</strong></div>',
          '✓ Voice authenticated via biometrics',
          '✓ Intent: CONTRACT_APPROVAL_WORKFLOW',
          '✓ Entity: Acme Corp',
          '✓ Value: $500,000 ARR',
          '✓ Contract Type: Enterprise Standard',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Workflow Requirements Identified:</strong></div>',
          '• Legal review',
          '• Finance approval',
          '• Procurement setup',
          '• Executive sign-off',
          '<strong>Estimated departments:</strong> 4',
          '<strong>Traditional time:</strong> 2-3 days',
          '<strong>AlsaTalk automated time:</strong> ~8 minutes'
        ]
      },
      {
        title: 'Multi-Agent Orchestration Engine',
        description: 'AI deploys specialized agents across systems',
        icon: 'cpu',
        color: 'accent',
        details: [
          '<strong>Agents Deployed:</strong>',
          '✓ Legal Agent → DocuSign + Legal Database',
          '✓ Finance Agent → SAP ERP + Banking Systems',
          '✓ Procurement Agent → Supplier Portal + Contract Management',
          '✓ CRM Agent → Salesforce Opportunity Management',
          '✓ Communication Agent → Slack + Email + Calendar',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Parallel Processing:</strong></div>',
          '→ 5 agents running simultaneously',
          '→ 8 systems being accessed',
          '→ Real-time dependency mapping active',
          '→ Auto-escalation protocols enabled'
        ]
      },
      {
        title: 'Legal Agent - Contract Generation',
        description: 'AI generates contract from template, flags legal issues',
        icon: 'file-text',
        color: 'primary',
        details: [
          '<strong>Template Used:</strong> Enterprise SaaS Master Agreement v4.2',
          '<strong>Customer:</strong> Acme Manufacturing Corp',
          '<strong>Contract Value:</strong> $500,000/year',
          '<strong>Term:</strong> 36 months with auto-renewal',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Auto-populated fields:</strong></div>',
          '• Customer legal entity (retrieved from state database)',
          '• Billing address (from CRM)',
          '• Technical specifications (from opportunity notes)',
          '• Service level agreements (standard 99.9% uptime)',
          '• Payment terms (Net 30)',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong class="text-accent">AI Legal Review Findings:</strong></div>',
          '✓ No conflicts with existing contracts',
          '✓ Customer is not on sanctions list',
          '<span class="text-accent">⚠️ Note: Customer requested data residency in EU - clause added automatically</span>',
          '✓ Liability cap appropriate for deal size',
          '✓ Indemnification language compliant',
          '<div class="mt-3 pt-3 border-t border-primary/20"></div>',
          '<strong>Document Status:</strong> Ready for signature',
          '<strong>DocuSign envelope created:</strong> ENV-2025-48392'
        ]
      },
      {
        title: 'Finance Agent - Credit Check',
        description: 'Real-time financial due diligence',
        icon: 'dollar-sign',
        color: 'accent',
        details: [
          '<strong>Credit Check (Dun & Bradstreet):</strong>',
          'Company: Acme Manufacturing Corp',
          'D&B Rating: 4A1 (Excellent)',
          'Credit Limit Recommended: $750,000',
          'Payment History: Excellent (0 days late avg)',
          'Financial Strength: High',
          'Risk Score: Low (12/100)',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>SAP ERP - Account Setup:</strong></div>',
          '✓ Customer #: CUST-2025-8847',
          '✓ Payment Terms: Net 30 (approved)',
          '✓ Credit Limit: $750,000 (approved automatically)',
          '✓ Billing Cycle: Annual, paid upfront',
          '✓ Discount: 5% (multi-year commitment)',
          '✓ Net Contract Value: $475,000/year',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Finance Approval:</strong></div>',
          'Deal ROI: 320% (projected 3-year)',
          'CAC Payback: 8 months',
          '<strong class="text-success">Status: AUTO-APPROVED</strong> (under $1M threshold)',
          'CFO notification: Sent for records'
        ]
      },
      {
        title: 'Procurement - Compliance',
        description: 'Customer provisioned in procurement systems',
        icon: 'building',
        color: 'primary',
        details: [
          '<strong>Supplier Management System:</strong>',
          'Vendor Record Created: VNDR-8847',
          'Category: Strategic Customer',
          'Tier: Enterprise (Platinum)',
          'Compliance Status: Verified',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Compliance Checks Completed:</strong></div>',
          '✓ KYC (Know Your Customer): Passed',
          '✓ AML (Anti-Money Laundering): Cleared',
          '✓ OFAC Sanctions Screening: Clear',
          '✓ GDPR Data Processing Agreement: Executed',
          '✓ SOC 2 Type II Audit Report: Shared',
          '✓ Cyber Insurance Certificate: Verified ($10M coverage)',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Procurement Workflow:</strong></div>',
          'Purchase Order: PO-2025-9483',
          'Delivery Terms: SaaS - Immediate Activation',
          'Support Level: Premium 24/7',
          'Onboarding Date: Oct 15, 2025'
        ]
      },
      {
        title: 'AI Executive Approval Call',
        description: 'Voice call to CEO for final sign-off',
        icon: 'phone',
        color: 'success',
        details: [
          '<strong>Call Duration:</strong> 1:35',
          '<strong>Status:</strong> <span class="text-success">CONNECTED</span>',
          '<div class="mt-3 p-4 bg-black/20 rounded space-y-2 text-sm">',
          '<p class="italic"><strong class="text-success not-italic">AI Agent:</strong> "Hi John, this is AlsaTalk calling on behalf of Sarah Chen. I need your executive approval for the Acme Manufacturing contract - $475K annual, 3-year term."</p>',
          '<p class="italic"><strong class="text-primary not-italic">John (CEO):</strong> "Acme Manufacturing? Give me the quick summary."</p>',
          '<p class="italic"><strong class="text-success not-italic">AI Agent:</strong> "500-employee manufacturer, 4A1 credit rating, excellent payment history. Finance approved it automatically. Legal cleared the contract. It\'s a strategic account with 320% projected ROI."</p>',
          '<p class="italic"><strong class="text-primary not-italic">John:</strong> "Any red flags?"</p>',
          '<p class="italic"><strong class="text-success not-italic">AI Agent:</strong> "None. They requested EU data residency which we added. All compliance checks passed. They\'re ready to sign today."</p>',
          '<p class="italic"><strong class="text-primary not-italic">John:</strong> "Sounds good. Approved."</p>',
          '</div>'
        ]
      },
      {
        title: 'Document Execution',
        description: 'AI orchestrates signing, updates 8 systems',
        icon: 'check-circle',
        color: 'accent',
        details: [
          '<strong>DocuSign Executed:</strong>',
          'Envelope: ENV-2025-48392',
          'Signers: John Mitchell (CEO) - ✓ Signed via voice approval',
          'Acme Corp signatory: David Park (CTO) - ⏳ Signature request sent',
          'Expected signature: Within 2 hours',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Systems Updated (Parallel):</strong></div>',
          '1. Salesforce: Opportunity "Acme Corp - Enterprise" → Closed Won ($475K)',
          '2. SAP ERP: Customer account activated, invoice INV-2025-10999 generated',
          '3. Billing System: Subscription scheduled (annual, Oct 15 start)',
          '4. Legal Database: Contract filed, compliance docs attached',
          '5. Procurement: Vendor record updated to "Active Customer"',
          '6. Support Portal: Premium tier access provisioned',
          '7. Product Platform: Workspace created (acmecorp.alsatalk.com)',
          '8. Calendar: Kickoff meeting scheduled (Oct 15, 10 AM)',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Notifications Sent:</strong></div>',
          '• Sarah Chen (VP Sales): "Deal closed! Great work."',
          '• Finance Team: "New $475K ARR added to Q4"',
          '• Legal: "Contract executed, filed in repository"',
          '• Customer Success: "New enterprise onboarding - Acme Corp"',
          '• CEO: "Executive approval recorded, contract signed"'
        ]
      },
      {
        title: 'Summary Report',
        description: 'AI compiles comprehensive workflow summary',
        icon: 'bar-chart',
        color: 'success',
        details: [
          '<strong>Process:</strong> Contract Approval - Acme Manufacturing Corp',
          '<strong>Initiated:</strong> Oct 1, 2025 2:15 PM',
          '<strong>Completed:</strong> Oct 1, 2025 2:23 PM',
          '<strong>Total Duration:</strong> 8 minutes',
          '<strong>Traditional Duration:</strong> 48 hours (95% reduction)',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Departments Coordinated:</strong></div>',
          '✓ Sales - Opportunity management',
          '✓ Legal - Contract review & generation',
          '✓ Finance - Credit check & approval',
          '✓ Procurement - Vendor setup & compliance',
          '✓ Executive - Final sign-off',
          '✓ Customer Success - Onboarding initiated',
          '<div class="mt-3 pt-3 border-t border-success/20"></div>',
          '<strong>Systems Integrated:</strong> 8',
          '<strong>Documents Generated:</strong> 12',
          '<strong>Approvals Obtained:</strong> 3 (auto + executive)',
          '<strong>Compliance Checks:</strong> 6/6 passed'
        ]
      }
    ],
    impact: {
      metrics: [
        { label: 'Time Saved', value: '99%', color: 'success' },
        { label: 'Systems Integrated', value: '8', color: 'primary' },
        { label: 'Error Rate', value: '0%', color: 'success' },
        { label: 'Speed Multiplier', value: '360×', color: 'accent' }
      ],
      businessValue: 'Multi-agent AI orchestration eliminated 48 hours of cross-department coordination, manual handoffs, and error-prone data entry. Legal, Finance, Procurement, and Executive teams seamlessly aligned through 8 integrated systems. With 1000 deals/year, this saves 48,000 hours ($4.8M in productivity) and eliminates contract delays that cost deals.',
      roi: [
        { metric: 'Annual Deals', value: '1,000' },
        { metric: 'Hours Saved/Year', value: '48,000' },
        { metric: 'Cost Savings', value: '$4.8M' },
        { metric: 'Revenue Protected', value: '$25M+' }
      ]
    }
  },

  2: {
    icon: 'package',
    title: 'Real-Time Inventory Crisis Management',
    subtitle: 'Customer emergency - AI finds alternatives across 12 warehouses in real-time',
    traditional: '4 hours',
    alsatalk: '90 seconds',
    saved: '98%',
    color: 'danger',
    overview: {
      scenario: 'Customer Emergency: Critical Part Out of Stock - Production Line Down',
      challenge: 'Traditional inventory searches require manual calls to multiple warehouses, checking each system separately. By the time alternative stock is found (if at all), the customer has often gone to a competitor. Production downtime costs $2,500/hour.',
      solution: 'AlsaTalk AI queries 12 warehouse ERPs simultaneously in 0.8 seconds, finds alternatives, modifies orders, upgrades shipping, and notifies all stakeholders - all while the customer is still on the phone.',
      systems: ['12 Warehouse ERPs', 'Order Management System', 'Shipping Platform (FedEx/UPS)', 'CRM', 'SMS Gateway', 'Email System']
    },
    steps: [
      {
        title: 'Inbound Emergency Call',
        description: 'Production line down - critical part needed',
        icon: 'phone-call',
        color: 'danger',
        details: [
          '<strong>Call Type:</strong> <span class="text-danger">URGENT - Production Emergency</span>',
          '<strong>Caller:</strong> Tom Chen (Production Manager, TechManufacturing Inc)',
          '<strong>Customer Priority:</strong> Tier 1 - Strategic Account',
          '<div class="mt-3 p-4 bg-danger/10 rounded border border-danger/30">',
          '<p class="font-semibold mb-2">Call Transcript:</p>',
          '<p class="italic">"We need part #A8472 immediately! Our assembly line is down and we ordered 500 units but your system shows out of stock! We\'re losing $2,500 per hour. Can you help?"</p>',
          '</div>',
          '<div class="mt-3"><strong>AI Detection:</strong></div>',
          '✓ Keyword: "immediately", "assembly line down"',
          '✓ Urgency Level: CRITICAL',
          '✓ Part Number: #A8472',
          '✓ Quantity Needed: 500 units',
          '✓ Cost of Delay: $2,500/hour',
          '<strong>AI Action:</strong> Initiating Multi-Warehouse Search Protocol'
        ]
      },
      {
        title: 'Multi-Warehouse Scan',
        description: 'AI queries 12 warehouse ERPs in 0.8 seconds',
        icon: 'search',
        color: 'accent',
        details: [
          '<strong>Search Parameters:</strong>',
          'Part Number: #A8472',
          'Quantity Required: 500 units minimum',
          'Warehouses Queried: 12 (across 8 countries)',
          'Query Execution Time: 0.8 seconds',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Warehouse Results:</strong></div>',
          '1. Chicago, IL: <span class="text-danger">0 units</span>',
          '2. Los Angeles, CA: <span class="text-danger">0 units</span>',
          '3. Dallas, TX: <span class="text-success font-bold">✓ 320 units AVAILABLE</span>',
          '4. Miami, FL: <span class="text-danger">0 units</span>',
          '5. Toronto, Canada: <span class="text-success font-bold">✓ 180 units AVAILABLE</span>',
          '6. London, UK: <span class="text-danger">0 units</span>',
          '7. Frankfurt, Germany: <span class="text-accent">45 units</span>',
          '8. Singapore: <span class="text-success font-bold">✓ 210 units AVAILABLE</span>',
          '9. Tokyo, Japan: <span class="text-danger">0 units</span>',
          '10. Sydney, Australia: <span class="text-danger">0 units</span>',
          '11. Mexico City: <span class="text-accent">95 units</span>',
          '12. São Paulo, Brazil: <span class="text-danger">0 units</span>',
          '<div class="mt-4 p-4 bg-success/20 rounded border border-success/30">',
          '<p class="text-lg font-bold text-success">SOLUTION FOUND!</p>',
          '<p class="mt-2"><strong>Total Available:</strong> 850 units across 5 warehouses</p>',
          '<p><strong>Best Option:</strong> Dallas (320) + Toronto (180) = 500 units</p>',
          '</div>'
        ]
      },
      {
        title: 'Solution Execution',
        description: 'Automated order modification and expedited shipping',
        icon: 'truck',
        color: 'success',
        details: [
          '<strong>Proposed Solution:</strong>',
          'Source 1: Dallas warehouse - 320 units',
          'Source 2: Toronto warehouse - 180 units',
          'Total: 500 units (meets requirement)',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Order Modifications:</strong></div>',
          '✓ Original Order: CHI-warehouse (out of stock) → <strong>CANCELLED</strong>',
          '✓ New Order 1: DAL-warehouse - 320 units',
          '✓ New Order 2: TOR-warehouse - 180 units',
          '✓ Shipping Upgrade: Standard 3-day → Next-Day Air (complimentary)',
          '✓ Order Priority: RUSH (flagged in system)',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Delivery Details:</strong></div>',
          'Ship Date: Today, 4:00 PM',
          'Carrier: FedEx Priority Overnight',
          'ETA: Tomorrow, 10:00 AM',
          'Tracking #: FX7382947263 (Dallas), FX7382947264 (Toronto)',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Customer Notifications:</strong></div>',
          '✓ SMS sent: "Part #A8472 found! 500 units shipping today, arrive tomorrow 10 AM"',
          '✓ Email with tracking numbers sent',
          '✓ Voice update: "Hi Tom, we found your parts and expedited shipping..."',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Production Schedule Updated:</strong></div>',
          'Assembly Line Restart: Tomorrow, 10:30 AM',
          'Estimated Downtime Saved: 72 hours',
          'Cost Avoidance: $180,000 (72 hours × $2,500/hour)'
        ]
      }
    ],
    impact: {
      metrics: [
        { label: 'Loss Prevented', value: '$180K', color: 'success' },
        { label: 'Time Saved', value: '98%', color: 'primary' },
        { label: 'Warehouses Scanned', value: '12', color: 'accent' },
        { label: 'Resolution Speed', value: '90 sec', color: 'success' }
      ],
      businessValue: 'Multi-warehouse inventory visibility prevented catastrophic production downtime. AI orchestrated real-time queries across global ERP systems, found alternative stock, modified orders, upgraded shipping, and notified all stakeholders - all while customer was still on the phone.',
      roi: [
        { metric: 'Crisis Events/Year', value: '120' },
        { metric: 'Avg Loss Prevented', value: '$150K' },
        { metric: 'Annual Savings', value: '$18M' },
        { metric: 'Customer Retention', value: '95%+' }
      ]
    }
  },

  3: {
    icon: 'calculator',
    title: 'Multi-System Account Reconciliation',
    subtitle: 'Month-end close: AI reconciles CRM deals vs ERP invoices vs bank deposits',
    traditional: '2 weeks',
    alsatalk: '15 minutes',
    saved: '99.3%',
    color: 'secondary',
    overview: {
      scenario: 'Month-End Financial Close: Reconcile 2,847 Transactions Across 5 Systems',
      challenge: 'Traditional reconciliation requires finance teams to manually export data from Salesforce, SAP, QuickBooks, Stripe, and bank statements, then match transactions in spreadsheets. This takes 2 weeks, delays financial reporting, and creates 15-20% error rates due to manual data entry.',
      solution: 'AlsaTalk AI connects to all 5 systems simultaneously, auto-matches 98.3% of transactions in 15 minutes, flags discrepancies for review, and generates reconciliation reports - completing the entire month-end close process before lunch.',
      systems: ['Salesforce CRM', 'SAP ERP', 'QuickBooks', 'Stripe', 'Bank APIs', 'Excel/Google Sheets']
    },
    steps: [
      {
        title: 'Data Collection from 5 Systems',
        description: 'AI pulls transaction data from all platforms',
        icon: 'database',
        color: 'primary',
        details: [
          '<strong>Systems Accessed:</strong>',
          '1. Salesforce - Closed Won Opportunities (Q4 2025)',
          '2. SAP ERP - Invoices Generated',
          '3. QuickBooks - Payment Records',
          '4. Stripe - Transaction Logs',
          '5. Bank APIs - Deposit Confirmations',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Data Retrieved:</strong></div>',
          '✓ Salesforce: 342 Closed Won deals ($47.2M total ARR)',
          '✓ SAP ERP: 1,289 invoices issued ($48.1M billed)',
          '✓ QuickBooks: 1,156 payment records ($46.8M received)',
          '✓ Stripe: 892 transactions ($45.9M processed)',
          '✓ Bank: 168 deposits ($47.0M deposited)',
          '<strong>Total Records:</strong> 2,847 transactions',
          '<strong>Query Time:</strong> 2.3 minutes (vs 3 days manual)'
        ]
      },
      {
        title: 'AI Matching Algorithm',
        description: 'Machine learning matches transactions across systems',
        icon: 'link',
        color: 'accent',
        details: [
          '<strong>Matching Rules Applied:</strong>',
          '• Primary Key: Customer Name + Invoice Number',
          '• Secondary Key: Amount + Date (±3 days tolerance)',
          '• Fuzzy Matching: Company name variations (Inc, LLC, Corp, etc.)',
          '• Currency Conversion: Auto-convert FX rates',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Matching Results:</strong></div>',
          '<strong class="text-success">✓ AUTO-MATCHED: 2,798 transactions (98.3%)</strong>',
          'Perfect matches: 2,654 (93.2%)',
          'Fuzzy matches (high confidence): 144 (5.1%)',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong class="text-accent">⚠️ DISCREPANCIES DETECTED: 49 transactions (1.7%)</strong></div>',
          '• Missing invoices: 12 (Salesforce deal closed but no SAP invoice)',
          '• Payment mismatches: 23 (amount differences >$10)',
          '• Undeposited funds: 8 (payment received but not in bank)',
          '• Duplicates: 6 (possible double-billing)',
          '<strong>Processing Time:</strong> 8.4 minutes'
        ]
      },
      {
        title: 'Discrepancy Resolution',
        description: 'AI auto-resolves 45/49 issues, flags 4 for review',
        icon: 'check-circle',
        color: 'success',
        details: [
          '<strong>Auto-Resolved Issues:</strong>',
          '<div class="mt-2 space-y-2">',
          '<p>✓ <strong>Missing invoices (12):</strong> Found in SAP "Draft" status - auto-finalized</p>',
          '<p>✓ <strong>Payment mismatches (20/23):</strong> Rounding errors &lt;$10 - auto-corrected</p>',
          '<p>✓ <strong>Undeposited funds (7/8):</strong> Bank delay (weekend) - matched via pending deposits</p>',
          '<p>✓ <strong>Duplicates (6):</strong> Identified as multi-payment plans - split correctly</p>',
          '</div>',
          '<div class="mt-4 pt-4 border-t border-success/20"><strong class="text-danger">⚠️ FLAGGED FOR HUMAN REVIEW (4 items):</strong></div>',
          '1. <strong>Customer: GlobalTech Inc ($12,500 mismatch)</strong><br>   Salesforce: $500K ARR, SAP Invoice: $512,500<br>   <em>Note: Possible upsell not logged in CRM</em>',
          '2. <strong>Customer: Acme Manufacturing ($8,400 missing)</strong><br>   Invoice sent, payment not received (45 days overdue)<br>   <em>Action: Collections team notified</em>',
          '3. <strong>Customer: TechCorp ($15,000 duplicate?)</strong><br>   Two payments received for same invoice<br>   <em>Action: Refund or credit memo needed</em>',
          '4. <strong>Bank deposit ($11,600 unmatched)</strong><br>   Deposit with no corresponding invoice<br>   <em>Action: Finance to investigate source</em>',
          '<strong>Total Value Flagged:</strong> $47,500 (0.1% of $47M total)'
        ]
      },
      {
        title: 'Reconciliation Report',
        description: 'AI generates executive summary and audit trail',
        icon: 'file-text',
        color: 'primary',
        details: [
          '<strong>Executive Summary - Q4 2025 Reconciliation</strong>',
          '<div class="mt-2 grid grid-cols-2 gap-2 text-sm">',
          '<div><strong>Total Revenue:</strong> $47,234,892</div>',
          '<div><strong>Billed:</strong> $47,180,450 (99.9%)</div>',
          '<div><strong>Collected:</strong> $46,825,300 (99.1%)</div>',
          '<div><strong>Outstanding AR:</strong> $409,592</div>',
          '</div>',
          '<div class="mt-4 pt-4 border-t border-primary/20"><strong>Reconciliation Status:</strong></div>',
          '✓ Auto-matched: 2,798 transactions (98.3%)',
          '✓ Auto-resolved: 45 discrepancies',
          '⚠️ Manual review required: 4 items ($47,500)',
          '<div class="mt-4 pt-4 border-t border-primary/20"><strong>Time Savings:</strong></div>',
          'Traditional Process: 2 weeks (80 hours)',
          'AlsaTalk Process: 15 minutes',
          '<strong class="text-success">Time Saved: 99.3% (960 hours/year = $120K)</strong>',
          '<div class="mt-4 pt-4 border-t border-primary/20"><strong>Audit Trail:</strong></div>',
          '✓ All transactions logged with timestamps',
          '✓ Matching rules documented',
          '✓ System screenshots captured',
          '✓ Excel export generated for CFO review',
          '<strong>Report generated:</strong> reconciliation_Q4_2025.xlsx'
        ]
      }
    ],
    impact: {
      metrics: [
        { label: 'Time Saved', value: '99.3%', color: 'success' },
        { label: 'Transactions Matched', value: '2,798', color: 'primary' },
        { label: 'Auto-Resolve Rate', value: '91.8%', color: 'accent' },
        { label: 'Error Reduction', value: '95%', color: 'success' }
      ],
      businessValue: 'Automated reconciliation eliminates 2 weeks of manual spreadsheet work, reduces errors from 15-20% to <2%, and enables real-time financial visibility. Finance teams can close books on Day 1 instead of Day 15, accelerating investor reporting and strategic decision-making.',
      roi: [
        { metric: 'Hours Saved/Year', value: '960' },
        { metric: 'Cost Savings', value: '$120K' },
        { metric: 'Error Reduction', value: '95%' },
        { metric: 'Close Cycle Time', value: '93% faster' }
      ]
    }
  },

  4: {
    icon: 'target',
    title: 'Proactive Customer Churn Prevention',
    subtitle: 'AI detects usage decline 90 days before renewal, triggers retention before customer cancels',
    traditional: '30 days',
    alsatalk: '5 minutes',
    saved: '99.9%',
    color: 'accent',
    overview: {
      scenario: 'High-Value Account ($250K ARR) Showing 78% Churn Risk - 90 Days to Renewal',
      challenge: 'Traditional churn detection is reactive - companies only notice when the customer requests to cancel. By then, it\'s too late. Customer success teams lack real-time visibility into usage patterns, support issues, and sentiment shifts that indicate early warning signs of churn.',
      solution: 'AlsaTalk AI monitors product usage, support tickets, NPS scores, and engagement metrics in real-time. When multiple churn signals are detected (login ↓65%, usage ↓48%, support tickets ↑3×, NPS drop 9→4), the system automatically triggers a retention workflow - assigning a CSM, preparing a retention offer, and initiating proactive outreach.',
      systems: ['Product Analytics', 'Support Ticketing', 'NPS Survey Platform', 'CRM', 'Email Automation', 'Calendar Integration']
    },
    steps: [
      {
        title: 'Churn Risk Detection',
        description: 'AI analyzes 12 signals across 4 systems',
        icon: 'alert-triangle',
        color: 'danger',
        details: [
          '<strong>Customer: TechFlow Solutions</strong>',
          'ARR: $250,000 | Contract End: Jan 31, 2026 | Days to Renewal: 90',
          '<div class="mt-3 pt-3 border-t border-danger/20"><strong class="text-danger">⚠️ CHURN SIGNALS DETECTED:</strong></div>',
          '<strong>1. Usage Metrics (Product Analytics):</strong>',
          '   • Login frequency: ↓65% (from 850/mo to 300/mo)',
          '   • Active users: ↓48% (from 125 to 65)',
          '   • Feature adoption: ↓40% (key features unused)',
          '   • Data volume processed: ↓55%',
          '<strong>2. Support Indicators:</strong>',
          '   • Support tickets: ↑3× (from 2/mo to 6/mo)',
          '   • Ticket severity: 4 "Critical" issues in 30 days',
          '   • Resolution time: Avg 72 hours (SLA: 24 hours)',
          '   • Customer sentiment: Increasingly negative',
          '<strong>3. Engagement Signals:</strong>',
          '   • NPS Score: Dropped from 9 to 4 (Promoter → Detractor)',
          '   • Last CSM touchpoint: 45 days ago (recommended: 14 days)',
          '   • QBR attendance: Skipped last 2 meetings',
          '   • Champion (CTO) left company 60 days ago',
          '<strong>4. Competitive Indicators:</strong>',
          '   • LinkedIn activity: CTO now at competitor company',
          '   • G2 reviews: Researching alternatives',
          '<div class="mt-4 p-4 bg-danger/20 rounded border border-danger/30">',
          '<p class="text-xl font-bold text-danger">CHURN RISK SCORE: 78% (HIGH)</p>',
          '<p class="mt-2"><strong>Predicted Action:</strong> Will not renew (Jan 31, 2026)</p>',
          '<p><strong>Revenue at Risk:</strong> $250,000 ARR</p>',
          '<p><strong>Time to Act:</strong> 90 days</p>',
          '</div>'
        ]
      },
      {
        title: 'Automated Retention Workflow',
        description: 'AI orchestrates multi-touch intervention',
        icon: 'life-buoy',
        color: 'accent',
        details: [
          '<strong>Retention Workflow Triggered:</strong>',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>STEP 1: CSM Assignment (Immediate)</strong></div>',
          '✓ Account flagged as "At-Risk" in CRM',
          '✓ Senior CSM (Jessica Martinez) assigned automatically',
          '✓ Jessica notified via Slack + email: "URGENT: TechFlow at 78% churn risk"',
          '✓ AI-generated account brief sent with full context',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>STEP 2: Data-Driven Insights (2 min)</strong></div>',
          '✓ AI analyzed 90 days of product usage, support tickets, emails',
          '✓ <strong>Root Cause Identified:</strong>',
          '   • Primary: Champion (CTO) left company - new CTO unfamiliar with product',
          '   • Secondary: Integration breaking (API errors causing data sync issues)',
          '   • Tertiary: Lack of training for new users',
          '✓ <strong>Recommended Actions:</strong>',
          '   1. Schedule onboarding session with new CTO',
          '   2. Fix API integration (Engineering ticket auto-created)',
          '   3. Offer personalized training workshops',
          '   4. Provide 3-month usage credits as goodwill gesture',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>STEP 3: Retention Offer Prepared (3 min)</strong></div>',
          '✓ <strong>Offer Package Created:</strong>',
          '   • 20% discount on renewal ($200K instead of $250K)',
          '   • 3 months free usage credits ($62,500 value)',
          '   • Dedicated Technical Account Manager (TAM)',
          '   • Priority support upgrade (4-hour SLA)',
          '   • Custom integration development ($25K value)',
          '✓ <strong>Total Value:</strong> $87,500 in incentives',
          '✓ Approval obtained from VP Customer Success (auto-approved <$100K)',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>STEP 4: Outreach Initiated (5 min)</strong></div>',
          '✓ Email drafted by AI, reviewed and sent by Jessica',
          '✓ Calendar invite sent for "Executive Business Review"',
          '✓ Follow-up call scheduled with new CTO',
          '✓ Engineering team notified to prioritize API fix'
        ]
      },
      {
        title: 'Intervention Execution',
        description: 'CSM conducts data-driven retention call',
        icon: 'phone',
        color: 'success',
        details: [
          '<strong>Executive Business Review Call - TechFlow CTO</strong>',
          'Attendees: Jessica Martinez (CSM), New CTO (Michael Roberts)',
          'Duration: 45 minutes',
          '<div class="mt-3 p-4 bg-success/10 rounded border border-success/30">',
          '<p class="font-semibold mb-2">Call Summary:</p>',
          '<p class="italic">"Hi Michael, I\'m Jessica from AlsaTalk. I noticed some changes in how TechFlow is using our platform and wanted to make sure we\'re still delivering value. I see you joined as CTO recently - congrats! I\'d love to understand your priorities and ensure our platform aligns with your goals."</p>',
          '<p class="mt-2 italic"><strong>Michael:</strong> "Thanks for reaching out. To be honest, we\'ve been struggling. Our previous CTO set this up, and I\'m not fully up to speed. We\'ve also had some integration issues causing data sync problems."</p>',
          '<p class="mt-2 italic"><strong>Jessica:</strong> "I completely understand. Let me help. I\'ve scheduled dedicated onboarding sessions for you and your team, and our engineering team is already working on fixing the integration issues. We value your partnership and want to make sure you\'re successful."</p>',
          '<p class="mt-2 italic"><strong>Michael:</strong> "That would be great. We were actually considering switching vendors, but if you can help us get back on track, I\'d prefer to stick with AlsaTalk."</p>',
          '</div>',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Retention Offer Presented:</strong></div>',
          '✓ 20% renewal discount ($50K savings)',
          '✓ 3 months free usage credits',
          '✓ Dedicated TAM assigned',
          '✓ Priority support upgrade',
          '✓ Custom integration fixes at no charge',
          '<strong class="text-success">OUTCOME: Customer agreed to renew with revised contract</strong>'
        ]
      },
      {
        title: 'Outcome & Tracking',
        description: 'AI monitors progress and updates risk score',
        icon: 'trending-up',
        color: 'primary',
        details: [
          '<strong>30-Day Progress Update:</strong>',
          '<div class="mt-2 space-y-2">',
          '<p>✓ <strong>API Integration Fixed:</strong> Data sync issues resolved (Week 1)</p>',
          '<p>✓ <strong>Onboarding Completed:</strong> CTO and 15 team members trained (Week 2)</p>',
          '<p>✓ <strong>Usage Recovering:</strong> Login frequency ↑120% (back to baseline)</p>',
          '<p>✓ <strong>Support Tickets:</strong> Down to 1/mo (critical issues resolved)</p>',
          '<p>✓ <strong>NPS Score:</strong> Improved from 4 → 8 (Detractor → Promoter)</p>',
          '<p>✓ <strong>Renewal Contract:</strong> Signed on Dec 15 (45 days early!)</p>',
          '</div>',
          '<div class="mt-4 p-4 bg-success/20 rounded border border-success/30">',
          '<p class="text-xl font-bold text-success">✓ CHURN PREVENTED</p>',
          '<p class="mt-2"><strong>Churn Risk Score:</strong> 78% → 12% (LOW)</p>',
          '<p><strong>Revenue Saved:</strong> $250,000 ARR (+ $200K renewal)</p>',
          '<p><strong>Customer Lifetime Value:</strong> +$750K (3-year projection)</p>',
          '<p><strong>Intervention Cost:</strong> $12,500 (ROI: 1,900%)</p>',
          '</div>',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>AI Insights Applied Company-Wide:</strong></div>',
          '✓ 47 other accounts identified with similar risk patterns',
          '✓ Proactive outreach initiated for all at-risk customers',
          '✓ Product team notified of common integration issues',
          '✓ Onboarding process updated to prevent future churn'
        ]
      }
    ],
    impact: {
      metrics: [
        { label: 'Revenue Saved', value: '$250K', color: 'success' },
        { label: 'Early Detection', value: '90 days', color: 'primary' },
        { label: 'Success Rate', value: '85%', color: 'accent' },
        { label: 'ROI', value: '1,900%', color: 'success' }
      ],
      businessValue: 'Proactive churn prevention transforms customer success from reactive firefighting to predictive relationship management. By detecting early warning signs 90 days before renewal, companies have time to address root causes, demonstrate value, and save high-value accounts. This drives Net Revenue Retention from 95% to 118%.',
      roi: [
        { metric: 'Accounts Saved/Year', value: '120' },
        { metric: 'ARR Protected', value: '$30M' },
        { metric: 'NRR Improvement', value: '95% → 118%' },
        { metric: 'Intervention Cost', value: '$1.5M' }
      ]
    }
  },

  5: {
    icon: 'trending-up',
    title: 'Sales Lead Follow-Up Automation',
    subtitle: 'AI captures leads, researches companies, drafts emails, logs CRM, schedules calls - end-to-end',
    traditional: '3.5 hours',
    alsatalk: '5 minutes',
    saved: '95%',
    color: 'success',
    overview: {
      scenario: 'Inbound Lead from Website Form: "Request Demo" - Company: DataFlow Analytics',
      challenge: 'Traditional lead follow-up requires sales reps to manually: (1) Check CRM for duplicates, (2) Research company on LinkedIn/Crunchbase, (3) Draft personalized email, (4) Log activity in Salesforce, (5) Schedule follow-up call. This takes 3.5 hours per lead, causing 60-70% of inbound leads to go cold before first contact.',
      solution: 'AlsaTalk AI captures the lead from the website, automatically researches the company (revenue, employees, funding, tech stack), drafts a personalized email with context-specific insights, creates a Salesforce opportunity, and places a voice call to schedule a demo - all within 5 minutes of form submission.',
      systems: ['Website Forms', 'Salesforce CRM', 'LinkedIn Sales Navigator', 'Crunchbase', 'Email Platform', 'Calendar', 'Voice AI']
    },
    steps: [
      {
        title: 'Lead Capture & Enrichment',
        description: 'AI captures form submission and enriches data',
        icon: 'user-plus',
        color: 'primary',
        details: [
          '<strong>Website Form Submitted:</strong>',
          'Name: Jessica Park',
          'Title: VP of Data Analytics',
          'Company: DataFlow Analytics',
          'Email: jessica.park@dataflow-analytics.com',
          'Phone: +1 (555) 234-5678',
          'Message: "Interested in demo - need better data visualization tools"',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>AI Enrichment (LinkedIn, Crunchbase, Web Scraping):</strong></div>',
          '✓ <strong>Company:</strong> DataFlow Analytics Inc.',
          '✓ <strong>Industry:</strong> Business Intelligence & Analytics SaaS',
          '✓ <strong>Location:</strong> San Francisco, CA',
          '✓ <strong>Employees:</strong> 450 (per LinkedIn)',
          '✓ <strong>Revenue:</strong> $50M ARR (estimated)',
          '✓ <strong>Funding:</strong> Series C ($75M raised, led by Sequoia)',
          '✓ <strong>Tech Stack:</strong> AWS, PostgreSQL, Python, React',
          '✓ <strong>Recent News:</strong> Launched 2 new enterprise features last month',
          '✓ <strong>Pain Points (from website):</strong> "Scaling data infrastructure for 10M+ users"',
          '<strong>CRM Check:</strong> No existing record - creating new opportunity',
          '<strong>Lead Score:</strong> 85/100 (High Priority - Enterprise, Funded, Good Fit)'
        ]
      },
      {
        title: 'Personalized Email Generation',
        description: 'AI drafts context-aware outreach email',
        icon: 'mail',
        color: 'accent',
        details: [
          '<strong>AI-Generated Email (Ready to Send):</strong>',
          '<div class="mt-3 p-4 bg-accent/10 rounded border border-accent/30 text-sm">',
          '<p><strong>Subject:</strong> Re: Demo Request - DataFlow Analytics</p>',
          '<div class="mt-3">',
          '<p>Hi Jessica,</p>',
          '<p class="mt-2">Thanks for your interest in AlsaTalk! I saw you\'re scaling DataFlow Analytics\' data infrastructure for 10M+ users - that\'s impressive growth.</p>',
          '<p class="mt-2">Congrats on your recent Series C ($75M from Sequoia) and the 2 new enterprise features you launched last month. It sounds like you\'re in a rapid growth phase, and data visualization is critical for your customers.</p>',
          '<p class="mt-2">AlsaTalk helps companies like yours (DataDog, Snowflake, Databricks) build real-time dashboards that handle massive scale. Our platform integrates with your AWS + PostgreSQL stack and can process 10M+ data points/sec with sub-100ms latency.</p>',
          '<p class="mt-2">I\'d love to show you how we helped Snowflake reduce dashboard load times by 85% and increase customer engagement by 40%.</p>',
          '<p class="mt-2">Are you available for a 30-min demo this week? I have slots open:</p>',
          '<ul class="mt-1 ml-4 list-disc">',
          '<li>Tomorrow (Thu) at 2:00 PM PT</li>',
          '<li>Friday at 10:00 AM PT</li>',
          '</ul>',
          '<p class="mt-2">Let me know what works best!</p>',
          '<p class="mt-2">Best,<br>Michael Chen<br>Enterprise Sales, AlsaTalk<br>michael@alsatalk.com | (555) 123-4567</p>',
          '</div>',
          '</div>',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Email Personalization Elements:</strong></div>',
          '✓ Referenced recent Series C funding (shows research)',
          '✓ Mentioned new product launches (shows awareness)',
          '✓ Cited relevant customers (Snowflake, Databricks)',
          '✓ Included specific technical details (AWS, PostgreSQL, latency)',
          '✓ Proposed specific meeting times (reduces back-and-forth)',
          '<strong>Email Sent:</strong> 2 minutes after form submission'
        ]
      },
      {
        title: 'CRM Automation',
        description: 'AI creates Salesforce opportunity with full context',
        icon: 'database',
        color: 'primary',
        details: [
          '<strong>Salesforce Opportunity Created:</strong>',
          '<div class="mt-2 space-y-1 text-sm">',
          '<p><strong>Opportunity Name:</strong> DataFlow Analytics - Enterprise Demo</p>',
          '<p><strong>Account Name:</strong> DataFlow Analytics Inc. (New Account Created)</p>',
          '<p><strong>Contact:</strong> Jessica Park (VP of Data Analytics)</p>',
          '<p><strong>Stage:</strong> Prospecting → Demo Scheduled</p>',
          '<p><strong>Amount:</strong> $150,000 (estimated ARR based on company size)</p>',
          '<p><strong>Close Date:</strong> 60 days (Mar 15, 2026)</p>',
          '<p><strong>Probability:</strong> 20% (industry avg for demo stage)</p>',
          '<p><strong>Lead Source:</strong> Website - Inbound Demo Request</p>',
          '<p><strong>Products:</strong> AlsaTalk Enterprise Plan</p>',
          '</div>',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Account Details Populated:</strong></div>',
          '✓ Industry: Business Intelligence',
          '✓ Employees: 450',
          '✓ Annual Revenue: $50M',
          '✓ Headquarters: San Francisco, CA',
          '✓ Website: www.dataflow-analytics.com',
          '✓ LinkedIn: /company/dataflow-analytics',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Activity Logged:</strong></div>',
          '✓ Task: "Inbound Demo Request - Follow Up" (completed)',
          '✓ Email: "Initial outreach sent" (logged with copy)',
          '✓ Next Task: "Demo Call - Jessica Park" (scheduled for Fri 10 AM)',
          '✓ Notes: "High-priority lead - funded company, good fit for Enterprise plan"'
        ]
      },
      {
        title: 'AI Voice Follow-Up',
        description: 'AI places personalized voice call to schedule demo',
        icon: 'phone',
        color: 'success',
        details: [
          '<strong>AI Voice Call Placed (6 minutes after form submission)</strong>',
          'Called: +1 (555) 234-5678',
          'Status: <span class="text-success">ANSWERED</span>',
          '<div class="mt-3 p-4 bg-success/10 rounded border border-success/30">',
          '<p class="font-semibold mb-2">Call Transcript:</p>',
          '<p class="italic"><strong class="not-italic text-success">AI Agent:</strong> "Hi Jessica, this is Alex from AlsaTalk. I just sent you an email about your demo request. Do you have a quick minute?"</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-primary">Jessica:</strong> "Oh hi! Yes, I just filled out your form. I\'m interested in your data visualization platform."</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-success">AI Agent:</strong> "Great! I\'d love to show you how AlsaTalk helps companies like Snowflake and Databricks build real-time dashboards that handle massive scale. Are you available for a 30-minute demo this Friday at 10 AM Pacific?"</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-primary">Jessica:</strong> "Friday at 10 works perfect. Can you send me a calendar invite?"</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-success">AI Agent:</strong> "Absolutely! I\'ll send that right now to jessica.park@dataflow-analytics.com. You\'ll receive a Zoom link and a brief agenda. Looking forward to Friday!"</p>',
          '</div>',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Post-Call Actions (Automated):</strong></div>',
          '✓ Calendar invite sent to Jessica + Michael (sales rep)',
          '✓ Zoom meeting created (link included in invite)',
          '✓ Salesforce updated: Stage → "Demo Scheduled"',
          '✓ Email confirmation sent with demo agenda',
          '✓ Reminder email scheduled (1 day before demo)',
          '✓ Sales rep (Michael) notified via Slack: "Demo scheduled with DataFlow Analytics - Fri 10 AM"',
          '<strong class="text-success">OUTCOME: Lead qualified and demo scheduled in 6 minutes (vs 3.5 hours manual)</strong>'
        ]
      }
    ],
    impact: {
      metrics: [
        { label: 'Time Saved', value: '95%', color: 'success' },
        { label: 'Follow-Up Speed', value: '6 min', color: 'primary' },
        { label: 'Demo Conversion', value: '85%', color: 'accent' },
        { label: 'Leads Processed/Day', value: '10×', color: 'success' }
      ],
      businessValue: 'Automated lead follow-up transforms sales efficiency. By responding to inbound leads within minutes (vs hours/days), companies increase demo conversion rates from 15% to 85% and accelerate sales cycles by 40%. Sales reps can process 10× more leads per day, focusing on high-value conversations instead of administrative tasks.',
      roi: [
        { metric: 'Leads Processed/Year', value: '12,000' },
        { metric: 'Demo Conversion Rate', value: '15% → 85%' },
        { metric: 'Additional Pipeline', value: '$18M' },
        { metric: 'Sales Rep Productivity', value: '+1000%' }
      ]
    }
  },

  6: {
    icon: 'headphones',
    title: 'Customer Support - Delayed Shipment',
    subtitle: 'Inbound call with instant CRM lookup, ERP order data, AI resolution script',
    traditional: '8 minutes',
    alsatalk: '2 minutes',
    saved: '75%',
    color: 'primary',
    overview: {
      scenario: 'Frustrated Customer Calls: "Where is my order? It\'s been 2 weeks!"',
      challenge: 'Traditional support requires agents to manually: (1) Ask customer for order number, (2) Look up customer in CRM, (3) Check order status in ERP, (4) Research shipping tracking, (5) Call warehouse for details, (6) Draft apology email. This takes 8-10 minutes, frustrates customers, and overwhelms support teams.',
      solution: 'AlsaTalk AI identifies caller from phone number (instant CRM lookup), retrieves order status from SAP ERP in real-time, provides agent with suggested resolution script, auto-issues credit/refund if appropriate, sends confirmation email, and creates follow-up task - all in 2 minutes with 35% higher CSAT scores.',
      systems: ['CRM (Salesforce)', 'ERP (SAP)', 'Shipping APIs (FedEx, UPS)', 'Email', 'Phone System', 'Knowledge Base']
    },
    steps: [
      {
        title: 'Caller Identification',
        description: 'AI identifies customer from phone number',
        icon: 'user-check',
        color: 'success',
        details: [
          '<strong>Incoming Call:</strong> +1 (555) 987-6543',
          '<strong>Call Answered:</strong> 0.5 seconds',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Instant CRM Lookup (Salesforce):</strong></div>',
          '✓ <strong>Customer Found:</strong> Michael Rodriguez',
          '✓ <strong>Account:</strong> TechCorp Inc.',
          '✓ <strong>Customer Tier:</strong> Premium (Platinum Support)',
          '✓ <strong>Lifetime Value:</strong> $450,000',
          '✓ <strong>Recent Orders:</strong> 3 (last 90 days)',
          '✓ <strong>Support History:</strong> 2 previous tickets (both resolved)',
          '✓ <strong>Last Contact:</strong> 30 days ago',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Agent Screen Pop (Auto-Display):</strong></div>',
          'Agent: Sarah Johnson',
          '<strong>AI displays:</strong>',
          '• Customer name, tier, LTV',
          '• Recent orders and tracking status',
          '• Previous support tickets',
          '• Suggested greeting: "Hi Michael, this is Sarah from TechCorp Support. I see you have a few recent orders. How can I help you today?"'
        ]
      },
      {
        title: 'Order Retrieval',
        description: 'AI pulls real-time order status from ERP',
        icon: 'package-search',
        color: 'accent',
        details: [
          '<strong>Customer:</strong> "I ordered part #XYZ-1234 two weeks ago and it hasn\'t arrived yet!"',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>AI Searches SAP ERP (0.3 seconds):</strong></div>',
          '✓ <strong>Order Found:</strong> SO-2025-78492',
          '✓ <strong>Order Date:</strong> Sept 15, 2025 (13 days ago)',
          '✓ <strong>Product:</strong> Part #XYZ-1234 (Qty: 50 units)',
          '✓ <strong>Order Value:</strong> $12,500',
          '✓ <strong>Promised Delivery:</strong> Sept 22, 2025 (6 days late!)',
          '✓ <strong>Status:</strong> <span class="text-danger">DELAYED</span>',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Shipping Tracking (FedEx API):</strong></div>',
          '✓ <strong>Tracking Number:</strong> FX-8472-9384-2847',
          '✓ <strong>Current Location:</strong> Memphis, TN (FedEx Hub)',
          '✓ <strong>Status:</strong> In Transit - Delayed due to weather',
          '✓ <strong>Updated Delivery:</strong> Tomorrow (Sept 29) by 5:00 PM',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>AI Root Cause Analysis:</strong></div>',
          '• Delay caused by Hurricane Francine (Memphis hub closure)',
          '• 3-day weather delay (not carrier/shipper fault)',
          '• Customer is Platinum tier - deserves compensation',
          '<strong>AI Suggested Resolution:</strong>',
          '1. Apologize for delay, explain weather issue',
          '2. Confirm new delivery date (tomorrow by 5 PM)',
          '3. Offer $500 credit as goodwill gesture (4% of order value)',
          '4. Send tracking link via email',
          '5. Create follow-up task to confirm delivery'
        ]
      },
      {
        title: 'Issue Resolution',
        description: 'Agent follows AI-suggested script, AI auto-issues credit',
        icon: 'check-circle',
        color: 'success',
        details: [
          '<strong>Agent (Following AI Script):</strong>',
          '<div class="mt-2 p-4 bg-success/10 rounded border border-success/30">',
          '<p class="italic">"I sincerely apologize for the delay, Michael. I can see your order (SO-2025-78492) shipped on time but got delayed in Memphis due to Hurricane Francine. The good news is, it\'s moving again and will arrive tomorrow by 5 PM."</p>',
          '<p class="mt-2 italic">"I know this caused inconvenience, so I\'d like to offer you a $500 credit on your account as a goodwill gesture. You\'ll also receive an email with the tracking link so you can monitor it in real-time."</p>',
          '<p class="mt-2 italic">"Does that work for you?"</p>',
          '</div>',
          '<strong>Customer:</strong> "Oh, okay. That makes sense. The credit is appreciated. Thank you!"',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>AI Auto-Actions (During Call):</strong></div>',
          '✓ <strong>Credit Issued:</strong> $500 credit applied to account (SAP ERP)',
          '✓ <strong>Email Sent:</strong> Tracking link + credit confirmation',
          '✓ <strong>CRM Updated:</strong> Support ticket created and resolved',
          '✓ <strong>Follow-Up Task:</strong> "Check delivery confirmation (Sept 30)"',
          '✓ <strong>Knowledge Base Updated:</strong> "Hurricane delays - weather policy"',
          '<strong>Call Duration:</strong> 2 minutes (vs 8 minutes traditional)',
          '<strong>CSAT Score:</strong> 9/10 (customer satisfaction survey sent post-call)'
        ]
      }
    ],
    impact: {
      metrics: [
        { label: 'Call Time Saved', value: '75%', color: 'success' },
        { label: 'CSAT Improvement', value: '+35%', color: 'primary' },
        { label: 'Calls Handled/Hour', value: '4×', color: 'accent' },
        { label: 'First-Call Resolution', value: '95%', color: 'success' }
      ],
      businessValue: 'AI-powered support transforms customer service from reactive problem-solving to proactive relationship management. By providing agents with instant context, suggested resolutions, and automated actions, companies reduce average handle time by 75%, increase CSAT by 35%, and enable agents to handle 4× more calls per hour.',
      roi: [
        { metric: 'Calls/Year', value: '120,000' },
        { metric: 'Time Saved', value: '60,000 hours' },
        { metric: 'Cost Savings', value: '$3M' },
        { metric: 'CSAT Improvement', value: '6.2 → 8.4' }
      ]
    }
  },

  7: {
    icon: 'building',
    title: 'Client Onboarding - Multi-Agent Automation',
    subtitle: 'Voice command triggers CRM setup, invoicing, provisioning, scheduling, welcome call',
    traditional: '8 hours',
    alsatalk: '5 minutes',
    saved: '98%',
    color: 'secondary',
    overview: {
      scenario: 'VP Says: "Onboard GlobalTech as a new enterprise client - 1,200 users, $300K annual"',
      challenge: 'Traditional client onboarding requires manual coordination across Sales (CRM setup), Finance (invoicing), IT (provisioning), Customer Success (scheduling kickoff), and Operations (welcome call). Each team uses different systems, causing 8-hour delays, onboarding errors, and poor first impressions.',
      solution: 'AlsaTalk AI orchestrates 6 specialized agents across 11 systems simultaneously - creating Salesforce account, generating QuickBooks invoice, provisioning 1,200 user licenses, scheduling kickoff meeting, placing welcome call to CTO, and sending onboarding emails - all completed in 5 minutes with zero errors.',
      systems: ['Salesforce CRM', 'QuickBooks', 'Product Platform', 'Email', 'Calendar', 'Slack', 'Zoom', 'DocuSign', 'Support Portal', 'Knowledge Base', 'Voice AI']
    },
    steps: [
      {
        title: 'Voice Command Triggers Workflow',
        description: 'AI interprets onboarding request and deploys agents',
        icon: 'mic',
        color: 'primary',
        details: [
          '<strong>Speaker:</strong> Jennifer Martinez (VP Sales)',
          '<strong>Command:</strong> "Onboard GlobalTech as a new client - 1,200 users, $300K annual contract, start date Oct 15"',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>AI Analysis:</strong></div>',
          '✓ Voice authenticated via biometrics',
          '✓ Intent: CLIENT_ONBOARDING',
          '✓ Entity: GlobalTech Solutions Inc.',
          '✓ Users: 1,200',
          '✓ Contract Value: $300,000 ARR',
          '✓ Start Date: Oct 15, 2025',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Workflow Requirements Identified:</strong></div>',
          '• Salesforce account creation',
          '• Invoice generation',
          '• License provisioning (1,200 users)',
          '• Kickoff meeting scheduling',
          '• Welcome call to customer',
          '• Onboarding email sequence',
          '<strong>Estimated systems:</strong> 11',
          '<strong>Traditional time:</strong> 8 hours',
          '<strong>AlsaTalk automated time:</strong> ~5 minutes',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Multi-Agent Deployment:</strong></div>',
          '→ 6 agents activating simultaneously',
          '→ 11 systems being accessed',
          '→ Real-time progress tracking'
        ]
      },
      {
        title: 'CRM & Finance Automation',
        description: 'AI creates Salesforce account and QuickBooks invoice',
        icon: 'database',
        color: 'accent',
        details: [
          '<strong>Agent 1: Salesforce CRM Agent</strong>',
          '✓ <strong>Account Created:</strong> GlobalTech Solutions Inc.',
          '   • Industry: Technology Consulting',
          '   • Employees: 1,200',
          '   • Headquarters: Austin, TX',
          '   • Website: www.globaltech-solutions.com',
          '✓ <strong>Opportunity Converted:</strong>',
          '   • Deal: "GlobalTech - Enterprise Plan"',
          '   • Stage: Closed Won',
          '   • Amount: $300,000 ARR',
          '   • Close Date: Oct 1, 2025',
          '✓ <strong>Contacts Imported:</strong>',
          '   • Primary: David Lee (CTO)',
          '   • Billing: Finance Team (finance@globaltech-solutions.com)',
          '   • Technical: IT Admin (it@globaltech-solutions.com)',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Agent 2: Finance Agent (QuickBooks)</strong></div>',
          '✓ <strong>Customer Record Created:</strong> GlobalTech Solutions Inc.',
          '✓ <strong>Invoice Generated:</strong> INV-2025-10847',
          '   • Line Item 1: AlsaTalk Enterprise Plan (1,200 users) - $300,000',
          '   • Line Item 2: Implementation Services - $80,000',
          '   • <strong>Total:</strong> $380,000',
          '   • Payment Terms: Net 30',
          '   • Due Date: Nov 1, 2025',
          '✓ <strong>Invoice Sent:</strong> finance@globaltech-solutions.com',
          '✓ <strong>Payment Link Included:</strong> Stripe checkout (ACH/Credit Card accepted)',
          '<strong>CRM + Finance Setup Time:</strong> 1.2 minutes (vs 2 hours manual)'
        ]
      },
      {
        title: 'License Provisioning',
        description: 'AI provisions 1,200 user licenses and workspace',
        icon: 'users',
        color: 'primary',
        details: [
          '<strong>Agent 3: Product Provisioning Agent</strong>',
          '✓ <strong>Workspace Created:</strong> globaltech.alsatalk.com',
          '✓ <strong>Licenses Provisioned:</strong> 1,200 seats',
          '   • Plan: Enterprise (Premium Features Enabled)',
          '   • SSO: Enabled (Okta integration configured)',
          '   • API Keys: Generated (3 production keys)',
          '   • Data Residency: US-West (as per contract)',
          '✓ <strong>Admin Accounts Created:</strong>',
          '   • Primary Admin: david.lee@globaltech-solutions.com',
          '   • IT Admin: it@globaltech-solutions.com',
          '   • Billing Admin: finance@globaltech-solutions.com',
          '✓ <strong>Welcome Email Sent:</strong> Login instructions + onboarding guide',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Support Portal Setup:</strong></div>',
          '✓ Support tier: Premium 24/7',
          '✓ Dedicated support channel created (Slack Connect)',
          '✓ Knowledge base access granted',
          '✓ Priority ticket queue configured',
          '<strong>Provisioning Time:</strong> 1.8 minutes (vs 3 hours manual)'
        ]
      },
      {
        title: 'Kickoff Scheduling & Welcome Call',
        description: 'AI schedules kickoff meeting and places welcome call',
        icon: 'calendar',
        color: 'success',
        details: [
          '<strong>Agent 4: Calendar Agent</strong>',
          '✓ <strong>Kickoff Meeting Scheduled:</strong> Oct 15, 2025 at 10:00 AM CT',
          '   • Attendees: CTO (David Lee), CSM (Maria Rodriguez), Implementation Lead',
          '   • Duration: 60 minutes',
          '   • Zoom link: zoom.us/j/globaltech-kickoff',
          '   • Calendar invites sent to all attendees',
          '   • Agenda attached: "Enterprise Onboarding Kickoff"',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Agent 5: Voice AI Agent (Welcome Call)</strong></div>',
          '<strong>AI Placed Call to CTO (David Lee):</strong>',
          '<div class="mt-2 p-4 bg-success/10 rounded border border-success/30">',
          '<p class="italic"><strong class="not-italic text-success">AI Agent:</strong> "Hi David, this is Alex from AlsaTalk. Congrats on becoming a customer! I wanted to personally welcome you and confirm that your 1,200 user licenses are now active at globaltech.alsatalk.com."</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-primary">David (CTO):</strong> "Great! We\'re excited to get started."</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-success">AI Agent:</strong> "Perfect! I\'ve scheduled your kickoff meeting for Oct 15 at 10 AM. You\'ll meet Maria, your dedicated Customer Success Manager. She\'ll walk you through the implementation plan. You should have received a calendar invite and login instructions via email."</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-primary">David:</strong> "Got it. Thanks for the call!"</p>',
          '</div>',
          '<strong>Call Duration:</strong> 1:05',
          '<strong>Outcome:</strong> Positive first impression, customer feels valued'
        ]
      },
      {
        title: 'Onboarding Completion',
        description: 'AI sends confirmation emails and updates all systems',
        icon: 'check-circle',
        color: 'accent',
        details: [
          '<strong>Agent 6: Communication Agent</strong>',
          '✓ <strong>Email Sequence Triggered:</strong>',
          '   • Email 1 (Immediate): "Welcome to AlsaTalk! Your account is ready"',
          '   • Email 2 (Day 1): "Getting Started Guide - First Steps"',
          '   • Email 3 (Day 3): "Best Practices for Enterprise Rollout"',
          '   • Email 4 (Day 7): "Join Our Customer Community"',
          '✓ <strong>Slack Notifications:</strong>',
          '   • CSM (Maria): "New client onboarded - GlobalTech (1,200 users, $300K)"',
          '   • Finance Team: "Invoice sent - GlobalTech - $380K total"',
          '   • Support Team: "Premium support enabled for GlobalTech"',
          '   • Implementation Team: "Kickoff scheduled Oct 15"',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Systems Updated:</strong></div>',
          '1. Salesforce: Account + Opportunity marked "Onboarded"',
          '2. QuickBooks: Invoice generated and sent',
          '3. Product Platform: 1,200 licenses provisioned',
          '4. Support Portal: Premium tier enabled',
          '5. Calendar: Kickoff meeting scheduled',
          '6. Email: Welcome sequence initiated',
          '7. Slack: Team notifications sent',
          '8. Knowledge Base: Access granted',
          '9. Zoom: Meeting room configured',
          '10. DocuSign: Contract filed',
          '11. CRM: Implementation project created',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Onboarding Summary:</strong></div>',
          '<strong>Process:</strong> Client Onboarding - GlobalTech Solutions',
          '<strong>Initiated:</strong> Oct 1, 2025 9:30 AM',
          '<strong>Completed:</strong> Oct 1, 2025 9:35 AM',
          '<strong>Total Duration:</strong> 5 minutes',
          '<strong>Traditional Duration:</strong> 8 hours',
          '<strong class="text-success">Time Saved: 98%</strong>',
          '<strong>Error Rate:</strong> 0% (vs 10-15% manual)',
          '<strong>Customer Sentiment:</strong> Positive (welcomed with personal call)'
        ]
      }
    ],
    impact: {
      metrics: [
        { label: 'Time Saved', value: '98%', color: 'success' },
        { label: 'Systems Updated', value: '11', color: 'primary' },
        { label: 'Error Rate', value: '0%', color: 'success' },
        { label: 'Customer Satisfaction', value: '9.8/10', color: 'accent' }
      ],
      businessValue: 'Automated client onboarding transforms the customer\'s first experience from chaotic and slow to seamless and instant. By orchestrating 11 systems in 5 minutes, companies deliver white-glove service at scale, reduce onboarding errors to zero, and free up teams to focus on strategic customer relationships instead of administrative tasks.',
      roi: [
        { metric: 'Clients Onboarded/Year', value: '500' },
        { metric: 'Time Saved/Year', value: '4,000 hours' },
        { metric: 'Cost Savings', value: '$500K' },
        { metric: 'Onboarding NPS', value: '68 → 85' }
      ]
    }
  },

  8: {
    icon: 'truck',
    title: 'Order Status Update - Voice Command to Customer Call',
    subtitle: 'Voice triggers ERP lookup, AI places personal call to customer with real-time tracking info',
    traditional: '15 minutes',
    alsatalk: '30 seconds',
    saved: '97%',
    color: 'accent',
    overview: {
      scenario: 'Sales Rep Says: "Update Lisa Martinez about her order status"',
      challenge: 'Traditional order updates require sales reps to: (1) Look up customer in CRM, (2) Find order number in notes, (3) Check order status in ERP, (4) Get tracking number from shipping system, (5) Call or email customer with update. This takes 15 minutes per update, and customers often miss emails or don\'t answer calls.',
      solution: 'AlsaTalk AI hears the voice command, instantly looks up Lisa Martinez in Salesforce, retrieves her order from SAP ERP, gets real-time FedEx tracking data, and places a personal phone call to Lisa with the tracking update - all within 30 seconds. Email confirmation is sent automatically, and the CRM is updated with call notes.',
      systems: ['Salesforce CRM', 'SAP ERP', 'Shipping APIs (FedEx)', 'Voice AI', 'Email', 'SMS']
    },
    steps: [
      {
        title: 'Voice Command Processing',
        description: 'AI identifies customer and retrieves order',
        icon: 'mic',
        color: 'primary',
        details: [
          '<strong>Speaker:</strong> Jennifer Smith (Account Manager)',
          '<strong>Command:</strong> "Update Lisa Martinez about her order status"',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>AI Analysis:</strong></div>',
          '✓ Voice authenticated via biometrics',
          '✓ Intent: ORDER_STATUS_UPDATE',
          '✓ Customer Name: Lisa Martinez',
          '✓ Action: Retrieve order + contact customer',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Step 1: CRM Lookup (Salesforce) - 0.5 sec</strong></div>',
          '✓ <strong>Customer Found:</strong> Lisa Martinez',
          '✓ <strong>Company:</strong> DataFlow Analytics Inc.',
          '✓ <strong>Title:</strong> VP of Operations',
          '✓ <strong>Phone:</strong> +1 (555) 234-8765',
          '✓ <strong>Email:</strong> lisa.martinez@dataflow-analytics.com',
          '✓ <strong>Account Manager:</strong> Jennifer Smith',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Step 2: ERP Lookup (SAP) - 0.8 sec</strong></div>',
          '✓ <strong>Recent Orders Found:</strong> 1 open order',
          '✓ <strong>Order Number:</strong> SO-2025-94728',
          '✓ <strong>Product:</strong> AlsaTalk Enterprise Licenses (50 seats)',
          '✓ <strong>Order Date:</strong> Sept 25, 2025',
          '✓ <strong>Promised Delivery:</strong> Oct 5, 2025',
          '✓ <strong>Status:</strong> <span class="text-success">IN TRANSIT</span>',
          '<div class="mt-3 pt-3 border-t border-primary/20"><strong>Step 3: Shipping Tracking (FedEx API) - 0.4 sec</strong></div>',
          '✓ <strong>Tracking Number:</strong> FX-9284-7364-8473',
          '✓ <strong>Current Location:</strong> Dallas, TX (FedEx Facility)',
          '✓ <strong>Status:</strong> Out for Delivery',
          '✓ <strong>ETA:</strong> Today (Oct 5) by 3:00 PM',
          '<strong>Total Lookup Time:</strong> 1.7 seconds'
        ]
      },
      {
        title: 'AI Places Personal Call',
        description: 'AI calls customer with tracking update',
        icon: 'phone',
        color: 'success',
        details: [
          '<strong>AI Initiates Outbound Call:</strong> +1 (555) 234-8765',
          '<strong>Call Status:</strong> <span class="text-success">ANSWERED</span>',
          '<strong>Call Duration:</strong> 0:45',
          '<div class="mt-3 p-4 bg-success/10 rounded border border-success/30">',
          '<p class="font-semibold mb-2">Call Transcript:</p>',
          '<p class="italic"><strong class="not-italic text-success">AI Agent:</strong> "Hi Lisa, this is Alex from AlsaTalk. I\'m calling on behalf of Jennifer Smith to give you an update on your order."</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-primary">Lisa:</strong> "Oh great! I was actually wondering about that."</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-success">AI Agent:</strong> "Good news! Your order for 50 Enterprise licenses is out for delivery right now. FedEx shows it should arrive at your office today by 3:00 PM. The tracking number is FX-9284-7364-8473."</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-primary">Lisa:</strong> "Perfect! Thanks for the heads up."</p>',
          '<p class="mt-2 italic"><strong class="not-italic text-success">AI Agent:</strong> "You\'re welcome! I\'ll send you an email with the tracking link so you can monitor it in real-time. If you have any questions, feel free to reach out to Jennifer. Have a great day!"</p>',
          '</div>',
          '<div class="mt-3 pt-3 border-t border-success/20"><strong>Call Outcome:</strong></div>',
          '✓ Customer informed of order status',
          '✓ Tracking number provided',
          '✓ Positive customer experience',
          '✓ Call duration: 45 seconds (vs 5-10 min manual call)',
          '<strong class="text-success">Customer Satisfaction: High (proactive update appreciated)</strong>'
        ]
      },
      {
        title: 'Automated Follow-Up',
        description: 'AI sends email, SMS, updates CRM, schedules follow-up',
        icon: 'check-circle',
        color: 'accent',
        details: [
          '<strong>Post-Call Automation (Executed During Call):</strong>',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Email Sent:</strong></div>',
          '✓ <strong>To:</strong> lisa.martinez@dataflow-analytics.com',
          '✓ <strong>Subject:</strong> "Your AlsaTalk Order is Out for Delivery!"',
          '✓ <strong>Content:</strong>',
          '   • Order Summary: 50 Enterprise licenses (SO-2025-94728)',
          '   • Tracking Link: track.fedex.com/FX-9284-7364-8473',
          '   • ETA: Today by 3:00 PM',
          '   • Contact: Jennifer Smith (jennifer@alsatalk.com)',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>SMS Sent:</strong></div>',
          '✓ <strong>To:</strong> +1 (555) 234-8765',
          '✓ <strong>Message:</strong> "Hi Lisa! Your AlsaTalk order is out for delivery today by 3 PM. Track: fedex.com/FX92847364 - AlsaTalk"',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>CRM Updated (Salesforce):</strong></div>',
          '✓ Activity logged: "Outbound Call - Order Status Update"',
          '✓ Notes added: "Called Lisa Martinez - informed of delivery (today by 3 PM). Customer satisfied."',
          '✓ Call recording attached',
          '✓ Next Task created: "Follow up on delivery confirmation (Oct 6)"',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Follow-Up Scheduled:</strong></div>',
          '✓ <strong>Task:</strong> "Confirm Lisa received order (Oct 6)"',
          '✓ <strong>Assigned To:</strong> Jennifer Smith (Account Manager)',
          '✓ <strong>Reminder:</strong> Email reminder sent to Jennifer',
          '<div class="mt-3 pt-3 border-t border-accent/20"><strong>Total Process Time:</strong></div>',
          '<strong>Voice Command to Completion:</strong> 30 seconds',
          '<strong>Traditional Time:</strong> 15 minutes (lookup + call + email + CRM update)',
          '<strong class="text-success">Time Saved: 97%</strong>'
        ]
      }
    ],
    impact: {
      metrics: [
        { label: 'Time Saved', value: '97%', color: 'success' },
        { label: 'Process Time', value: '30 sec', color: 'primary' },
        { label: 'Customer Response Rate', value: '70%', color: 'accent' },
        { label: 'Updates/Day', value: '20×', color: 'success' }
      ],
      businessValue: 'Voice-triggered customer updates transform sales operations from reactive to proactive. By enabling instant, personalized communication via voice AI, sales reps can deliver 20× more updates per day, increasing customer satisfaction by 40% and reducing "Where is my order?" inbound calls by 60%. Voice creates 70% higher response rates than email alone.',
      roi: [
        { metric: 'Updates/Year', value: '24,000' },
        { metric: 'Time Saved/Year', value: '6,000 hours' },
        { metric: 'Cost Savings', value: '$750K' },
        { metric: 'Customer Satisfaction', value: '+40%' }
      ]
    }
  }
};
