import { module, test } from 'qunit';
import { visit, currentURL, click, findAll, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | questionnaire', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /questionnaire/40 and the not-found page is being displayed', async function (assert) {
    await visit('/questionnaire/40');

    assert.equal(currentURL(), '/questionnaire/40');
    assert.dom('strong').exists();
  });

  test('visiting /questionnaires/40 and the contents are displayed', async function (assert) {
    await visit('/questionnaires/40');

    await click('.questionnaires-item__link');
    assert.dom('section h2').exists();
    assert.equal(findAll('p').length, 2);
    assert.dom('.bottom-navigation').exists();
    assert.equal(findAll('button').length, 2);
  });

  test('clicks the back button to redirect to the questionnaires page', async function (assert) {
    await visit('/questionnaires/40');

    await click('.questionnaires-item__link');
    await click(find('button:nth-child(1)'));
    assert.equal(currentURL(), '/questionnaires');
  });

  test('clicks the back button to redirect to the first question page', async function (assert) {
    await visit('/questionnaires/40');

    await click('.questionnaires-item__link');
    await click(find('button:nth-child(2)'));
    assert.equal(currentURL(), '/questionnaires/question/list_12110962');
  });
});
