# LEA - Learning Empowered Advisor
## Discovery Verification System for Product Coaching

A comprehensive web-based tool for product coaches to conduct systematic discovery assessments and receive intelligent technique recommendations based on client findings.

## What is LEA?

LEA (Learning Empowered Advisor) helps product coaches:
- **Conduct structured discovery** across 36 critical questions in 5 phases
- **Track findings** with discovery methods (interviews, workshops, observation, etc.)
- **Generate leadership summaries** with key insights and gaps
- **Receive smart recommendations** from a library of 50 product management techniques
- **Compare assessments** across multiple coaching engagements
- **Export/Import data** in JSON format for tracking progress over time

## The 5 Discovery Phases

### Phase 1: Foundation & Context (6 questions)
Understanding product purpose, market position, and team structure
- Why the product exists and who experiences the problem
- What alternatives users have and what's been tried before

### Phase 2: Success & Outcomes (10 questions)
Defining what success means and how it's measured
- Vision for success at various time horizons
- Measurement infrastructure, baselines, and leading indicators

### Phase 3: Structure & Ownership (6 questions)
Examining decision-making processes and team empowerment
- Where product ownership lives and how decisions are made
- Stakeholder alignment and knowledge sharing

### Phase 4: Team Dynamics & Constraints (13 questions)
Exploring collaboration patterns and organizational challenges
- Team autonomy, past failures, hidden stakeholders
- Customer interaction, dependencies, and experimentation culture

### Phase 5: Untested Assumptions (1 question)
Identifying critical risks and knowledge gaps
- What assumptions remain untested

## How to Use LEA

### Quick Start

1. **Open Terminal** and navigate to this folder
2. **Run the launcher**: `./START-LEA.sh`
   - Or drag START-LEA.sh into Terminal and press Enter
3. **LEA opens automatically** in your browser at http://localhost:8888

### Conducting a Discovery Assessment

1. **Enter engagement metadata** (client name, date, coach)
2. **Work through each phase** using the tab navigation
3. **Document findings** for each question as you gather information
4. **Tag discovery methods** used (interview, workshop, observation, etc.)
5. **Track progress** via the coverage dashboard showing completion %
6. **Generate summary** to see key insights, gaps, and technique recommendations

### Discovery Methods

- 🗣️ **Interview** - One-on-one or group conversations
- 👥 **Workshop** - Facilitated group sessions
- 👀 **Observation** - Shadowing teams or attending meetings
- 📄 **Document Review** - Analyzing existing documentation
- 📊 **Survey** - Quantitative data collection
- 📈 **Data Analysis** - Examining metrics and analytics

### Export & Import

- **Export JSON**: Save your assessment with all findings and recommendations
- **Import JSON**: Restore previous assessments or share with colleagues
- **Compare Assessments**: Upload multiple JSON files to see progress over time

## Technique Recommendations

LEA includes a **50-technique library** sourced from SVPG (Silicon Valley Product Group) Masterclass 2025:
- **35 Discovery Techniques** - Customer interviews, prototype testing, reference customers, etc.
- **15 Coaching Techniques** - Team transformation, outcome-based roadmaps, objectives coaching

### Smart Matching Algorithm

The recommendation engine analyzes your discovery findings and:
1. **Scores techniques** based on keyword matches, discovery patterns, and phase indicators
2. **Ranks by relevance** to your specific client situation
3. **Explains why** each technique is recommended
4. **Provides execution guidance** with steps, variations, and common pitfalls

### Technique Categories

**Discovery Techniques:**
- Customer Discovery (interviews, reference programs, continuous discovery)
- Product Validation (prototypes, MVP tests, fake door tests, wizard of oz)
- Strategic Analysis (opportunity assessment, story mapping, lean canvas)

**Coaching Techniques:**
- Team Transformation (pilot teams, outcome roadmaps)
- Objectives Coaching (empowerment, ambition, commitments, management)
- Leadership Development (strategy coaching, stakeholder alignment)

## Technical Details

- **Single-file architecture**: Everything in index.html (HTML + CSS + JavaScript)
- **No dependencies**: Pure vanilla JavaScript, runs in any modern browser
- **Local server required**: Uses Python http.server to avoid CORS issues
- **Privacy-first**: All data stays on your machine unless you export it
- **Automated testing**: Built-in test framework with 10 regression tests

## Files in This Folder

- **index.html** - Main application (5500+ lines)
- **Discovery-v2-TechCorp-Demo-2025-12-25.json** - Demo assessment data
- **START-LEA.sh** - Launcher script (starts server + opens browser)
- **HOW-TO-START.txt** - Simple instructions for non-technical users
- **README.md** - This documentation
- **backups/** - Previous versions of index.html

## Running Tests

LEA includes automated regression tests:

1. Click **"Run Tests"** button in the UI, OR
2. Open browser console: `testFramework.runAll()`

Tests verify:
- ✅ All manager classes initialize
- ✅ Technique library loads (50 techniques)
- ✅ Discovery questions defined (36 questions)
- ✅ Recommendation engine works
- ✅ Export/Import functionality
- ✅ Summary generator
- ✅ Tab navigation

## Data Format (JSON Export)

```json
{
  "version": "2.0",
  "exportDate": "2025-12-28T10:30:00Z",
  "metadata": {
    "clientName": "TechCorp",
    "engagementDate": "2025-12-15",
    "coach": "Jane Smith"
  },
  "questions": [
    {
      "questionId": "q1",
      "phase": 1,
      "question": "Why does this product exist?",
      "findings": "Product was built because competitor had similar feature...",
      "notes": "Need to revisit value proposition",
      "status": "answered",
      "discoveryMethods": ["interview", "document_review"],
      "lastUpdated": "2025-12-15T14:22:00Z"
    }
    // ... 35 more questions
  ],
  "analysis": {
    "coverage": {
      "overall": 85.7,
      "byPhase": { "1": 100, "2": 75, "3": 80, "4": 100, "5": 75 }
    },
    "recommendedTechniques": [
      { "id": "customer_interviews", "score": 95, "reasons": [...] }
    ]
  }
}
```

## Use Cases

### 1. Initial Client Assessment
- Run through all 36 questions in first 2-3 weeks
- Export snapshot to track baseline state
- Use technique recommendations to build coaching plan

### 2. Progress Tracking
- Re-run assessment quarterly
- Compare JSON exports to see what's improved
- Identify persistent gaps needing attention

### 3. Leadership Reporting
- Generate summary tab for executive briefings
- Show coverage %, key findings, and recommended next steps
- Export as reference for steering committee meetings

### 4. Engagement Planning
- Use technique recommendations to scope coaching work
- Estimate time commitment based on suggested techniques
- Align on priorities with client leadership

## Customization Ideas

1. **Add custom questions** - Expand beyond the core 36 questions
2. **Create industry templates** - Pre-populate findings for common scenarios
3. **Build technique library** - Add your own coaching techniques alongside SVPG
4. **Integration hooks** - Connect to project management tools or CRMs
5. **PDF export** - Generate formatted reports for clients

## Attribution

**Technique Library Source:**
- SVPG (Silicon Valley Product Group) Masterclass December 2025
- SVPG Research and Publications
- All technique data includes proper `svpg_source` attribution

**Tool Design:**
- LEA (Learning Empowered Advisor) - Discovery Verification System
- Built for product coaches conducting systematic client assessments

## Support & Development

This is a standalone coaching tool. To extend it:
- Edit `index.html` directly (all code is there)
- Test changes with `testFramework.runAll()`
- Version control recommended (see Git setup in conversation history)

## Next Steps

1. ✅ Run the automated tests to verify everything works
2. ✅ Import the TechCorp demo data to see a complete assessment
3. ✅ Click "Generate Summary" to see technique recommendations
4. ✅ Try creating your own assessment for a current client
5. ✅ Export and save your assessments for future comparison

---

**Version:** 2.1
**Last Updated:** January 2026
**License:** Personal coaching use
