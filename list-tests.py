#!/usr/bin/env python3
"""
LEA Regression Test Verification Script
Extracts and lists all regression tests from index.html
"""

import re
import sys

def extract_tests(html_file):
    """Extract test names from the HTML file"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find all test definitions
        test_pattern = r"testFramework\.test\('([^']+)'"
        tests = re.findall(test_pattern, content)

        return tests
    except Exception as e:
        print(f"❌ Error reading {html_file}: {e}")
        sys.exit(1)

def verify_test_framework(html_file):
    """Verify test framework components exist"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        checks = {
            'TestFramework class': 'class TestFramework' in content,
            'runAll() method': 'runAll()' in content,
            'test() method': re.search(r'test\s*\([^)]+\)', content) is not None,
            'Run Tests button': 'runTestsBtn' in content,
        }

        return checks
    except Exception as e:
        print(f"❌ Error verifying framework: {e}")
        return {}

def main():
    html_file = '/Users/surajjohn/Assumption-Validation/index.html'

    print('═' * 60)
    print('  LEA REGRESSION TEST SUITE VERIFICATION')
    print('═' * 60)
    print()

    # Extract tests
    print('📋 Extracting test definitions...\n')
    tests = extract_tests(html_file)

    if not tests:
        print('❌ No tests found in the application')
        sys.exit(1)

    print(f'✅ Found {len(tests)} regression tests:\n')
    for i, test in enumerate(tests, 1):
        print(f'   {i:2d}. {test}')

    print()
    print('─' * 60)
    print('📦 Test Framework Components:')
    print('─' * 60)
    print()

    checks = verify_test_framework(html_file)
    for component, exists in checks.items():
        status = '✅' if exists else '❌'
        print(f'   {status} {component}')

    print()
    print('═' * 60)
    print('ℹ️  How to run these tests:')
    print('═' * 60)
    print()
    print('   1. Open http://localhost:8888/index.html in a browser')
    print('   2. Click the "Run Tests" button in the UI, OR')
    print('   3. Open browser console (F12) and run: testFramework.runAll()')
    print()
    print('   The tests verify:')
    print('   • Manager class initialization')
    print('   • Technique library (50 techniques)')
    print('   • Discovery questions (21 questions)')
    print('   • Recommendation engine')
    print('   • Export/Import functionality')
    print('   • Summary generation')
    print('   • Tab navigation')
    print()
    print(f'✅ Test suite verification complete - {len(tests)}/10 tests found')
    print()

if __name__ == '__main__':
    main()
