// Simple test runner using Node.js fetch
const http = require('http');

async function runTests() {
    console.log('Fetching LEA application...\n');

    // Fetch the HTML page
    return new Promise((resolve, reject) => {
        http.get('http://localhost:8888/index.html', (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log('✅ Successfully loaded LEA from http://localhost:8888\n');
                console.log('📋 Regression Tests Found in Application:\n');

                // Parse out test names from the HTML
                const testRegex = /testFramework\.test\('([^']+)'/g;
                const tests = [];
                let match;

                while ((match = testRegex.exec(data)) !== null) {
                    tests.push(match[1]);
                }

                if (tests.length > 0) {
                    console.log(`Found ${tests.length} regression tests:\n`);
                    tests.forEach((test, index) => {
                        console.log(`   ${index + 1}. ${test}`);
                    });
                    console.log('\n');
                    console.log('ℹ️  Note: These tests run in the browser environment.');
                    console.log('ℹ️  To execute tests:');
                    console.log('   • Open http://localhost:8888/index.html in a browser');
                    console.log('   • Click the "Run Tests" button, OR');
                    console.log('   • Open browser console and run: testFramework.runAll()');
                    console.log('\n');

                    // Check if test framework exists
                    if (data.includes('class TestFramework')) {
                        console.log('✅ TestFramework class found');
                    }
                    if (data.includes('runAll()')) {
                        console.log('✅ runAll() method implemented');
                    }
                    if (data.includes('runTestsBtn')) {
                        console.log('✅ Test button UI element found');
                    }

                    resolve(tests);
                } else {
                    console.log('❌ No tests found in the application');
                    reject(new Error('No tests found'));
                }
            });
        }).on('error', (err) => {
            console.error('❌ Error connecting to LEA:', err.message);
            console.error('   Make sure the server is running on http://localhost:8888');
            reject(err);
        });
    });
}

runTests().catch(err => {
    console.error('Test discovery failed:', err.message);
    process.exit(1);
});
