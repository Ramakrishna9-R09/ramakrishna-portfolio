import { searchResumeIndex } from './resumeData';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export function runTests() {
  console.log('🧪 Starting RAG Search Index unit tests...');

  // Test 1: Empty Query
  const test1 = searchResumeIndex('');
  assert(test1.context[0] === 'Null Query.', 'Empty query should return Null Query context');

  // Test 2: Education Query
  const test2 = searchResumeIndex('gpa');
  assert(test2.response.includes('8.27/10'), 'Education query should return CGPA metrics');
  assert(test2.context[0].includes('VIT'), 'Education context should retrieve VIT data');

  // Test 3: Project Query
  const test3 = searchResumeIndex('StudyMate');
  assert(test3.response.includes('StudyMate'), 'Project query should retrieve StudyMate details');
  assert(test3.context[0].includes('Serverless'), 'Project context should retrieve serverless stack tags');

  // Test 4: Contact / Location Query
  const test4 = searchResumeIndex('what is his location?');
  assert(test4.response.includes('Hyderabad'), 'Location query should return Hyderabad');
  assert(test4.response.includes('Office'), 'Location query should specify Office options');

  // Test 5: Fallback Query
  const test5 = searchResumeIndex('random test text');
  assert(test5.response.includes('Software Engineering student'), 'Fallback query should return summary baseline info');

  console.log('✓ [ALL TESTS PASSED] RAG Search Index verified successfully!');
}

// Self-executing if run directly
if (import.meta.url.endsWith('resumeData.test.ts')) {
  runTests();
}
