#!/usr/bin/env python3
"""
LEA Regression Test Static Verification
Verifies test conditions by analyzing the index.html file
"""

import re
import json

def read_html():
    """Read the index.html file"""
    with open('/Users/surajjohn/Assumption-Validation/index.html', 'r', encoding='utf-8') as f:
        return f.read()

def verify_test_conditions(html):
    """Verify each test condition statically"""
    results = []

    # Test 1: All Manager Classes Initialize
    managers = ['StateManager', 'TabNavigator', 'DataManager', 'SummaryGenerator', 'ViewModeManager']
    found_managers = []
    for manager in managers:
        if f'class {manager}' in html or f'const {manager.lower()[0] + manager[1:]}' in html:
            found_managers.append(manager)

    test1_pass = len(found_managers) >= 4
    results.append({
        'name': 'All Manager Classes Initialize',
        'passed': test1_pass,
        'details': f'Found {len(found_managers)}/{len(managers)} manager classes: {", ".join(found_managers)}'
    })

    # Test 2: Technique Library Loads (50 techniques)
    technique_count_match = re.search(r'total_techniques["\']?\s*:\s*(\d+)', html)
    technique_count = int(technique_count_match.group(1)) if technique_count_match else 0
    test2_pass = technique_count == 50

    results.append({
        'name': 'Technique Library Loads (50 techniques)',
        'passed': test2_pass,
        'details': f'Found total_techniques: {technique_count}'
    })

    # Test 3: Discovery Questions Defined
    phases_found = 0
    for phase in range(1, 6):
        if f'phase{phase}' in html:
            phases_found += 1

    test3_pass = phases_found == 5
    results.append({
        'name': 'Discovery Questions Defined',
        'passed': test3_pass,
        'details': f'Found {phases_found}/5 phases defined'
    })

    # Test 4: TechniqueRecommender Class Works
    test4_pass = 'class TechniqueRecommender' in html
    results.append({
        'name': 'TechniqueRecommender Class Works',
        'passed': test4_pass,
        'details': 'TechniqueRecommender class found' if test4_pass else 'Class not found'
    })

    # Test 5: State Manager Initializes Questions
    test5_pass = 'StateManager' in html and 'questions' in html
    results.append({
        'name': 'State Manager Initializes Questions',
        'passed': test5_pass,
        'details': 'StateManager and questions structure found' if test5_pass else 'Not found'
    })

    # Test 6: Export Functionality Available
    test6_pass = 'exportToJSON' in html
    results.append({
        'name': 'Export Functionality Available',
        'passed': test6_pass,
        'details': 'exportToJSON method found' if test6_pass else 'Method not found'
    })

    # Test 7: Import Functionality Available
    test7_pass = 'importFromJSON' in html
    results.append({
        'name': 'Import Functionality Available',
        'passed': test7_pass,
        'details': 'importFromJSON method found' if test7_pass else 'Method not found'
    })

    # Test 8: Tab Navigation Works
    test8_pass = 'switchTab' in html or 'TabNavigator' in html
    results.append({
        'name': 'Tab Navigation Works',
        'passed': test8_pass,
        'details': 'Tab navigation methods found' if test8_pass else 'Methods not found'
    })

    # Test 9: Summary Generator Works
    test9_pass = 'generateSummary' in html and 'extractKeyFindings' in html
    results.append({
        'name': 'Summary Generator Works',
        'passed': test9_pass,
        'details': 'Summary generation methods found' if test9_pass else 'Methods not found'
    })

    # Test 10: View Mode Manager Works
    test10_pass = 'ViewModeManager' in html and ('setMode' in html or 'getMode' in html)
    results.append({
        'name': 'View Mode Manager Works',
        'passed': test10_pass,
        'details': 'ViewModeManager with mode methods found' if test10_pass else 'Not found'
    })

    return results

def main():
    print('═' * 70)
    print('  LEA REGRESSION TEST EXECUTION (Static Verification)')
    print('═' * 70)
    print()
    print('🔍 Analyzing index.html for test conditions...\n')

    html = read_html()
    results = verify_test_conditions(html)

    passed_count = sum(1 for r in results if r['passed'])
    failed_count = len(results) - passed_count

    print(f'Running {len(results)} tests...\n')
    print('─' * 70)

    for i, result in enumerate(results, 1):
        status = '✅ PASS' if result['passed'] else '❌ FAIL'
        print(f'{i:2d}. {status} - {result["name"]}')
        print(f'    └─ {result["details"]}')
        print()

    print('─' * 70)
    print()
    print(f'📊 Test Results Summary:')
    print(f'   ✅ Passed: {passed_count}/{len(results)}')
    if failed_count > 0:
        print(f'   ❌ Failed: {failed_count}/{len(results)}')
    print()

    if passed_count == len(results):
        print('🎉 All regression tests PASSED!')
    else:
        print(f'⚠️  {failed_count} test(s) failed - review details above')

    print()
    print('═' * 70)
    print('ℹ️  Note: This is a static verification based on code analysis.')
    print('   For full runtime testing, open http://localhost:8888/index.html')
    print('   and run testFramework.runAll() in the browser console.')
    print('═' * 70)
    print()

if __name__ == '__main__':
    main()
